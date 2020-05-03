/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */

import 'dotenv/config';

import mongoose from 'mongoose';
import mongoConfig from '../config/mongo';
import scrap from './scrapSchedule';
import scheduleSources from './scheduleSources';

import Schedule from '../schemas/Schedule';
import Episode from '../schemas/Episode';

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function scrapAll(sources) {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i];
    console.log(`PROCESSING ${source.url}`);

    console.log(`SCRAPING ${source.url}`);
    source.episodes = await scrap(source.url);

    console.log(`SAVING ${source.url}`);

    let schedule = await Schedule.findOne({ url: source.url });
    if (!schedule) {
      schedule = await Schedule.create(source);
    }

    const savedDates = schedule.dates.map((date) => date.value).filter(onlyUnique);
    const scrapedDates = source.episodes.map((e) => e.date).filter(onlyUnique);
    const newDates = scrapedDates.filter((x) => !savedDates.includes(x));

    schedule.dates.push(...newDates.map((date) => ({
      value: date,
      start: source.episodes.filter((e) => e.date === date)[0].time,
      end: source.episodes.filter((e) => e.date === date).slice(-1)[0].time,
    })));
    await schedule.save();

    const episodesToAdd = source.episodes
      .filter((e) => newDates.includes(e.date))
      .map((e) => { e.schedule = schedule._id; return e; });

    await Episode.create(episodesToAdd);
    console.log(`${episodesToAdd.length} EPISODES ADDED`);
  }
  console.log('ALL DONE!');
}

mongoose.connect(
  mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
);

scrapAll(scheduleSources);

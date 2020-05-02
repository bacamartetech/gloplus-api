import axios from 'axios';
import cheerio from 'cheerio';

export default async function scrapSchedule(sourceUrl) {
  const response = await axios.get(sourceUrl);
  const $ = cheerio.load(response.data);

  const schedule = $('div.schedule-items').map((itemsIndex, itemsValue) => $('.schedule-item-inner', itemsValue).map((itemIndex, itemValue) => ({
    order: itemIndex + 1,
    date: $(itemsValue).attr('data-container-date'),
    logo: $('.schedule-item-header-logo img', itemValue).attr('src'),
    time: $('.schedule-item-header-info time', itemValue).text(),
    title: $('.schedule-item-header-info h2', itemValue).text(),
    thumb: $('.schedule-item-content-thumb img', itemValue).attr('src'),
    link: $('a.schedule-item-content-external-link', itemValue).attr('href'),
    description: $('.schedule-item-content-column p', itemValue).text(),
    moreInfo: $('.schedule-item-content-column dl', itemValue).map((dlIntex, dlValue) => {
      const dts = $('dt', null, dlValue).map((dtIndex, dtValue) => $(dtValue).text()).toArray();
      const dds = $('dd', null, dlValue).map((ddIndex, ddValue) => $(ddValue).text()).toArray();
      const zipped = dts.map((dtValue, dtIndex) => ({ key: dtValue, value: dds[dtIndex] }));
      return zipped;
    }).toArray(),
  })).toArray()).toArray();

  return schedule;
}

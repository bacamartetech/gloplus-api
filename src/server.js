import 'dotenv/config';

import http from 'http';
import express from 'express';
import cors from 'cors';
import socketio from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import mongoConfig from './config/mongo';

import AuthController from './controllers/AuthController';
import ScheduleController from './controllers/ScheduleController';
import EpisodeController from './controllers/EpisodeController';
import auth from './middlewares/auth';

import episodeEngine from './episodeEngine';

import Episode from './schemas/Episode';

import formatDate from './utils/formatDate';

mongoose.connect(
  mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true },
);

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);
episodeEngine(io);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({}));

app.get('/share/:id', async (req, res) => {
  const episode = await Episode.findById(req.params.id);
  res.render('share', {
    layout: false,
    date: formatDate(episode.date),
    logo: episode.logo,
    time: episode.time,
    title: episode.title,
    thumb: episode.thumb,
    link: episode.link,
    description: episode.description,
  });
});

app.get('/', async (req, res) => {
  res.render('share', { layout: false });
});

app.post('/register', AuthController.register);
app.post('/session', AuthController.session);
app.get('/avatar', AuthController.avatars);

app.use(auth);

app.get('/myProfile', AuthController.profile);
app.put('/myProfile', AuthController.updateProfile);
app.put('/mySchedule', AuthController.updateProfileSchedule);
app.get('/schedule', ScheduleController.listSchedules);
app.get('/schedule/:id', ScheduleController.getSchedule);
app.get('/schedule/:id/:date', ScheduleController.getEpisodesByScheduleAndDate);
app.get('/episode/:id', EpisodeController.getEpisode);

server.listen(3000);

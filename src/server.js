import 'dotenv/config';

import express from 'express';
import mongoose from 'mongoose';
import mongoConfig from './config/mongo';

import AuthController from './controllers/AuthController';
import ScheduleController from './controllers/ScheduleController';
import auth from './middlewares/auth';

mongoose.connect(mongoConfig.url, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true });

const server = express();
server.use(express.json());

server.get('/', (req, res) => res.send('Server is running!'));
server.post('/register', AuthController.register);
server.post('/session', AuthController.session);

server.use(auth);

server.get('/schedule', ScheduleController.listSchedules);
server.get('/schedule/:id', ScheduleController.getSchedule);
server.get('/schedule/:id/:date', ScheduleController.getEpisodesByScheduleAndDate);

server.listen(3000);

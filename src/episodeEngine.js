import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from './config/auth';

import User from './schemas/User';
import Episode from './schemas/Episode';
import EpisodeChat from './schemas/EpisodeChat';

export default function chatEngine(io) {
  io.on('connection', async (socket) => {
    /* decode user auth token */
    const socketId = socket.id;
    const { token } = socket.handshake.query;
    const decodedToken = await promisify(jwt.verify)(token, authConfig.secret);

    /* update user in database with socket id */
    const connectedUser = await User.findById(decodedToken.id);
    connectedUser.socket = socketId;
    await connectedUser.save();

    console.log(`User connected: ${connectedUser.name}`);

    socket.on('disconnect', async () => {
      /* clear user in database token id */
      const disconnectUser = await User.findById(decodedToken.id);
      disconnectUser.socket = null;
      await disconnectUser.save();

      console.log(`User disconnected: ${disconnectUser.name}`);
    });

    socket.on('join', async (data) => {
      /* assure user will be at only one room at time */
      // eslint-disable-next-line no-restricted-syntax
      for (const room in socket.rooms) {
        if (room !== data.episodeId) {
          socket.leave(room);
        }
      }

      socket.join(data.episodeId, async () => {
        const userCount = (io.sockets.adapter.rooms[data.episodeId]
          && io.sockets.adapter.rooms[data.episodeId].length) || 0;

        /* Update episode stats */
        const episode = await Episode.findById(data.episodeId);
        episode.userCount = userCount;
        episode.save();
        io.in(data.episodeId).emit('userCount', userCount);

        let episodeChat = await EpisodeChat.findOne({ episode: episode._id });
        if (!episodeChat) {
          episodeChat = await EpisodeChat.create({
            episode: episode._id,
            messages: [],
          });
        }

        await episodeChat.populate('messages.user').execPopulate();
        await episodeChat.populate('messages.user.avatar').execPopulate();

        socket.emit('episodeInfo', episode);
        socket.emit('statsUpdated', { score: episode.score, likes: episode.likes });
        socket.emit('chatHistory', episodeChat);

        console.log(`User ${connectedUser.name} joined the rom ${episode.title}`);
        console.log(`${episode.userCount} users in the room`);
      });
    });

    socket.on('leave', async (data) => {
      socket.leave(data.episodeId, async () => {
        const userCount = (io.sockets.adapter.rooms[data.episodeId]
          && io.sockets.adapter.rooms[data.episodeId].length) || 0;

        /* Update episode stats */
        const episode = await Episode.findById(data.episodeId);
        episode.userCount = userCount;
        episode.save();
        io.in(data.episodeId).emit('userCount', userCount);

        console.log(`User ${connectedUser.name} left the rom ${episode.title}`);
        console.log(`${episode.userCount} users in the room`);
      });
    });

    socket.on('chatMessage', async (data) => {
      const episode = await Episode.findById(data.episodeId);

      let episodeChat = await EpisodeChat.findOne({ episode: episode._id });
      if (!episodeChat) {
        episodeChat = await EpisodeChat.create({
          episode: episode._id,
          messages: [],
        });
      }

      const message = {
        user: connectedUser._id,
        userName: connectedUser.name,
        message: data.message,
        date: new Date(),
      };

      episodeChat.messages.push(message);
      episodeChat.save();

      await episodeChat.populate('messages.user').execPopulate();
      await episodeChat.populate('messages.user.avatar').execPopulate();

      console.log(`User ${connectedUser.name} sent a message to ${data.episodeId}: ${data.message}`);
      io.in(data.episodeId).emit('chatMessage', { message: episodeChat.messages[episodeChat.messages.length - 1] });
    });
  });
}

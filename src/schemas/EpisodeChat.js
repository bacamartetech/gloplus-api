import mongoose from 'mongoose';

const EpisodeChat = new mongoose.Schema({
  episode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode',
  },
  messages: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: String,
    message: String,
    date: Date,
  }],
}, {
  timestamps: true,
});

export default mongoose.model('EpisodeChat', EpisodeChat);

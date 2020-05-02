import mongoose from 'mongoose';

const EpisodeSchema = new mongoose.Schema({
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
  },
  order: Number,
  date: Number,
  time: String,
  logo: String,
  title: String,
  thumb: String,
  link: String,
  description: String,
  moreInfo: [{
    key: String,
    value: String,
  }],
  likes: Number,
  score: Number,
  userCount: Number,
}, {
  timestamps: true,
});

export default mongoose.model('Episode', EpisodeSchema);

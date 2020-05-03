import mongoose from 'mongoose';

const ScheduleSchema = new mongoose.Schema({
  group: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  dates: [{
    value: Number,
    start: String,
    end: String,
  }],
}, {
  timestamps: true,
});

export default mongoose.model('Schedule', ScheduleSchema);

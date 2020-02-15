import mongoose from 'mongoose';

const AvatarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Avatar', AvatarSchema);

import mongoose from 'mongoose';
import { bool } from 'yup';

const InteractionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  episode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode',
  },
  like: bool,
  score: Number,
  review: String,
}, {
  timestamps: true,
});

export default mongoose.model('Interaction', InteractionSchema);

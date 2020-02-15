import mongoose from 'mongoose';

const InteractionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  episode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Episode',
  },
  like: Boolean,
  score: Number,
  review: String,
}, {
  timestamps: true,
});

export default mongoose.model('Interaction', InteractionSchema);

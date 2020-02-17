import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Avatar',
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
  },
  socket: String,
}, {
  timestamps: true,
});

UserSchema.pre('save', function preSave(next) {
  if (this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  return next();
});

export default mongoose.model('User', UserSchema);

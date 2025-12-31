import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

export const SessionModel =
  mongoose.models.Session || mongoose.model('Session', userSchema);

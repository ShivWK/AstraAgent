import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },

  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials',
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

export const SessionModel =
  mongoose.models.Session || mongoose.model('Session', userSchema);

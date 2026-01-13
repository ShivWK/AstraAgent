import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  emailVerified: {
    type: Boolean,
    default: false,
  },

  image: {
    type: String,
  },

  password: {
    type: String,
    default: 'No password',
  },

  provider: {
    type: String,
    enum: ['google', 'credentials', 'github'],
    default: 'credentials',
  },

  hasPassword: {
    type: Boolean,
    default: true,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);

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

  password: {
    type: String,
    default: null,
  },

  emailVerified: {
    type: Date,
    default: null,
  },

  image: {
    type: String,
    default: null,
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);

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
  },

  provider: {
    type: String,
    default: 'credentials',
  },
});

export const UserModel =
  mongoose.models.User || mongoose.model('User', userSchema);

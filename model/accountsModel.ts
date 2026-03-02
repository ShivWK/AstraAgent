import mongoose from 'mongoose';

const AccountsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  provider: {
    type: String,
    enum: ['google', 'credentials', 'github'],
    required: true,
    default: 'credentials',
  },

  providerAccountId: {
    type: String,
    required: true,
  },
});

export const AccountsModel =
  mongoose.models.Accounts || mongoose.model('Accounts', AccountsSchema);

AccountsSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

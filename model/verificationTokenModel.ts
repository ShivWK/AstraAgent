import mongoose, { Schema, models } from 'mongoose';

const verificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },

  type: {
    type: String,
    enum: ['email_verification', 'reset_password'],
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    required: true,
  },
});

verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
verificationSchema.index({ email: 1, type: 1 }, { unique: true });

export const VerificationModel =
  models.VerificationModel ||
  mongoose.model('VerificationModel', verificationSchema);

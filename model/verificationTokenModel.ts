import mongoose, { Schema, models } from 'mongoose';

const verificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },

  type: {
    type: String,
    enum: ['email_verification', 'password_reset'],
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

export const VerificationModel =
  models.VerificationModel ||
  mongoose.model('VerificationModel', verificationSchema);

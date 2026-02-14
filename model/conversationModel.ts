import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  agentModel: {
    type: String,
    default: 'normal',
  },

  mode: {
    type: String,
    enum: ['text', 'voice'],
    required: true,
  },

  customInstruction: {
    type: String,
  },

  title: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
});

export const conversationModel =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema);

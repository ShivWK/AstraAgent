import mongoose from 'mongoose';
import { MessagesModel } from './messagesModel';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  defaultAgentModel: {
    type: String,
    required: true,
  },

  key: {
    type: String,
    required: true,
  },

  agentName: {
    type: String,
    required: true,
  },

  currentAgentModel: {
    type: String,
    required: true,
  },

  agentTitle: {
    type: String,
    required: true,
  },

  mode: {
    type: String,
    enum: ['text', 'voice'],
    required: true,
  },

  customInstruction: {
    type: String,
  },

  title: {
    type: String,
    default: 'New Chat',
  },

  isTitleGenerated: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.index({ userId: 1 });

conversationSchema.pre('findOneAndDelete', async function () {
  const doc = await this.model.findOne(this.getFilter());

  if (doc) {
    await MessagesModel.deleteMany({ conversationId: doc._id });
  }
});

export const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model('Conversation', conversationSchema);

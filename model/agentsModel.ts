import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  userId: mongoose.Schema.Types.ObjectId,

  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },

  instruction: String,
  userInstruction: String,
  fallbackMessage: String,
  themeColor: String,
  sampleQuestions: [String],
  description: String,
  subHeading: String,
  placeHolder: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AgentsModel =
  mongoose.models.Agents || mongoose.model('Agents', agentsSchema);

import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  icon: {
    type: String,
    required: true,
  },

  userInstruction: String,
  instruction: String,
  fallbackMessage: String,
  themeColor: String,
  sampleQuestions: [String],
  description: String,
  subHeading: String,
  placeHolder: String,
});

export const AgentsModel =
  mongoose.models.Agents || mongoose.model('Agents', agentsSchema);

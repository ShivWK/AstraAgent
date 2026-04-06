import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
  title: String,
  icon: String,
  description: String,
  model: String,
  placeHolder: String,
  instruction: String,
  userInstruction: String,
  fallbackMessage: String,
  themeColor: String,
  sampleQuestions: [String],
});

export const AgentsModel =
  mongoose.models.Agents || mongoose.model('Agents', agentsSchema);

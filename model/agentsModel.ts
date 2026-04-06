import mongoose from 'mongoose';

const agentsSchema = new mongoose.Schema({
  id: String,
  title: String,
  icon: String,
  description: String,
  subHeading: String,
  model: String,
  placeholder: String,
  instruction: String,
  userInstruction: String,
  fallbackMessage: String,
  themeColor: String,
  sampleQuestions: [String],
});

export const AgentsTemplateModel =
  mongoose.models.AgentsTemplate ||
  mongoose.model('AgentsTemplate', agentsSchema);

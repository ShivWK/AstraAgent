export type Agent = {
  _id: string;
  name: string;
  description: string;
  subHeading: string;
  title: string;
  icon: string;

  instruction: string;
  userInstruction: string;
  fallbackMessage: string;

  userPreference?: string;
  key: string;

  model: string;
  themeColor: string;

  sampleQuestions: string[];
  placeholder: string;

  isDefault: boolean;

  createdBy: string | null; // ObjectId as string
  createdAt: Date;
};

export type Voice_assistant = {
  id: number;
  name: string;
  title: string;
  icon: string;
  description: string;
};

export const voice_assistant: Voice_assistant[] = [
  {
    id: 1,
    name: 'Astra Interviewer',
    title: 'Interviewer',
    icon: '/assistants/interviewer.png',
    description:
      'Conducts realistic interviews based on your chosen topic, and experience level.',
  },

  {
    id: 2,
    name: 'LingoMentor',
    title: 'Language Master',
    icon: '/assistants/language_master.png',
    description:
      'Helps you learn and practice a new language through structured, conversational lessons.',
  },

  {
    id: 3,
    name: 'Dhyan',
    title: 'Yog Guru',
    icon: '/assistants/yog_guru.png',
    description:
      'Guides you through yoga, pranayama, and meditation sessions tailored to your goals.',
  },

  {
    id: 4,
    name: 'Nova Scholar',
    title: 'Lecture on topic',
    icon: '/assistants/lecturer.png',
    description:
      'Delivers clear, focused lectures on any topic you want to learn or revise.',
  },
];

export type Voice_assistant = {
  id: number;
  name: string;
  title: string;
  icon: string;
  description: string;
  subHeading: string;
};

export const voice_assistant: Voice_assistant[] = [
  {
    id: 1,
    name: 'Astra Interviewer',
    title: 'Interviewer',
    icon: '/assistants/interviewer.png',
    description: 'Conducts professional interviews and evaluates answers.',
    subHeading:
      'Describe the role, topic, experience level, and how challenging you want the interview to be.',
  },

  {
    id: 2,
    name: 'LingoMentor',
    title: 'Language Master',
    icon: '/assistants/language_master.png',
    description: 'Helps you practice speaking and corrects your language.',
    subHeading:
      'Mention the language, your current level, and what you want to focus on (speaking, grammar, or fluency).',
  },

  {
    id: 3,
    name: 'Dhyan',
    title: 'Yog Guru',
    icon: '/assistants/yog_guru.png',
    description: 'Leads guided meditation, breathing, and focus sessions.',
    subHeading:
      'Tell us your goal, preferred practice (yoga, pranayama, meditation), and how you want the session to feel.',
  },

  {
    id: 4,
    name: 'Nova Scholar',
    title: 'Lecture on topic',
    icon: '/assistants/lecturer.png',
    description: 'Gives clear lectures on chosen topics.',
    subHeading:
      'Share the topic, how deep you want the explanation, and your preferred learning style.',
  },
];

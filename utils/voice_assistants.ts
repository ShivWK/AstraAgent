export type Voice_assistant = {
  id: number;
  name: string;
  title: string;
  icon: string;
};

export const voice_assistant: Voice_assistant[] = [
  {
    id: 1,
    name: 'Astra Interviewer',
    title: 'Interviewer',
    icon: '/assistants/interviewer.png',
  },

  {
    id: 2,
    name: 'LingoMentor',
    title: 'Language Master',
    icon: '/assistants/language_master.png',
  },

  {
    id: 3,
    name: 'Dhyan',
    title: 'Yog Guru',
    icon: '/assistants/yog_guru.png',
  },

  {
    id: 4,
    name: 'Nova Scholar',
    title: 'Lecture on topic',
    icon: '/assistants/lecturer.png',
  },
];

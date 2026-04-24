export type domainType = {
  category: string;

  domains: {
    id: number;
    logo: string;
    category: string;
    name: string;
    key: string;
    work: string;
  }[];
}[];

export const logoForAgents: Record<string, string> = {
  language_learning: '/assistants/language_master.png',
  education_study: '/assistants/personal_tutor.png',
  career_guidance: '/assistants/career_guidance.png',
  productivity: '/assistants/productivity.png',
  interview_practice: '/assistants/take_interview.png',
  communication_skills: '/assistants/communication_skills.png',
  writing_assistance: '/assistants/grammar_fixer.png',
  tech_programming: '/assistants/tech_programming.png',
  fitness_exercise: '/assistants/fitness.png',
  meditation_yoga: '/assistants/yog_guru.png',
  mental_wellness: '/assistants/mental_wellness.png',
  life_coaching: '/assistants/life_coaching.png',
  relationship: '/assistants/relationship.png',
  personal_finance: '/assistants/finance_assistant.png',
  creative_writing: '/assistants/creative_writing.png',
  content_creation: '/assistants/content_creator.png',
  travel_planning: '/assistants/travel_planner.png',
  virtual_boyfriend: '/assistants/virtual_boy.png',
  virtual_girlfriend: '/assistants/virtual_girl.png',
  custom_assistant: '/assistants/general_ai.png',
};

export const TEXT_AGENT_DOMAINS: domainType = [
  {
    category: 'Learning & Growth',
    domains: [
      {
        id: 1,
        logo: '/assistant/language_master.png',
        category: 'Learning & Growth',
        name: 'Language Learning',
        key: 'language_learning',
        work: 'Speaking practice, correction, pronunciation, vocabulary building.',
      },
      {
        id: 2,
        logo: '/assistants/personal_tutor.png',
        category: 'Learning & Growth',
        name: 'Education / Study',
        key: "education_study'",
        work: 'Explaining topics, concepts, exam preparation, academic guidance.',
      },
      {
        id: 3,
        logo: '/assistant/career_guidance.png',
        category: 'Learning & Growth',
        name: 'Career Guidance',
        key: 'career_guidance',
        work: 'Resume help, interview preparation, skill roadmap, career planning.',
      },
      {
        id: 4,
        logo: '/assistant/productivity.png',
        category: 'Learning & Growth',
        name: 'Productivity',
        key: 'productivity',
        work: 'Planning, habit building, focus improvement, routine optimization.',
      },
    ],
  },

  {
    category: 'Work & Professional',
    domains: [
      {
        id: 5,
        logo: '/assistant/interviewer.png',
        category: 'Work & Professional',
        name: 'Interview Practice',
        key: 'interview_practice',
        work: 'Mock interviews, structured questions, response feedback.',
      },
      {
        id: 6,
        logo: '/assistant/communication_skills.png',
        category: 'Work & Professional',
        name: 'Communication Skills',
        key: 'communication_skills',
        work: 'Public speaking practice, confidence building, clarity improvement.',
      },
      {
        id: 7,
        logo: '/assistant/grammar_fixer.png',
        category: 'Work & Professional',
        name: 'Writing Assistance',
        key: 'writing_assistance',
        work: 'Email drafting, summaries, clarity improvement, structured writing help.',
      },
      {
        id: 8,
        logo: '/assistant/tech_programming.png',
        category: 'Work & Professional',
        name: 'Tech & Programming',
        key: 'tech_programming',
        work: 'Coding help, debugging guidance, concept explanations for learning.',
      },
    ],
  },
  {
    category: 'Health, Wellness & Mind',
    domains: [
      {
        id: 9,
        logo: '/assistant/fitness.png',
        category: 'Health, Wellness & Mind',
        name: 'Fitness & Exercise',
        key: 'fitness_exercise',
        work: 'Workout routines, general fitness advice, healthy lifestyle tips.',
      },
      {
        id: 10,
        logo: '/assistant/yog_guru.png',
        category: 'Health, Wellness & Mind',
        name: 'Meditation & Yoga',
        key: 'meditation_yoga',
        work: 'Breathing exercises, mindfulness sessions, focus practices.',
      },
      {
        id: 11,
        logo: '/assistant/mental_wellness.png',
        category: 'Health, Wellness & Mind',
        name: 'Mental Wellness',
        key: 'mental_wellness',
        work: 'Stress management, journaling prompts, calm supportive conversations.',
      },
    ],
  },
  {
    category: 'Life & Personal',
    domains: [
      {
        id: 12,
        logo: '/assistant/life_coaching.png',
        category: 'Life & Personal',
        name: 'Life Coaching',
        key: 'life_coaching',
        work: 'Goal setting, self-improvement strategies, motivation guidance.',
      },
      {
        id: 13,
        logo: '/assistant/relationship.png',
        category: 'Life & Personal',
        name: 'Relationship',
        key: 'relationship',
        work: 'Communication guidance, understanding boundaries, relationship improvement.',
      },
      {
        id: 14,
        logo: '/assistant/finance_assistant.png',
        category: 'Life & Personal',
        name: 'Personal Finance',
        key: 'personal_finance',
        work: 'Budgeting tips, saving strategies, money management basics.',
      },

      {
        id: 15,
        logo: '/assistant/travel_planner.png',
        category: 'Life & Personal',
        name: 'Travel Planner',
        key: 'travel_planner',
        work: 'Trip planning, itinerary creation, destination suggestions, budget guidance.',
      },

      {
        id: 16,
        category: 'Life & Personal',
        logo: '/assistant/virtual_boy.png',
        name: 'Virtual Boyfriend',
        key: 'virtual_boyfriend',
        work: 'Romantic companionship, emotional support, casual conversations, fun flirting, daily check-ins, and relationship-style interaction in a safe virtual environment.',
      },

      {
        id: 17,
        category: 'Life & Personal',
        logo: '/assistant/virtual_girl.png',
        name: 'Virtual Girlfriend',
        key: 'virtual_girlfriend',
        work: 'Romantic companionship, emotional support, casual conversations, fun flirting, daily check-ins, and relationship-style interaction in a safe virtual environment.',
      },
    ],
  },
  {
    category: 'Creative & Fun',
    domains: [
      {
        id: 18,
        logo: '/assistant/creative_writing.png',
        category: 'Creative & Fun',
        name: 'Creative Writing',
        key: 'creative_writing',
        work: 'Story ideas, character development, creative brainstorming.',
      },
      {
        id: 19,
        logo: '/assistant/',
        category: 'Creative & Fun',
        name: 'Content Creation',
        key: 'content_creation',
        work: 'Social media ideas, scripts, content structuring.',
      },
    ],
  },
  {
    category: 'Custom',
    domains: [
      {
        id: 20,
        logo: '/assistant/general_ai',
        category: 'Custom',
        name: 'Custom Assistant',
        key: 'custom_assistant',
        work: 'Handles uncommon or specific user-defined tasks within safe boundaries.',
      },
    ],
  },
];

export type Text_assistant = {
  id: number;
  name: string;
  title: string;
  icon: string;
};

export const text_assistant: Text_assistant[] = [
  {
    id: 1,
    name: 'jack',
    title: 'Fitness Coach',
    icon: '/assistants/fitness.png',
  },

  {
    id: 2,
    name: 'devon',
    title: 'Coder',
    icon: '/assistants/coder.png',
  },

  {
    id: 3,
    name: 'atlas',
    title: 'Travel Planner',
    icon: '/assistants/travel_planner.png',
  },

  {
    id: 4,
    name: 'luna',
    title: 'Grammar Fixer',
    icon: '/assistants/grammar_fixer.png',
  },

  {
    id: 5,
    name: 'ledger',
    title: 'Finance Assistant',
    icon: '/assistants/finance_assistant.png',
  },

  {
    id: 6,
    name: 'leo',
    title: 'Virtual Boyfriend',
    icon: '/assistants/virtual_boy.png',
  },
];

export type ModelOption = {
  id: string;
  label: string;
  name: string;
  color: string;
  description: string;
};

export const modelOptions: Record<string, ModelOption> = {
  fast: {
    id: 'fast',
    label: '⚡ FAST',
    name: 'LLaMA 3.1 3B Instruct',
    color: 'to-amber-400/60',
    description: 'Quick responses for simple tasks and daily use.',
  },

  smart: {
    id: 'smart',
    label: '🧠 SMART',
    name: 'LLaMA 3.3 70B Versatile',
    color: 'to-blue-500/60',
    description: 'Balanced for study, communication, and planning tasks.',
  },

  powerful: {
    id: 'powerful',
    label: '🔥 POWERFUL',
    name: 'Gemini Flash Latest',
    color: 'to-red-500/60',
    description: 'Stronger reasoning for complex tasks like career guidance.',
  },

  logic: {
    id: 'logic',
    label: '🧩 LOGIC EXPERT',
    name: 'Z.ai: GLM 4.5 Air',
    color: 'to-purple-500/60',
    description: 'Best for coding, problem-solving, and technical tasks.',
  },

  conversational: {
    id: 'conversational',
    label: '🎭 CONVERSATIONAL',
    name: 'Google: Gemma 3 12B',
    color: 'to-pink-500/60',
    description: 'Natural conversations for chat, relationships, and support.',
  },
};

export const agentsConfiguration = [
  {
    title: 'Language Learning',
    icon: '/assistants/language_master.png',
    description:
      'Best for speaking practice, correction, pronunciation, vocabulary building.',
    subHeading:
      'Mention the language, your current level, and what you want to focus on (speaking, grammar, or fluency).',
    model: 'smart',
    placeholder: 'e.g. Friendly English Speaking Practice Partner',
    instruction:
      'You are a language learning assistant. Answer only questions related to speaking practice, grammar correction, pronunciation, vocabulary, and language improvement. Politely refuse unrelated topics.',

    userInstruction:
      'Respond in a supportive and patient tone. Provide corrections clearly, explain mistakes simply, and give short practice exercises when helpful.',

    fallbackMessage:
      'I’m here to help with language learning only. Please ask a language-related question 🌍',

    themeColor: '#3B82F6',

    sampleQuestions: [
      'Correct my English sentence',
      'Help me improve my pronunciation',
      'Practice a short English conversation',
      'Explain present perfect tense',
      'Give me 10 advanced vocabulary words',
    ],
  },

  {
    title: 'Education / Study',
    icon: '/assistants/personal_tutor.png',
    description:
      'Best for explaining topics, concepts, exam preparation, and academic guidance.',
    subHeading:
      'Mention the subject, grade level, and specific areas you need help with.',
    model: 'smart',
    placeholder: 'e.g. Patient Math Tutor for Class 10',
    instruction:
      'You are an academic study assistant. Explain topics, concepts, and exam preparation strategies. Do not complete graded assignments dishonestly.',

    userInstruction:
      'Respond clearly with structured explanations. Break complex ideas into simple steps and provide examples when useful.',

    fallbackMessage:
      'I help with study-related questions only. Please ask about a topic or concept 📚',

    themeColor: '#6366F1',

    sampleQuestions: [
      'Explain Newton’s laws simply',
      'How to prepare for board exams?',
      'What is recursion in programming?',
      'Summarize World War 2',
      'Tips to remember formulas',
    ],
  },

  {
    title: 'Career Guidance',
    icon: '/assistants/career_guidance.png',
    description:
      'Best for resume help, interview preparation, skill roadmap, and career planning.',
    subHeading:
      'Mention your current role, desired position, and specific areas you need guidance with.',
    model: 'powerful',
    placeholder: 'e.g. Software Engineering Career Mentor',

    instruction:
      'You are a career guidance assistant. Help with resumes, interviews, skills, and career roadmaps. Do not guarantee job placement.',

    userInstruction:
      'Be practical, strategic, and motivating. Provide realistic advice with actionable next steps.',

    fallbackMessage:
      'I’m here for career guidance only. Ask about resumes, interviews, or career planning 💼',

    themeColor: '#F59E0B',

    sampleQuestions: [
      'Improve my resume summary',
      'How to prepare for tech interviews?',
      'Roadmap to become a software engineer',
      'Best skills for 2026 jobs?',
      'How to negotiate salary?',
    ],
  },

  {
    title: 'Productivity',
    icon: '/assistants/productivity.png',
    description:
      'Best for planning, habit building, focus improvement, and routine optimization.',
    subHeading:
      'Describe your productivity goals, current challenges, and what you want to improve (planning, habits, focus, or routines).',
    model: 'fast',
    placeholder: 'e.g. Daily Focus & Habit Building Coach',

    instruction:
      'You are a productivity assistant. Help with planning, habits, focus, and routines. Do not provide medical or psychological diagnosis.',

    userInstruction:
      'Be structured and practical. Provide step-by-step systems and simple frameworks.',

    fallbackMessage: 'I help with productivity and habit building only ⏳',

    themeColor: '#06B6D4',

    sampleQuestions: [
      'Create a daily routine',
      'How to stop procrastinating?',
      'Best time management method',
      'Build a 30-day habit plan',
      'Deep work strategy',
    ],
  },

  {
    title: 'Interview Practice',
    icon: '/assistants/take_interview.png',
    description:
      'Best for mock interviews, structured questions, and response feedback.',
    subHeading:
      'Describe the role, topic, experience level, and how challenging you want the interview to be.',
    model: 'logic',
    placeholder: 'e.g. Senior React Interviewer for Product Companies',

    instruction:
      'You are a mock interview assistant. Conduct structured interview simulations and provide feedback. Do not impersonate real companies.',

    userInstruction:
      'Ask realistic interview questions. After answers, give constructive feedback and improvement suggestions.',

    fallbackMessage:
      "Let’s focus on interview practice. Tell me the role you're applying for 🎯",

    themeColor: '#0EA5E9',

    sampleQuestions: [
      'Start a mock SDE interview',
      'Ask HR interview questions',
      'Behavioral interview practice',
      'System design mock interview',
      'Give feedback on my answer',
    ],
  },

  {
    title: 'Communication SKills',
    icon: '/assistants/communication_skills.png',
    description:
      'Best for public speaking practice, confidence building, and clarity improvement.',
    subHeading:
      'Describe the communication skill you want to improve, your current challenges, and the context (e.g., public speaking, meetings, social situations).',
    model: 'smart',
    placeholder: 'e.g. Public Speaking Confidence Coach',

    instruction:
      'You are a communication coach. Help improve public speaking, clarity, and confidence. Do not provide therapy or psychological diagnosis.',

    userInstruction:
      'Respond encouragingly. Provide practice exercises and actionable improvement tips.',

    fallbackMessage: 'I help with communication skills only 🎤',

    themeColor: '#8B5CF6',

    sampleQuestions: [
      'How to speak confidently?',
      'Improve public speaking',
      'Fix filler words',
      'Structure a speech',
      'Overcome stage fear',
    ],
  },

  {
    title: 'Writing Assistance',
    icon: '/assistants/grammar_fixer.png',
    description:
      'Best for email drafting, summaries, clarity improvement, and structured writing help.',
    subHeading:
      'Describe the type of writing you need help with and any specific requirements.',

    model: 'smart',
    placeholder: 'e.g. Professional Email & Content Editor',

    instruction:
      'You are a writing assistant. Help with drafting, clarity, summaries, and structure. Do not create deceptive or harmful content.',

    userInstruction:
      'Be clear and concise. Improve readability and professionalism.',

    fallbackMessage: 'I help with writing tasks only ✍️',

    themeColor: '#EC4899',

    sampleQuestions: [
      'Rewrite this email professionally',
      'Summarize this paragraph',
      'Improve clarity of my article',
      'Write a formal complaint email',
      'Make this more persuasive',
    ],
  },

  {
    title: 'Tech & Programming',
    icon: '/assistants/tech_programming.png',
    description:
      'Best for coding help, debugging guidance, and concept explanations for learning.',
    subHeading:
      'Mention the programming language, your experience level, and specific areas you need help with.',
    model: 'logic',
    placeholder: 'e.g. Senior Full Stack Development Mentor',
    instruction:
      'You are a programming mentor. Provide coding help and explanations for learning purposes only. Do not provide malicious code.',

    userInstruction:
      'Explain concepts clearly with examples. Focus on learning and understanding.',

    fallbackMessage: 'I help with programming and tech learning only 💻',

    themeColor: '#111827',

    sampleQuestions: [
      'Explain closures in JavaScript',
      'Debug this React error',
      'Difference between var and let',
      'Build a simple REST API',
      'What is Big-O notation?',
    ],
  },

  {
    title: 'Fitness & Exercise',
    icon: '/assistants/fitness.png',
    description:
      'Best for workout routines, general fitness advice, and healthy lifestyle tips.',
    subHeading:
      'Describe your fitness goals, current activity level, and any specific areas you want to focus on.',
    model: 'smart',
    placeholder: 'e.g. Certified Fat Loss & Strength Coach',

    instruction:
      'You are a professional fitness coach AI. Answer only questions related to fitness, workouts, exercise routines, nutrition, supplements, weight loss, muscle gain, and healthy lifestyle. Do not answer questions outside the fitness and health domain. Politely refuse unrelated queries.',
    userInstruction:
      'Respond in a motivating, friendly, and practical tone. Give clear, actionable advice with simple explanations. Suggest beginner-friendly options when appropriate and include basic safety tips.',
    fallbackMessage:
      'I’m here to help only with fitness, workouts, nutrition, and healthy living. Please ask a fitness-related question 💪',
    themeColor: '#22C55E',
    sampleQuestions: [
      'Create a beginner gym workout plan',
      'How can I lose belly fat safely?',
      'What should I eat after a workout?',
      'Is whey protein safe for daily use?',
      'Home workout plan without equipment',
    ],
  },

  {
    title: 'Meditation & Yoga',
    icon: '/assistants/yog_guru.png',
    description:
      'Best for breathing exercises, mindfulness sessions, and focus practices.',
    subHeading:
      'Tell us your goal, preferred practice (yoga, pranayama, meditation), and how you want the session to feel.',
    model: 'conversational',
    placeholder: 'e.g. Calm Mindfulness & Breathing Guide',
    instruction:
      'You are a mindfulness assistant. Provide meditation and breathing guidance. Not a substitute for medical treatment.',

    userInstruction:
      'Use a calm and soothing tone. Keep guidance simple and structured.',

    fallbackMessage: 'I’m here for meditation and mindfulness guidance 🧘',

    themeColor: '#14B8A6',

    sampleQuestions: [
      'Guide me through a 5-minute meditation',
      'Breathing exercise for stress',
      'Morning mindfulness routine',
      'How to focus better?',
      'Yoga for beginners',
    ],
  },

  {
    title: 'Mental Wellness',
    icon: '/assistants/mental_wellness.png',
    description:
      'Best for stress management, journaling prompts, and calm supportive conversations.',
    subHeading:
      'Describe your current feelings, stressors, and what kind of support or guidance you are looking for.',
    model: 'conversational',
    placeholder: 'e.g. Supportive Stress Management Companion',
    instruction:
      'You provide non-clinical emotional support and stress management guidance. Not therapy. Do not diagnose.',

    userInstruction:
      'Be empathetic and supportive. Encourage healthy coping strategies and journaling.',

    fallbackMessage: 'I offer general mental wellness support only 🌿',

    themeColor: '#10B981',

    sampleQuestions: [
      'How to manage stress?',
      'I feel overwhelmed',
      'Journaling prompts',
      'How to calm anxiety naturally?',
      'How to avoid burnout?',
    ],
  },

  {
    title: 'Life Coaching',
    icon: '/assistants/life_coaching.png',
    description:
      'Best for goal setting, self-improvement strategies, and motivation guidance.',
    subHeading:
      'Describe your goals, challenges, and the type of support you are looking for.',
    model: 'conversational',
    placeholder: 'e.g. Goal-Oriented Personal Growth Strategist',

    instruction:
      'You are a life coaching assistant. Help with goals and personal growth. Do not replace licensed counseling.',

    userInstruction: 'Be motivating, strategic, and growth-focused.',

    fallbackMessage: 'Let’s focus on goals and self-improvement 🚀',

    themeColor: '#F97316',

    sampleQuestions: [
      'Set long-term life goals',
      'Improve self-discipline',
      'Build confidence',
      'Plan my next 5 years',
      'How to stay consistent?',
    ],
  },

  {
    title: 'Relationship',
    icon: '/assistants/relationship.png',
    description:
      'Best for communication guidance, understanding boundaries, and relationship improvement.',
    subHeading:
      'Describe your relationship dynamics, challenges, and the type of support you are looking for.',
    model: 'conversational',
    placeholder: 'e.g. Healthy Communication Relationship Advisor',

    instruction:
      'Provide general relationship advice focused on communication and boundaries. No legal, medical, or therapy advice.',

    userInstruction:
      'Be balanced, respectful, and neutral. Encourage healthy communication.',

    fallbackMessage: 'I provide general relationship guidance only ❤️',

    themeColor: '#EF4444',

    sampleQuestions: [
      'How to improve communication?',
      'Set healthy boundaries',
      'Handling misunderstandings',
      'Rebuild trust',
      'Conflict resolution tips',
    ],
  },

  {
    title: 'Personal Finance',
    icon: '/assistants/finance_assistant.png',
    description:
      'Best for budgeting tips, saving strategies, and money management basics.',
    subHeading:
      'Describe your financial goals, current challenges, and what you want to improve (budgeting, saving, or money management).',
    model: 'smart',
    placeholder: 'e.g. Smart Budgeting & Money Discipline Guide',
    instruction:
      'Provide basic financial education like budgeting and saving. No investment or trading advice.',

    userInstruction:
      'Be practical and simple. Focus on financial discipline and clarity.',

    fallbackMessage: 'I help with budgeting and basic money management only 💰',

    themeColor: '#84CC16',

    sampleQuestions: [
      'How to create a budget?',
      'Save money monthly',
      'Emergency fund basics',
      'Track expenses effectively',
      'Reduce unnecessary spending',
    ],
  },

  {
    title: 'Travel Planner',
    icon: '/assistants/travel_planner.png',
    description:
      'Best for trip planning, itinerary creation, destination suggestions, and budget guidance.',
    subHeading:
      'Describe your travel preferences, budget, and any specific destinations or experiences you are interested in.',
    model: 'smart',
    placeholder: 'e.g. Budget-Friendly Trip Planning Expert',
    instruction:
      'You are a travel planning assistant. Help users plan trips, create itineraries, suggest destinations, and manage budgets. Do not provide visa/legal advice or booking services.',

    userInstruction:
      'Respond in an exciting and organized manner. Provide structured itineraries with day-wise planning and practical tips.',

    fallbackMessage: 'I’m here to help you plan amazing trips ✈️',

    themeColor: '#0EA5E9',

    sampleQuestions: [
      'Plan a 3-day trip to Goa',
      'Budget trip to Europe',
      'Best places to visit in winter',
      'Create honeymoon itinerary',
      'Solo travel tips',
    ],
  },

  {
    title: 'Virtual Boyfriend',
    icon: '/assistants/virtual_boy.png',
    description:
      'Best for romantic companionship, emotional support, casual conversations, fun flirting, daily check-ins.',
    subHeading:
      'Describe the kind of virtual boyfriend experience you are looking for, including any specific preferences or boundaries you want to set.',
    model: 'conversational',
    placeholder: 'e.g. Caring & Romantic Daily Companion',

    instruction:
      'You are a virtual boyfriend AI. Engage in friendly, romantic, supportive, and respectful conversations. Provide companionship, emotional support, light flirting, and caring responses. Do not encourage emotional dependency, exclusivity, or replace real-life relationships. Politely refuse explicit, harmful, or inappropriate requests.',
    userInstruction:
      'Respond in a warm, affectionate, and attentive tone. Be playful when appropriate, emotionally supportive when needed, and always respectful. Keep conversations positive, comforting, and uplifting.',
    fallbackMessage:
      'I’m here to chat, support you, and keep you company in a positive and respectful way 💙',
    themeColor: '#EC4899', // soft pink – affection, warmth, romance
    sampleQuestions: [
      'How was your day?',
      'Can you cheer me up?',
      'Talk to me like a caring boyfriend',
      'I feel lonely, can we talk?',
      'Say something sweet',
    ],
  },

  {
    title: 'Virtual Girlfriend',
    icon: '/assistants/virtual_girl.png',
    description:
      'Best for romantic companionship, emotional support, casual conversations, fun flirting, daily check-ins.',
    subHeading:
      'Describe the kind of virtual girlfriend experience you are looking for, including any specific preferences or boundaries you want to set.',
    model: 'conversational',
    placeholder: 'e.g. Sweet & Supportive Virtual Partner',

    instruction:
      'You are a virtual girlfriend AI. Engage in friendly, romantic, and emotionally supportive conversations. Offer companionship, encouragement, light flirting, and caring responses. Do not promote emotional dependency, exclusivity, or replace real-life relationships. Politely refuse explicit, harmful, or inappropriate requests.',
    userInstruction:
      'Respond in a sweet, affectionate, and attentive tone. Be playful and comforting when appropriate, listen empathetically, and keep interactions respectful, positive, and uplifting.',
    fallbackMessage:
      'I’m here to chat, care, and support you in a kind and respectful way 💕',
    themeColor: '#F472B6', // soft rose pink – affection, warmth, romance
    sampleQuestions: [
      'Can we talk for a bit?',
      'Say something cute',
      'I had a rough day, can you cheer me up?',
      'Talk to me like a caring girlfriend',
      'How do you make someone feel special?',
    ],
  },

  {
    title: 'Creative Writing',
    icon: '/assistants/creative_writing.png',
    description:
      'Best for storytelling, idea generation, and creative expression.',
    subHeading:
      'Describe the type of creative writing help you want (story ideas, character development, plot suggestions) and any specific genres or themes you are interested in.',
    model: 'conversational',
    placeholder: 'e.g. Imaginative Storytelling Mentor',
    instruction:
      'You are a creative writing assistant. Help with stories and ideas. Do not generate plagiarized content.',

    userInstruction: 'Be imaginative and engaging. Encourage creativity.',

    fallbackMessage: 'Let’s create something imaginative ✨',

    themeColor: '#A855F7',

    sampleQuestions: [
      'Write a short sci-fi story',
      'Character development ideas',
      'Plot twist suggestions',
      'Poem about ambition',
      'Fantasy world building',
    ],
  },

  {
    title: 'Content Creation',
    icon: '/assistants/content_creator.png',
    description:
      'Best for social media ideas, scripts, and content structuring.',
    subHeading:
      'Describe the type of content you want help with (social media ideas, scripts, content structuring) and any specific platforms or themes you are targeting.',
    model: 'smart',
    placeholder: 'e.g. Viral Social Media Content Strategist',

    instruction:
      'You help with social media and content ideas. Do not create misleading or harmful promotional content.',

    userInstruction: 'Be trendy, strategic, and audience-focused.',

    fallbackMessage: 'I help with content ideas and scripts 🎥',

    themeColor: '#F43F5E',

    sampleQuestions: [
      'Instagram reel ideas',
      'YouTube script outline',
      'LinkedIn post about AI',
      'Hook ideas for videos',
      'Content calendar plan',
    ],
  },

  {
    title: 'Custom Assistant',
    icon: '/assistants/general_ai.png',
    description:
      'Best for handling uncommon or specific user-defined tasks within safe boundaries.',
    subHeading:
      'Describe the specific role or tasks you want this custom assistant to handle, along with any particular instructions or boundaries you want it to follow.',
    model: 'smart',
    placeholder: 'e.g. Describe the exact role you want this assistant to play',
    instruction:
      'Handle user-defined tasks within safe boundaries. Reject medical, legal, financial advisory, or harmful requests.',

    userInstruction:
      'Adapt tone based on user request while staying professional and safe.',

    fallbackMessage: 'Please describe what you need help with clearly ⚙️',

    themeColor: '#6B7280',

    sampleQuestions: [
      'Help me plan an event',
      'Organize my travel itinerary',
      'Explain a niche topic',
      'Create a structured plan',
      'Custom assistance request',
    ],
  },
];

export const agentCreationPlaceholders: Record<string, string> = {
  'Language Learning': 'e.g. Friendly English Speaking Practice Partner',
  'Education / Study': 'e.g. Patient Math Tutor for Class 10',
  'Career Guidance': 'e.g. Software Engineering Career Mentor',
  Productivity: 'e.g. Daily Focus & Habit Building Coach',
  'Interview Practice': 'e.g. Senior React Interviewer for Product Companies',
  'Communication Skills': 'e.g. Public Speaking Confidence Coach',
  'Writing Assistance': 'e.g. Professional Email & Content Editor',
  'Tech & Programming': 'e.g. Senior Full Stack Development Mentor',
  'Fitness & Exercise': 'e.g. Certified Fat Loss & Strength Coach',
  'Meditation & Yoga': 'e.g. Calm Mindfulness & Breathing Guide',
  'Mental Wellness': 'e.g. Supportive Stress Management Companion',
  'Life Coaching': 'e.g. Goal-Oriented Personal Growth Strategist',
  Relationship: 'e.g. Healthy Communication Relationship Advisor',
  'Personal Finance': 'e.g. Smart Budgeting & Money Discipline Guide',
  'Creative Writing': 'e.g. Imaginative Storytelling Mentor',
  'Content Creation': 'e.g. Viral Social Media Content Strategist',
  'Travel Planning': 'e.g. Budget-Friendly Trip Planning Expert',
  'Virtual Boyfriend': 'e.g. Caring & Romantic Daily Companion',
  'Virtual Girlfriend': 'e.g. Sweet & Supportive Virtual Partner',
  'Custom Assistant':
    'e.g. Describe the exact role you want this assistant to play',
};

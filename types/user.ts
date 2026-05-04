export type User = {
  name: string;
  role: 'user' | 'admin';
  email: string;
  tokens: number;
  totalTokens: number;
  image: string;
  emailVerified: Date | null;
};

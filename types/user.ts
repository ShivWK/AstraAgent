export type User = {
  name: string;
  role: string;
  email: string;
  tokens: number;
  totalTokens: number;
  image: string;
  emailVerified: Date | null;
};

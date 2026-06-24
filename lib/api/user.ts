import { User } from '@/types/user';
import { fetcher } from './fetcher';

export const userApi = {
  getUser: () => {
    return fetcher<{
      success: boolean;
      message?: string;
      error?: string;
      user?: User;
    }>('/api/user');
  },
};

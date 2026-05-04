import useAppDispatch from './useAppDispatch';
import { setUser, setGlobalAuthLoader } from '@/features/auth/authSlice';

const useRefresher = () => {
  const dispatch = useAppDispatch();

  const refresh = async () => {
    try {
      dispatch(setGlobalAuthLoader(true));
      const response = await fetch('/api/user');
      const user = await response.json();

      if (!response.ok) {
        throw new Error(user.message);
      }

      dispatch(setUser(user.user));
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error occurred:', err.message);
      }

      console.log('Error', err);
    } finally {
      dispatch(setGlobalAuthLoader(false));
    }
  };

  return refresh;
};

export default useRefresher;

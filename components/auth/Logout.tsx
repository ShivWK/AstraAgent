import { Button } from '../ui/button';
import { logoutAction } from '@/app/actions/auth';
import { LogOut } from 'lucide-react';

const Logout = () => {
  const logoutHandler = async () => {
    const response = await logoutAction();
  };

  return (
    <Button onClick={logoutHandler} variant={'outline'}>
      <LogOut />
    </Button>
  );
};

export default Logout;

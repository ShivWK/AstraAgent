import { Button } from './ui/button';
import { Sun } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex w-full bg-red-400 p-2">
      <Button variant="secondary" size="icon" className="rounded-full">
        <Sun />
      </Button>
    </header>
  );
};

export default Header;

import { selectGlobalAuthLoader } from '@/features/auth/authSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { Eye, EyeOff } from 'lucide-react';

type PropsType = {
  eyeOpen: boolean;
  setEyeOpen: (value: boolean) => void;
  isSubmitting: boolean;
};

const EyeButton = ({ eyeOpen, setEyeOpen, isSubmitting }: PropsType) => {
  const authLoader = useAppSelector(selectGlobalAuthLoader);
  return (
    <button
      onClick={() => setEyeOpen(!eyeOpen)}
      type="button"
      disabled={authLoader || isSubmitting}
      aria-label={eyeOpen ? 'Hide password' : 'Show password'}
      aria-pressed={eyeOpen}
      aria-controls="password"
    >
      {eyeOpen ? (
        <Eye aria-hidden="true" size={16} />
      ) : (
        <EyeOff aria-hidden="true" size={16} />
      )}
    </button>
  );
};

export default EyeButton;

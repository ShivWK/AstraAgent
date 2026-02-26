import { Eye, EyeOff } from 'lucide-react';

type PropsType = {
  eyeOpen: boolean;
  setEyeOpen: (value: boolean) => void;
};

const EyeButton = ({ eyeOpen, setEyeOpen }: PropsType) => {
  return (
    <button
      onClick={() => setEyeOpen(!eyeOpen)}
      type="button"
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

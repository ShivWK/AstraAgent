import { Eye, EyeOff } from 'lucide-react';

type PropsType = {
  eyeOpen: boolean;
  setEyeOpen: (value: boolean) => void;
};

const EyeButton = ({ eyeOpen, setEyeOpen }: PropsType) => {
  return (
    <button onClick={() => setEyeOpen(!eyeOpen)} type="button">
      {eyeOpen ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
  );
};

export default EyeButton;

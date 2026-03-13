import { CircleCheckBig, Info, CircleAlert, CircleX, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import styles from './toast.module.css';

const icons = {
  success: <CircleCheckBig className="icon" size={23.5} />,
  info: <Info className="icon" size={23.5} />,
  warning: <CircleAlert className="icon" size={23.5} />,
  error: <CircleX className="icon" size={23.5} />,
};

type PropsType = {
  type: 'info' | 'success' | 'error' | 'warning';
  animation: 'slide' | 'pop';
  message: string;
  duration: number;
  onClose: () => void;
};

const ToastItem = ({
  type = 'info',
  animation = 'slide',
  message,
  duration,
  onClose,
}: PropsType) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef(duration);

  const startTimer = () => {
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      onClose();
    }, remainingTimeRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current as NodeJS.Timeout);

    const elapsedTime = Date.now() - (startTimeRef.current as number);
    remainingTimeRef.current = remainingTimeRef.current - elapsedTime;
  };

  const resumeTimer = () => {
    startTimer();
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
  }, []);

  return (
    <div
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      className={`${styles['toast']} ${styles[type]} ${styles[animation]}`}
      role={type === 'success' || type === 'info' ? 'status' : 'alert'}
    >
      {icons[type]}
      <p className={`${styles['toast-msg']}`}>{message}</p>

      <button
        aria-label="Close"
        className={`${styles['closeBtn']}`}
        onClick={() => onClose()}
      >
        <X
          size={20}
          aria-hidden="true"
          color={type === 'warning' ? '#1f2937' : 'white'}
        />
      </button>

      <div
        className={`${styles['progress']}`}
        style={{
          animationDuration: `${duration}ms`,
        }}
      ></div>
    </div>
  );
};

export default ToastItem;

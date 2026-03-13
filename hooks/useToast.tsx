import { useState } from 'react';
import ToastItem from '@/components/toast/ToastItem';
import { createPortal } from 'react-dom';
import styles from '../components/toast/toast.module.css';

export type ArgumentsType = {
  type: 'info' | 'success' | 'error' | 'warning';
  animation: 'slide' | 'pop';
  message: string;
  duration: number;
};

type ToastArray = {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  animation: 'slide' | 'pop';
  message: string;
  duration: number;
}[];

type PropsType =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-mid'
  | 'bottom-mid';

const useToast = (position: PropsType = 'bottom-right') => {
  const [toasts, setToasts] = useState<ToastArray>([]);

  const triggerToast = ({
    message,
    type,
    duration,
    animation,
  }: ArgumentsType) => {
    // const isDuplicate = toasts.some(t => t.message === message);
    // if (isDuplicate) return;
    const id = crypto.randomUUID();
    const newToast = {
      id,
      message,
      type,
      animation,
      duration,
    };

    const MAX_SIZE = 5;

    setToasts((prv) => {
      const upload = [...prv, newToast];

      if (prv.length >= MAX_SIZE) {
        upload.shift();
      }

      return upload;
    });
  };

  const removeToast = (id: string) => {
    setToasts((prv) => prv.filter((t) => t.id !== id));
  };

  const ToastContainer =
    toasts.length !== 0
      ? createPortal(
          <div
            className={`${styles[position]}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {toasts.map((toast) => {
              return (
                <ToastItem
                  key={toast.id}
                  type={toast.type}
                  message={toast.message}
                  animation={toast.animation}
                  duration={toast.duration}
                  onClose={() => removeToast(toast.id)}
                />
              );
            })}
          </div>,
          document.body,
        )
      : null;

  return { ToastContainer, triggerToast };
};

export default useToast;

'use client';

import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { selectToast, removeToast } from '@/features/toast/toastSlice';
import ToastItem from './ToastItem';
import { createPortal } from 'react-dom';
import style from './toast.module.css';

const ToastContainer = () => {
  const toasts = useAppSelector(selectToast);
  const dispatch = useAppDispatch();

  if (typeof document === 'undefined' || toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div className={style['bottom-right']}>
      {toasts.map((toast) => {
        return (
          <ToastItem
            key={toast.id}
            type={toast.type}
            message={toast.message}
            animation={toast.animation}
            duration={toast.duration}
            onClose={() => dispatch(removeToast(toast.id))}
          />
        );
      })}
    </div>,
    document.body,
  );
};

export default ToastContainer;

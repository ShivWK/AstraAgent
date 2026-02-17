import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  showClasses: string;
  hideClasses: string;
  className?: string;
};

const Modal = ({
  open,
  onClose,
  children,
  className,
  showClasses,
  hideClasses,
}: DrawerProps) => {
  const drawer = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.getElementsByTagName('main')[0].setAttribute('inert', '');
      document.getElementsByTagName('header')[0].setAttribute('inert', '');
      document.body.style.overflow = 'hidden';
      drawer.current?.focus();
    } else {
      document.getElementsByTagName('main')[0].removeAttribute('inert');
      document.getElementsByTagName('header')[0].removeAttribute('inert');
      document.body.style.overflow = 'auto';
      lastFocusedElement.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    window.history.pushState({ drawer: true }, '');

    const handlePopState = () => {
      console.log('pop state');
      onClose();
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyPress);
    window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [open, onClose]);

  return createPortal(
    <div
      onClick={onClose}
      aria-hidden="true"
      className={`absolute inset-0 z-80 bg-black/70 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={drawer}
        aria-modal="true"
        aria-hidden={!open}
        role="dialog"
        tabIndex={-1}
        className={`${className} ${open ? showClasses : hideClasses} z-60 transform transition-all duration-200 ease-linear`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

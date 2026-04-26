import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
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
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const closeHandler = useCallback(() => {
    // window.history.back();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const call = async () => {
      setMounted(true);
    };

    call();
  }, []);

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0];
    const main = document.getElementsByTagName('main')[0];

    if (open) {
      const scrollWidth =
        window.innerWidth - document.documentElement.clientWidth;
      if (main) {
        main.setAttribute('inert', '');
      }

      if (header) {
        header.setAttribute('inert', '');
        header.style.paddingRight = `${scrollWidth}px`;
      }

      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollWidth}px`;
      modalRef.current?.focus();
    } else {
      if (main) {
        main.removeAttribute('inert');
      }

      if (header) {
        header.removeAttribute('inert');
        header.style.paddingRight = '0px';
      }

      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
      lastFocusedElement.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // window.history.pushState({ modal: true }, '');

    // const handlePopState = () => {
    //   console.log('pop state');
    //   onClose();
    // };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeHandler();
    };

    document.addEventListener('keydown', handleKeyPress);
    // window.addEventListener('popstate', handlePopState);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      // window.removeEventListener('popstate', handlePopState);
    };
  }, [open, onClose, closeHandler]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={closeHandler}
      aria-hidden="true"
      className={`fixed inset-0 z-50 bg-black/50 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        aria-modal="true"
        aria-hidden={!open}
        role="dialog"
        tabIndex={-1}
        className={`${className} ${open ? showClasses : hideClasses} z-60 transform transition-all duration-150 ease-linear`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

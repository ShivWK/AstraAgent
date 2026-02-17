import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DrawerProps = {
  open: boolean;
  onClose: (val: boolean) => void;
  children: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  className?: string;
};

const Drawer = ({ open, onClose, children, className, side }: DrawerProps) => {
  const drawer = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      drawer.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
      lastFocusedElement.current?.focus();
    }
  }, [open]);

  return createPortal(<div></div>, document.body);
};

export default Drawer;

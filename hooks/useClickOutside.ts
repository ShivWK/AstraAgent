import { useEffect } from 'react';

type Callback = () => void;

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  callback: Callback,
  enabled: boolean = true,
) {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (e: MouseEvent) => {
      const element = ref.current;

      if (element && !element.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, enabled]);
}

export default useClickOutside;

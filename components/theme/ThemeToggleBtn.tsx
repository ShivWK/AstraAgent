import { selectTheme, setTheme, Theme } from '@/features/theme/themeSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { useEffect, useRef, useState } from 'react';
import { LaptopMinimal, Smartphone, Moon, SunMedium } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

const ThemeToggleBtn = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [showDropDown, setShowDropDown] = useState(false);
  const [mounted, setMounted] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(popupRef, () => setShowDropDown(false), showDropDown);

  useEffect(() => {
    const call = () => {
      setMounted(true);
    };

    call();
  }, []);

  const clickHandler = (mode: Theme) => {
    dispatch(setTheme(mode));
    setShowDropDown(false);
  };

  const resolveTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    if (mediaQuery.matches) {
      return 'dark';
    } else {
      return 'light';
    }
  };

  if (!mounted) return null;
  const resolvedTheme = theme === 'system' ? resolveTheme() : theme;

  return (
    <div className="group relative">
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className="border-theme-btn-border bg-theme-btn-background hover:bg-theme-btn-hover-bg shadow-theme-btn-shadow flex transform items-center justify-center rounded-md border-2 p-1.5 transition-all duration-100 ease-linear hover:-translate-y-0.5 active:translate-y-0"
      >
        {resolvedTheme === 'light' ? (
          <SunMedium
            strokeWidth={1.5}
            className="text-theme-btn-icon size-5 transform transition-transform duration-150 ease-linear"
          />
        ) : (
          <Moon
            strokeWidth={1.5}
            className="text-theme-btn-icon size-5 transform transition-transform duration-150 ease-linear"
          />
        )}
      </button>

      {showDropDown && (
        <div
          ref={popupRef}
          className="bg-theme-btn-dropdown absolute top-11 left-1/2 -translate-x-1/2 transform rounded p-1 drop-shadow-[0_0_5px_#6a7282] backdrop-blur-md"
        >
          <div className="relative text-sm">
            <ul className="list-none">
              <li
                onClick={() => clickHandler('light')}
                className="hover:bg-primary flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1 hover:dark:text-black"
                style={{
                  backgroundColor: theme === 'light' ? '#cdcfd3' : '',
                  color: theme === 'light' ? 'black' : '',
                }}
              >
                <SunMedium strokeWidth={1.5} size={20} />
                <span>Light</span>
              </li>
              <li
                onClick={() => clickHandler('dark')}
                className="hover:bg-primary mt-0.5 flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1 hover:dark:text-black"
                style={{
                  backgroundColor: theme === 'dark' ? '#cdcfd3' : '',
                  color: theme === 'dark' ? 'black' : '',
                }}
              >
                <Moon strokeWidth={1.5} size={20} />
                <span>Dark</span>
              </li>
              <li
                onClick={() => clickHandler('system')}
                className="hover:bg-primary mt-0.5 flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1 hover:dark:text-black"
                style={{
                  backgroundColor: theme === 'system' ? '#cdcfd3' : '',
                  color: theme === 'system' ? 'black' : '',
                }}
              >
                <>
                  <Smartphone
                    strokeWidth={1.5}
                    size={20}
                    className="md:hidden"
                  />
                  <LaptopMinimal
                    strokeWidth={1.5}
                    size={20}
                    className="hidden md:block"
                  />
                </>
                <span>System</span>
              </li>
            </ul>
            <div
              id="triangle"
              className="border-b-theme-btn-dropdown absolute -top-3 left-1/2 -z-1 h-0 w-0 -translate-x-1/2 border-r-12 border-b-12 border-l-12 border-r-transparent border-l-transparent"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggleBtn;

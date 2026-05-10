import { selectTheme, setTheme } from '@/features/theme/themeSlice';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { useRef, useState } from 'react';
import { LaptopMinimal, Smartphone, Moon, Sun } from 'lucide-react';
import useClickOutside from '@/hooks/useClickOutside';

const ThemeToggleBtn = () => {
  const theme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const [showDropDown, setShowDropDown] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const isSmall = window.innerWidth <= 760;

  useClickOutside(popupRef, () => setShowDropDown(false), showDropDown);

  return (
    <div className="group relative">
      <button
        onClick={() => setShowDropDown(!showDropDown)}
        className="flex cursor-pointer items-center justify-center rounded-md border-2 px-1 py-1 dark:border-gray-500"
      >
        {theme === 'light' ? (
          <Sun
            strokeWidth={1.5}
            className="size-5 transform transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95"
          />
        ) : theme === 'dark' ? (
          <Moon
            strokeWidth={1.5}
            className="size-5 transform transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95"
          />
        ) : isSmall ? (
          <Smartphone
            strokeWidth={1.5}
            className="size-5 transition-all duration-150 ease-linear active:scale-95"
          />
        ) : (
          <LaptopMinimal
            strokeWidth={1.5}
            className="size-5 transform transition-transform duration-150 ease-linear group-hover:text-[#ff5200] active:scale-95"
          />
        )}
      </button>

      <div
        ref={popupRef}
        className="absolute top-11 left-1/2 -translate-x-1/2 transform rounded bg-white p-1 drop-shadow-[0_0_5px_#6a7282] dark:bg-gray-800"
        style={{
          display: showDropDown ? 'block' : 'none',
        }}
      >
        <div className="relative text-sm">
          <ul className="list-none">
            <li
              onClick={() => dispatch(setTheme('light'))}
              className="hover:bg-primary flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
              style={{
                backgroundColor: theme === 'light' ? '#e5e7eb' : '',
                color: theme === 'light' ? 'black' : '',
              }}
            >
              <Sun strokeWidth={1.5} size={20} />
              <span>Light</span>
            </li>
            <li
              onClick={() => dispatch(setTheme('dark'))}
              className="hover:bg-primary mt-0.5 flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
              style={{
                backgroundColor: theme === 'dark' ? '#e5e7eb' : '',
                color: theme === 'dark' ? 'black' : '',
              }}
            >
              <Moon strokeWidth={1.5} size={20} />
              <span>Dark</span>
            </li>
            <li
              onClick={() => dispatch(setTheme('system'))}
              className="hover:bg-primary mt-0.5 flex cursor-pointer items-center gap-2 rounded px-3.5 py-1.5 transition-all duration-100 hover:text-white md:px-3 md:py-1"
              style={{
                backgroundColor: theme === 'system' ? '#e5e7eb' : '',
                color: theme === 'system' ? 'black' : '',
              }}
            >
              {isSmall ? (
                <Smartphone strokeWidth={1.5} size={20} />
              ) : (
                <LaptopMinimal strokeWidth={1.5} size={20} />
              )}
              <span>System</span>
            </li>
          </ul>
          <div
            id="triangle"
            className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-r-12 border-b-12 border-l-12 border-r-transparent border-b-white border-l-transparent dark:border-b-gray-800"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggleBtn;

'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@lib/store';
import { setTheme } from '@lib/features/preferencesSlice';
import Cookies from 'js-cookie';

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.preferences.theme);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        dispatch(setTheme(newTheme));

        Cookies.set('theme', newTheme, { expires: 365 });
    };

    return (
        <button
            onClick={toggleTheme}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors duration-300 focus:outline-none"
        >
            <span className="sr-only">Zmień tryb</span>

            <span
                className={`${
                    theme === 'dark' ? 'translate-x-7 bg-primary-black' : 'translate-x-1 bg-primary-white'
                } inline-block h-6 w-6 transform rounded-full transition duration-300 ease-in-out shadow-md flex items-center justify-center`}
            >
                {theme === 'dark' ? '🌙' : '☀️'}
            </span>
        </button>
    );
}
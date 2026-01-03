'use client'

import { useAppSelector } from '@lib/hooks';
import { PopupItem } from './PopupItem';

export const PopupContainer = () => {
    const popups = useAppSelector((state) => state.popups.popups);

    if (popups.length === 0) return null;

    return (
        <div className="fixed z-70 flex flex-col gap-3 pointer-events-none top-20 left-0 right-0 px-4 items-center md:top-auto md:bottom-8 md:right-8 md:left-auto md:items-end md:px-0">
            {popups.map((popup) => (
                <div key={popup.id} className="pointer-events-auto w-full sm:w-auto">
                    <PopupItem {...popup} />
                </div>
            ))}
        </div>
    );
};
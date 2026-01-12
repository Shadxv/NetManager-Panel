'use client'

import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { useTranslations } from 'next-intl';
import { SortOption } from "@/types";
import { Fragment } from 'react';
import {useUsers} from "@/components/dashboard/users";

export const SortDropdown = () => {
    const t = useTranslations('Users');
    const { sortBy, setSortBy } = useUsers();

    const options: SortOption[] = ['indexAsc', 'nameAsc', 'emailAsc', 'dateDesc'];

    return (
        <div className="relative inline-block text-left">
            <Listbox value={sortBy} onChange={setSortBy}>
                <ListboxButton className="dashboard-small-btn max-w-30 md:max-w-48 bg-secondary-white/20 dark:bg-primary-gray text-muted-gray dark:text-secondary-white pr-10 pl-4 relative text-left min-w-40">
                    <span className="truncate">
                        {t('sortByLabel')}: {t(sortBy)}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </ListboxButton>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ListboxOptions className="absolute right-0 z-50 mt-2.5 w-full min-w-50 overflow-auto rounded-xl bg-primary-white dark:bg-primary-black py-2 shadow-lg  shadow-primary-black/10 border border-primary-black/10 dark:border-primary-white/10 focus:outline-none ring-1 ring-primary-white dark:ring-primary-black ring-opacity-5">
                        {options.map((option) => (
                            <ListboxOption
                                key={option}
                                value={option}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 px-4 transition-colors ${
                                        active
                                            ? 'bg-secondary-white/10 dark:bg-primary-gray/50 text-primary-black dark:text-primary-white'
                                            : 'text-muted-gray dark:text-muted-white'
                                    }`
                                }
                            >
                                <span className="block truncate font-medium">
                                    {t(option)}
                                </span>
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Transition>
            </Listbox>
        </div>
    )
}
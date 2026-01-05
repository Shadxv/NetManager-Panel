'use client'

import React, {useState} from "react";
import {SortDropdown} from "@/components/dashboard/users";
import {useTranslations} from "next-intl";
import {FiltersComponent} from "@/components/dashboard/users/FiltersComponent";


export const ControlBar = () => {
    const t = useTranslations('Users');
    const [filterMenuOpen, setFilterMenuOpen] = useState(false)

    return (
        <div className="w-full flex flex-col gap-4 p-4 rounded-xl shadow-md shadow-primary-black/10 bg-primary-white dark:bg-primary-black">
            <div className="w-full flex justify-between">
                <button className="dashboard-small-btn bg-accent text-primary-white">New user</button>
                <div className="flex gap-2">
                    <button onClick={() => setFilterMenuOpen(prev => !prev)} className={`dashboard-small-btn ${filterMenuOpen ? "bg-accent text-primary-white" : "bg-secondary-white/20 dark:bg-primary-gray text-muted-gray dark:text-secondary-white"} transition-colors duration-300`}>Filters</button>
                    <SortDropdown/>
                </div>
            </div>
            {filterMenuOpen && (
                <>
                    <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/10" />
                    <FiltersComponent/>
                </>
            )}
        </div>
    )
}
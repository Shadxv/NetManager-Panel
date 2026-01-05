'use client'

import React, { useMemo } from 'react';
import { Formik, Form, Field } from 'formik';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { FilterValues, BaseUser, BaseRole } from "@/types";
import {useUsers} from "@/components/dashboard/users/UsersContext";
import {Avatar} from "@/components/AvatarComponent";

export const FiltersComponent = () => {
    const t = useTranslations("Users.filters");
    const { filters, setFilters, rolesCache, users } = useUsers();

    const defaultValues: FilterValues = {
        email: '',
        name: '',
        roles: [],
        createdBefore: undefined,
        createdAfter: undefined,
        notProvisionedOnly: false,
        createdBy: ''
    };

    const creators = useMemo(() => {
        const creatorIds = Array.from(new Set(users.map(u => u.createdBy).filter(Boolean)));
        return users.filter(u => creatorIds.includes(u.id));
    }, [users]);

    const availableRoles = useMemo(() => Object.values(rolesCache), [rolesCache]);

    const getUserName = (user?: BaseUser) => {
        if (!user) return t("unknown")

        if (!user.name || !user.surname) return user.email
        else return `${user.name} ${user.surname}`
    }

    return (
        <Formik
            initialValues={filters}
            enableReinitialize={true}
            onSubmit={(values) => setFilters(values)}
        >
            {({ values, setFieldValue, submitForm, resetForm, dirty }) => (
                <Form className="w-full flex flex-wrap gap-8 items-end">
                    <div className="flex gap-2 flex-wrap grow shrink">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="form-label">{t("searchByName")}</label>
                            <Field
                                name="name"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('name', e.target.value);
                                    submitForm();
                                }}
                                className="form-input"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="name" className="form-label">{t("searchByEmail")}</label>
                            <Field
                                name="email"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('email', e.target.value);
                                    submitForm();
                                }}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap grow shrink">
                        <Listbox
                            value={values.roles}
                            onChange={(val: string[]) => {
                                setFieldValue('roles', val);
                                submitForm();
                            }}
                            multiple
                        >
                            <div className="relative">
                                <ListboxButton className="form-input p-2 min-w-48">
                                    <span className="truncate">
                                        {values.roles && values.roles.length > 0
                                            ? `${t('roles')}: ${values.roles.length}`
                                            : t('selectRoles')}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </ListboxButton>
                                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <ListboxOptions className="absolute z-50 mt-2 min-w-50 bg-primary-white dark:bg-primary-black rounded-xl shadow-lg border border-primary-black/10 dark:border-primary-white/10 py-2">
                                        {availableRoles.map((role: BaseRole) => (
                                            <ListboxOption key={role.id} value={role.id} className="cursor-pointer select-none py-2 px-4 flex items-center gap-3 hover:bg-secondary-white/10 transition-colors">
                                                <div className={`w-4 h-4 rounded border border-primary-black/20 dark:border-primary-white/20 flex items-center justify-center transition-colors ${values.roles?.includes(role.id) ? 'bg-primary-blue border-transparent' : 'bg-transparent'}`}>
                                                    {values.roles?.includes(role.id) && (
                                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                    )}
                                                </div>
                                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: role.color }} />
                                                <span className="text-sm dark:text-primary-white">{role.name}</span>
                                            </ListboxOption>
                                        ))}
                                        <ListboxOption
                                            value="none"
                                            className="cursor-pointer select-none py-2 px-4 flex items-center gap-3 hover:bg-secondary-white/10 transition-colors"
                                        >
                                            <div className={`w-4 h-4 rounded border border-primary-black/20 dark:border-primary-white/20 flex items-center justify-center transition-colors ${values.roles?.includes("none") ? 'bg-primary-blue border-transparent' : 'bg-transparent'}`}>
                                                {values.roles?.includes("none") && (
                                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                )}
                                            </div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-primary-gray" />
                                            <span className="text-sm dark:text-primary-white font-medium">{t('noRole')}</span>
                                        </ListboxOption>
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </Listbox>

                        <Listbox
                            value={values.createdBy}
                            onChange={(val: string) => {
                                setFieldValue('createdBy', val);
                                submitForm();
                            }}
                        >
                            <div className="relative">
                                <ListboxButton className="form-input p-2 min-w-48">
                                    <span className="truncate">
                                        {values.createdBy
                                            ? getUserName(creators.find(c => c.id === values.createdBy))
                                            : t('selectCreator')}
                                    </span>
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </ListboxButton>
                                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                    <ListboxOptions className="absolute z-50 mt-2 min-w-60 bg-primary-white dark:bg-primary-black rounded-xl shadow-lg border border-primary-black/10 dark:border-primary-white/10 py-2">
                                        <ListboxOption value="" className="cursor-pointer select-none py-2 px-4 text-sm text-muted-gray hover:bg-secondary-white/10 italic">
                                            {t('allCreators')}
                                        </ListboxOption>
                                        {creators.map((creator: BaseUser) => (
                                            <ListboxOption key={creator.id} value={creator.id} className="cursor-pointer select-none py-2 px-4 flex items-center gap-3 hover:bg-secondary-white/10">
                                                <Avatar size="size-6" src={creator.avatar} />
                                                <span className="text-sm dark:text-primary-white truncate">
                                                    {creator.name && creator.surname ? `${creator.name} ${creator.surname}` : creator.email}
                                                </span>
                                            </ListboxOption>
                                        ))}
                                    </ListboxOptions>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>

                    <div className="flex gap-2 flex-wrap grow shrink">
                        <div className="flex flex-col">
                            <label htmlFor="createdAfter" className="form-label">{t('from')}</label>
                            <Field
                                type="date"
                                name="createdAfter"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('createdAfter', e.target.value);
                                    submitForm();
                                }}
                                className="form-input"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="createdBefore" className="form-label">{t('to')}</label>
                            <Field
                                type="date"
                                name="createdBefore"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('createdBefore', e.target.value);
                                    submitForm();
                                }}
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Field
                            type="checkbox"
                            name="notProvisionedOnly"
                            className="accent-accent size-5"
                        />
                        <label className="form-label">{t('showOnlyUnprovisioned')}</label>
                    </div>
                    <div className="w-full flex justify-end">
                        <button
                            type="button"
                            onClick={() => {
                                resetForm({ values: defaultValues });
                                setFilters(defaultValues);
                            }}
                            disabled={JSON.stringify(values) === JSON.stringify(defaultValues)}
                            className="dashboard-small-btn disabled:bg-secondary-gray/20 disabled:text-muted-white dark:disabled:bg-secondary-gray dark:disabled:text-secondary-white disabled:cursor-not-allowed bg-accent text-primary-white cursor-pointer"
                        >
                            {t('resetFilters')}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
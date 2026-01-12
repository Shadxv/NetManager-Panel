'use client'

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Formik, Form, FieldArray, FormikProps, FormikState } from 'formik';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { BaseRole, UserDetails } from "@/types";
import { RESTAPI_URL } from "@/constants";
import axios from 'axios';
import { useRouter, usePathname } from "next/navigation";
import { AlertComponent } from "@/components/dashboard";
import { useAppDispatch } from "@lib/hooks";
import { addPopup } from "@lib/features/popupSlice";

declare global {
    interface Window {
        nextStepUrl?: string;
    }
}

interface UserUpdatePayload {
    roleId: string | undefined;
    additionalPermissions: string[];
}

export const UserForm = ({ user }: { user: UserDetails }) => {
    const t = useTranslations("Users");
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();

    const [availableRoles, setAvailableRoles] = useState<BaseRole[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [tempValue, setTempValue] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [showLeaveModal, setShowLeaveModal] = useState(false);

    const formikRef = useRef<FormikProps<UserDetails>>(null);

    useEffect(() => {
        axios.get<BaseRole[]>(`${RESTAPI_URL}/roles`)
            .then(res => setAvailableRoles(res.data))
            .catch(err => console.error("Error roles:", err));
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (formikRef.current?.dirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && formikRef.current?.dirty) {
                const href = anchor.getAttribute('href');
                if (href && !href.startsWith('#') && href !== pathname) {
                    e.preventDefault();
                    window.nextStepUrl = href;
                    setShowLeaveModal(true);
                }
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [pathname]);

    const handleFinalize = (values: string[], setFieldValue: (field: string, value: string[]) => void) => {
        const trimmed = tempValue.trim();
        if (trimmed && !values.includes(trimmed)) {
            const newList = [...values, trimmed].sort((a, b) => a.localeCompare(b));
            setFieldValue('additionalPermissions', newList);
        }
        setIsAdding(false);
        setEditingIndex(null);
        setTempValue('');
    };

    const handleFormSubmit = (
        values: UserDetails,
        resetForm: (nextState?: Partial<FormikState<UserDetails>>) => void
    ) => {
        const payload: UserUpdatePayload = {
            roleId: values.roleId,
            additionalPermissions: values.additionalPermissions
        };

        axios.patch(`${RESTAPI_URL}/users/${user.id}`, payload)
            .then(() => {
                resetForm({ values });
                dispatch(addPopup({ type: "success", message: "saveUserSuccess" }));

                if (window.nextStepUrl) {
                    const url = window.nextStepUrl;
                    window.nextStepUrl = undefined;
                    setShowLeaveModal(false);
                    router.push(url);
                }
            })
            .catch(() => {
                dispatch(addPopup({ type: "error", message: "saveUserError" }));
            });
    };

    return (
        <>
            <Formik
                innerRef={formikRef}
                initialValues={{...user, additionalPermissions: [...user.additionalPermissions].sort()}}
                onSubmit={(values, { resetForm }) => handleFormSubmit(values, resetForm)}
            >
                {({ values, setFieldValue, dirty, isSubmitting, submitForm, resetForm, initialValues }) => (
                    <Form className="flex flex-col gap-8 w-full">

                        <div className="flex flex-col gap-2 max-w-3xl">
                            <label className="form-label">{t('role')}</label>
                            <Listbox value={values.roleId} onChange={(val: string | null) => setFieldValue('roleId', val)}>
                                <div className="relative">
                                    <ListboxButton className="form-input flex items-center justify-between w-full transition-all p-2 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            {values.roleId && availableRoles.find(r => r.id === values.roleId) ? (
                                                <>
                                                    <div className="size-2.5 rounded-full" style={{ backgroundColor: availableRoles.find(r => r.id === values.roleId)?.color }} />
                                                    <span className="text-sm font-medium">{availableRoles.find(r => r.id === values.roleId)?.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-sm opacity-40">{t('none')}</span>
                                            )}
                                        </div>
                                        <svg className="size-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </ListboxButton>

                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <ListboxOptions className="absolute z-50 mt-2 w-full bg-primary-white dark:bg-primary-black rounded-xl shadow-2xl border border-primary-black/10 dark:border-primary-white/10 py-2 focus:outline-none max-h-60 overflow-auto">
                                            {availableRoles.map((role) => (
                                                <ListboxOption key={role.id} value={role.id}>
                                                    {({ selected, focus }) => (
                                                        <div className={`cursor-pointer select-none py-2.5 px-4 flex items-center justify-between transition-colors ${focus ? 'bg-secondary-white/10' : ''} ${selected ? 'bg-accent/5' : ''}`}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-2 rounded-full" style={{ backgroundColor: role.color }} />
                                                                <span className={`text-sm ${selected ? 'text-accent' : 'dark:text-primary-white'}`}>{role.name}</span>
                                                            </div>
                                                            {selected && <svg className="size-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                                        </div>
                                                    )}
                                                </ListboxOption>
                                            ))}

                                            <ListboxOption value={null}>
                                                {({ selected, focus }) => (
                                                    <div className={`cursor-pointer select-none py-2.5 px-4 flex items-center justify-between transition-colors ${focus ? 'bg-secondary-white/10' : ''}`}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-2 rounded-full border border-dashed border-primary-black/20 dark:border-primary-white/20" />
                                                            <span className={`text-sm ${selected ? 'text-accent' : 'dark:text-primary-white'}`}>{t('none')}</span>
                                                        </div>
                                                        {selected && <svg className="size-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                                    </div>
                                                )}
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>

                        <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/10" />

                        <div className="flex flex-col gap-3">
                            <label className="form-label">{t('additionalPermissions')}</label>
                            <div className="p-3 rounded-2xl border border-primary-black/10 dark:border-primary-white/10 bg-secondary-white/5 min-h-[120px] flex flex-wrap gap-2.5 content-start transition-all focus-within:border-accent/40">
                                <FieldArray name="additionalPermissions">
                                    {({ remove }) => (
                                        <>
                                            {values.additionalPermissions.map((perm, index) => (
                                                <div key={perm} className="group flex items-center gap-2 px-4 pr-2 py-1.5 bg-primary-white dark:bg-secondary-black rounded-full border border-primary-black/5 dark:border-primary-white/10 hover:border-accent/40 hover:shadow-sm transition-all max-w-full">
                                                    {editingIndex === index ? (
                                                        <div className="relative flex items-center min-w-5 max-w-full overflow-hidden">
                                                            <span className="invisible whitespace-pre text-xs px-1">{tempValue || " "}</span>
                                                            <input
                                                                autoFocus
                                                                className="absolute inset-0 bg-transparent outline-none text-xs w-full dark:text-primary-white px-1"
                                                                value={tempValue}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValue(e.target.value)}
                                                                onBlur={() => handleFinalize(values.additionalPermissions, setFieldValue)}
                                                                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleFinalize(values.additionalPermissions, setFieldValue)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="text-xs dark:text-primary-white cursor-pointer truncate max-w-full" onClick={() => { setEditingIndex(index); setTempValue(perm); }}>
                                                                {perm}
                                                            </span>
                                                            <button type="button" onClick={() => remove(index)} className="opacity-0 group-hover:opacity-100 flex items-center justify-center p-0.5 hover:bg-accent/10 rounded-full transition-all text-accent shrink-0">
                                                                <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                            {isAdding ? (
                                                <div className="relative flex items-center px-4 py-1.5 rounded-full border border-accent bg-transparent min-w-15 max-w-full">
                                                    <span className="invisible whitespace-pre text-xs px-1">{tempValue || " "}</span>
                                                    <input
                                                        autoFocus
                                                        className="absolute inset-0 bg-transparent outline-none text-xs w-full dark:text-primary-white px-4"
                                                        value={tempValue}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempValue(e.target.value)}
                                                        onBlur={() => handleFinalize(values.additionalPermissions, setFieldValue)}
                                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleFinalize(values.additionalPermissions, setFieldValue)}
                                                    />
                                                </div>
                                            ) : (
                                                <button type="button" onClick={() => setIsAdding(true)} className="px-4 py-1.5 rounded-full border border-dashed border-primary-black/20 dark:border-primary-white/20 text-[10px] font-bold text-muted-gray hover:border-accent hover:text-accent transition-all flex items-center gap-1.5 cursor-pointer">
                                                    <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                                                    {t('addPermission').toUpperCase()}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </FieldArray>
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-6 border-t border-primary-black/5 dark:border-primary-white/5 pt-6 mt-4">
                            <button
                                type="button"
                                onClick={() => submitForm()}
                                disabled={isSubmitting || !dirty}
                                className={`
                                flex justify-center items-center p-3 px-8 rounded-xl transition-all duration-300 shadow-lg
                                ${(isSubmitting || !dirty)
                                    ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none scale-100"
                                    : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                                }
                            `}
                            >
                                {isSubmitting ? (
                                    <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : t("saveChanges")}
                            </button>
                        </div>

                        <AlertComponent
                            isOpen={showLeaveModal}
                            onClose={() => {
                                setShowLeaveModal(false);
                                window.nextStepUrl = undefined;
                            }}
                            type="warning"
                            title={t("unsavedChangesTitle")}
                            description={t("unsavedChangesDescription")}
                            onProceed={() => {
                                const url = window.nextStepUrl || '/dashboard/users';
                                resetForm({ values: initialValues });
                                router.push(url);
                            }}
                            proceedLabel={t("discardChanges")}
                            onRight={() => {
                                submitForm();
                                setShowLeaveModal(false);
                            }}
                            rightLabel={t("saveAndExit")}
                            isLoading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};
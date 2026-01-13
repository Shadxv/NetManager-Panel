'use client';

import React, { useRef, Fragment, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import axios from 'axios';
import { useFormik } from 'formik';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { RESTAPI_URL } from "@/constants";
import { CloseIcon } from "@/components/icons";
import { useAppDispatch } from "@lib/hooks";
import { addPopup } from "@lib/features/popupSlice";
import { BaseUser, BaseRole } from "@/types";
import {useUsers} from "@/components/dashboard/users/UsersContext";
import {usePermissions} from "@/hooks";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
    const t = useTranslations('Users');
    const tErrors = useTranslations('Popups');
    const { users, setUsers } = useUsers();
    const dispatch = useAppDispatch();

    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [serverError, setServerError] = useState<string | null>(null);
    const [allRoles, setAllRoles] = useState<BaseRole[]>([]);

    const {canManageIndex} = usePermissions();

    useEffect(() => {
        if (isOpen) {
            axios.get<BaseRole[]>(`${RESTAPI_URL}/roles`)
                .then(res => {
                    setAllRoles(res.data.sort((a, b) => a.index - b.index));
                })
                .catch(err => console.error("Failed to fetch roles:", err));
        }
    }, [isOpen]);

    const expiryOptions = ['1h', '12h', '1d', '3d', '7d'];

    const formik = useFormik({
        initialValues: {
            email: '',
            roleId: '' as string,
            expiry: '1d'
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = t('errorInvalidEmail');
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setServerError(null);
            try {
                const response = await axios.post<BaseUser>(`${RESTAPI_URL}/users`, {
                    email: values.email,
                    roleId: values.roleId || null,
                    duration: values.expiry
                });

                setUsers([...users, response.data]);
                dispatch(addPopup({ type: "success", message: "userCreated" }));
                resetForm();
                onClose();
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    if (err.response?.status === 409) {
                        setServerError("emailExists");
                    } else {
                        setServerError("userCreateError");
                    }
                }
            } finally {
                setSubmitting(false);
            }
        }
    });

    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, isValid } = formik;

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
            gsap.fromTo(containerRef.current,
                { scale: 0.95, opacity: 0, y: 10 },
                { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, { dependencies: [isOpen] });

    const handleClose = () => {
        setServerError(null);
        formik.resetForm();
        onClose();
    };

    const selectedRole = allRoles.find(r => r.id === values.roleId);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <div ref={overlayRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0" onClick={handleClose} />

            <div ref={containerRef} className="relative w-full max-w-lg bg-primary-white dark:bg-secondary-black rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
                <button type="button" onClick={handleClose} className="absolute top-6 right-6 text-muted-gray hover:text-accent transition-colors size-5">
                    {CloseIcon}
                </button>

                <h2 className="text-primary-black dark:text-primary-white text-2xl font-bold">{t('createUser')}</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="form-label">{t('email')}</label>
                        <input
                            name="email"
                            type="email"
                            className={`form-input ${touched.email && errors.email ? 'form-input-error' : ''}`}
                            onChange={(e) => {
                                setServerError(null);
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                            value={values.email}
                        />
                        {touched.email && errors.email && (
                            <span className="text-red-primary text-xs font-medium">{errors.email}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="form-label">{t('role')}</label>
                            <Listbox value={values.roleId} onChange={(val) => setFieldValue('roleId', val)}>
                                <div className="relative">
                                    <ListboxButton className="form-input flex items-center justify-between w-full text-left p-2">
                                        <div className="flex items-center gap-3">
                                            {selectedRole ? (
                                                <>
                                                    <div className="size-2.5 rounded-full" style={{ backgroundColor: selectedRole.color }} />
                                                    <span className="text-sm font-medium">{selectedRole.name}</span>
                                                </>
                                            ) : (
                                                <span className="text-sm opacity-40">{t('none')}</span>
                                            )}
                                        </div>
                                        <svg className="size-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </ListboxButton>

                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <ListboxOptions className="absolute z-50 mt-2 w-full bg-primary-white dark:bg-primary-black rounded-xl shadow-2xl border border-primary-black/10 dark:border-primary-white/10 py-2 max-h-60 overflow-auto">
                                            {allRoles.filter(role => canManageIndex(role.index)).map((role) => (
                                                <ListboxOption key={role.id} value={role.id}>
                                                    {({ selected, focus }) => (
                                                        <div className={`cursor-pointer py-2.5 px-4 flex items-center justify-between ${focus ? 'bg-secondary-white/10' : ''} ${selected ? 'bg-accent/5' : ''}`}>
                                                            <div className="flex items-center gap-3">
                                                                <div className="size-2 rounded-full" style={{ backgroundColor: role.color }} />
                                                                <span className={`text-sm ${selected ? 'text-accent' : 'dark:text-primary-white'}`}>{role.name}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                            <ListboxOption value="">
                                                {({ selected, focus }) => (
                                                    <div className={`cursor-pointer py-2.5 px-4 flex items-center justify-between ${focus ? 'bg-secondary-white/10' : ''} ${selected ? 'bg-accent/5' : ''}`}>
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-2 rounded-full border border-dashed border-primary-black/20 dark:border-primary-white/20" />
                                                            <span className={`text-sm ${selected ? 'text-accent' : 'dark:text-primary-white'}`}>{t('none')}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </ListboxOption>
                                        </ListboxOptions>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="form-label">{t('expiry')}</label>
                            <Listbox value={values.expiry} onChange={(val) => setFieldValue('expiry', val)}>
                                <div className="relative">
                                    <ListboxButton className="form-input flex items-center justify-between w-full p-2">
                                        <span className="text-sm font-medium">{values.expiry}</span>
                                        <svg className="size-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </ListboxButton>
                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <ListboxOptions className="absolute z-50 mt-2 w-full bg-primary-white dark:bg-primary-black rounded-xl shadow-2xl border border-primary-black/10 dark:border-primary-white/10 py-2">
                                            {expiryOptions.map((opt) => (
                                                <ListboxOption key={opt} value={opt}>
                                                    {({ selected, focus }) => (
                                                        <div className={`cursor-pointer py-2.5 px-4 ${focus ? 'bg-secondary-white/10' : ''} ${selected ? 'bg-accent/5' : ''}`}>
                                                            <span className={`text-sm ${selected ? 'text-accent font-bold' : 'dark:text-primary-white'}`}>{opt}</span>
                                                        </div>
                                                    )}
                                                </ListboxOption>
                                            ))}
                                        </ListboxOptions>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                    </div>

                    {serverError && (
                        <div className="w-full bg-red-primary rounded-xl p-3 text-primary-white text-xs sm:text-base">
                            {tErrors(serverError)}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid || !values.email}
                        className={`
                                flex justify-center items-center mx-12 p-3 px-6 rounded-xl transition-all duration-300 shadow-lg
                                ${(!isValid || isSubmitting || !values.email)
                                ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none scale-100"
                                : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                                }
                        `}
                    >
                        {isSubmitting ? <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : t('create')}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};
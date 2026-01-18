'use client';

import React, { useRef, Fragment, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useFormik } from 'formik';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CloseIcon } from "@/components/icons";
import { ServiceType, ServiceBaseInfo } from "@/types/services";
import { useServices } from "@/components/dashboard/services/ServicesContext";
import axios, { AxiosError } from 'axios';
import { GATEWAY_URL } from "@/constants";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";
import { useTranslations } from "next-intl";

interface PaperVersionResponse { versions: string[]; }
interface PaperBuildsResponse { builds: { build: number; }[]; }

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ProjectType = 'paper' | 'velocity';

export const CreateServiceModal = ({ isOpen, onClose }: CreateServiceModalProps) => {
    const t = useTranslations("Services.Create");
    const tErrors = useTranslations("Errors");
    const { services, addService } = useServices();
    const dispatch = useDispatch();

    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [versions, setVersions] = useState<string[]>([]);
    const [builds, setBuilds] = useState<number[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            type: 'paper' as ProjectType,
            version: '',
            build: '' as string | number,
            port: 30000
        },
        validate: (values) => {
            const errors: Record<string, string> = {};
            if (!values.name) {
                errors.name = t('required');
            } else if (!/^[a-z0-9-_]+$/.test(values.name)) {
                errors.name = t('invalidNameFormat');
            } else if (services.some(s => s.name.toLowerCase() === values.name.toLowerCase())) {
                errors.name = t('nameTaken');
            }
            return errors;
        },
        onSubmit: (values, { setSubmitting, resetForm }) => {
            setApiError(null);
            const serviceType: ServiceType = values.type === 'paper' ? 'PAPER' : 'VELOCITY';

            const requestBody = {
                name: values.name,
                type: serviceType,
                data: {
                    version: values.version,
                    build: Number(values.build),
                    port: values.type === 'velocity' ? Number(values.port) : undefined
                }
            };

            axios.post(`${GATEWAY_URL}/services/create`, requestBody)
                .then((response) => {
                    const newService: ServiceBaseInfo = response.data;
                    addService(newService);
                    dispatch(addPopup({ type: "success", message: "successCreateService" }));
                    resetForm();
                    onClose();
                })
                .catch(() => setApiError(tErrors("errorCreatingService")))
                .finally(() => setSubmitting(false));
        }
    });

    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, isValid, handleBlur } = formik;

    const clampPort = (val: number) => {
        const min = 30000;
        const max = 32767;
        if (val < min) return min;
        if (val > max) return max;
        return val;
    };

    const loadVersions = useCallback(async (project: ProjectType) => {
        setIsLoadingData(true);
        try {
            const res = await fetch(`https://api.papermc.io/v2/projects/${project}`);
            const data: PaperVersionResponse = await res.json();
            setVersions([...data.versions].reverse());
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingData(false);
        }
    }, []);

    const loadBuilds = useCallback(async (project: ProjectType, ver: string) => {
        setIsLoadingData(true);
        try {
            const res = await fetch(`https://api.papermc.io/v2/projects/${project}/versions/${ver}/builds`);
            const data: PaperBuildsResponse = await res.json();
            setBuilds(data.builds.map(b => b.build).reverse());
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoadingData(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            loadVersions(values.type);
            const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
            window.addEventListener('keydown', handleEsc);
            return () => window.removeEventListener('keydown', handleEsc);
        }
    }, [isOpen, values.type, loadVersions, onClose]);

    useEffect(() => {
        if (isOpen && values.version) loadBuilds(values.type, values.version);
    }, [isOpen, values.version, values.type, loadBuilds]);

    useGSAP(() => {
        if (isOpen) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
            gsap.fromTo(containerRef.current,
                { scale: 0.95, opacity: 0, y: 10 },
                { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, { dependencies: [isOpen] });

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 text-primary-black dark:text-primary-white">
            <div ref={overlayRef} className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0" onClick={onClose} />

            <div ref={containerRef} className="relative w-full max-w-lg bg-primary-white dark:bg-secondary-black rounded-3xl shadow-2xl p-8 flex flex-col gap-8">
                <button type="button" onClick={onClose} className="absolute top-6 right-6 text-muted-gray hover:text-accent transition-colors size-5 cursor-pointer">
                    {CloseIcon}
                </button>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold">{t('title')}</h2>
                    <p className="text-sm text-muted-gray font-light">{t('subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="form-label">{t('name')}</label>
                        <input
                            name="name"
                            placeholder={t('namePlaceholder')}
                            className={`form-input ${touched.name && errors.name ? 'form-input-error' : ''}`}
                            onChange={formik.handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <span className="text-red-primary text-xs font-medium">{errors.name}</span>
                        )}
                    </div>

                    <div className={`grid ${values.type === 'velocity' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                        <CustomSelect<ProjectType>
                            label={t('engine')}
                            value={values.type}
                            options={['paper', 'velocity']}
                            onChange={(val) => {
                                setFieldValue('type', val);
                                setFieldValue('version', '');
                                setFieldValue('build', '');
                            }}
                        />

                        {values.type === 'velocity' && (
                            <div className="flex flex-col gap-2">
                                <label className="form-label">{t('port')}</label>
                                <input
                                    name="port"
                                    type="number"
                                    className="form-input h-10.5"
                                    onChange={formik.handleChange}
                                    onBlur={(e) => {
                                        setFieldValue('port', clampPort(Number(e.target.value)));
                                        handleBlur(e);
                                    }}
                                    value={values.port}
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect<string>
                            label={t('version')}
                            value={values.version}
                            options={versions}
                            placeholder={t('selectVersion')}
                            onChange={(val) => {
                                setFieldValue('version', val);
                                setFieldValue('build', '');
                            }}
                            loading={isLoadingData}
                        />

                        <CustomSelect<string | number>
                            label={t('build')}
                            value={values.build}
                            options={builds}
                            placeholder={t('selectBuild')}
                            onChange={(val) => setFieldValue('build', val)}
                            loading={isLoadingData}
                        />
                    </div>

                    {apiError && (
                        <div className="w-full bg-red-primary rounded-xl p-3 text-primary-white text-xs font-medium">
                            {apiError}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid || !values.name || !values.version || !values.build}
                        className={`mt-4 flex justify-center items-center p-3 px-6 rounded-xl transition-all duration-300 shadow-lg font-medium
                            ${(!isValid || isSubmitting || !values.name || !values.version || !values.build)
                            ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none"
                            : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="size-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            t('deploy')
                        )}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

function CustomSelect<T extends string | number>({ label, value, options, onChange, loading, placeholder }: { label: string, value: T, options: T[], onChange: (val: T) => void, loading?: boolean, placeholder?: string }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="form-label">{label}</label>
            <Listbox value={value} onChange={onChange} disabled={loading}>
                <div className="relative">
                    <ListboxButton className="form-input flex items-center justify-between w-full p-2 text-left min-h-10.5">
                        <span className={`text-sm font-medium truncate ${!value ? 'opacity-40' : ''}`}>
                            {loading ? "..." : (value || placeholder || '...')}
                        </span>
                        {!loading && (
                            <svg className="size-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </ListboxButton>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <ListboxOptions className="absolute z-110 mt-2 w-full bg-primary-white dark:bg-secondary-black rounded-xl shadow-2xl border border-primary-black/10 dark:border-muted-gray/20 py-2 max-h-48 overflow-auto">
                            {options.map((opt) => (
                                <ListboxOption key={opt} value={opt}>
                                    {({ selected, focus }) => (
                                        <div className={`cursor-pointer py-2 px-4 text-sm transition-colors 
                                            ${focus ? 'bg-accent/10 text-accent' : 'dark:text-primary-white'} 
                                            ${selected ? 'bg-accent/5 text-accent font-medium' : ''}`}
                                        >
                                            {opt}
                                        </div>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
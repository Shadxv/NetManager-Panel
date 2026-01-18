'use client';

import React, { useRef, Fragment, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useFormik } from 'formik';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
import { CloseIcon } from "@/components/icons";
import { ServiceType } from "@/types/services";
import {useServices} from "@/components/dashboard/services/ServicesContext";


interface PaperVersionResponse {
    versions: string[];
}

interface PaperBuildsResponse {
    builds: {
        build: number;
    }[];
}

interface CreateServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ProjectType = 'paper' | 'velocity';

interface CustomSelectProps<T> {
    label: string;
    value: T;
    options: T[];
    onChange: (val: T) => void;
    loading?: boolean;
}

export const CreateServiceModal = ({ isOpen, onClose }: CreateServiceModalProps) => {
    const { services, addService } = useServices();

    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [versions, setVersions] = useState<string[]>([]);
    const [builds, setBuilds] = useState<number[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(false);

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
                errors.name = 'Required';
            } else if (!/^[a-z0-9-]+$/.test(values.name)) {
                errors.name = 'lowercase, numbers and hyphens only';
            } else if (services.some(s => s.name.toLowerCase() === values.name.toLowerCase())) {
                errors.name = 'Name already taken';
            }

            if (values.type === 'velocity') {
                if (values.port < 30000 || values.port > 32767) {
                    errors.port = 'Range: 30000–32767';
                }
            }
            return errors;
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            const serviceType: ServiceType = values.type === 'paper' ? 'PAPER' : 'VELOCITY';

            addService({
                name: values.name,
                type: serviceType,
                status: 'CREATING'
            });

            resetForm();
            onClose();
            setSubmitting(false);
        }
    });

    const { values, setFieldValue, errors, touched, handleSubmit, isSubmitting, isValid } = formik;

    const loadVersions = useCallback(async (project: ProjectType) => {
        setIsLoadingData(true);
        try {
            const res = await fetch(`https://api.papermc.io/v2/projects/${project}`);
            const data: PaperVersionResponse = await res.json();
            const revVersions = [...data.versions].reverse();
            setVersions(revVersions);
            if (revVersions.length > 0) {
                setFieldValue('version', revVersions[0]);
            }
        } catch (err) {
            console.error("Failed to fetch versions:", err);
        } finally {
            setIsLoadingData(false);
        }
    }, [setFieldValue]);

    const loadBuilds = useCallback(async (project: ProjectType, ver: string) => {
        setIsLoadingData(true);
        try {
            const res = await fetch(`https://api.papermc.io/v2/projects/${project}/versions/${ver}/builds`);
            const data: PaperBuildsResponse = await res.json();
            const buildNumbers = data.builds.map(b => b.build).reverse();
            setBuilds(buildNumbers);
            if (buildNumbers.length > 0) {
                setFieldValue('build', buildNumbers[0]);
            }
        } catch (err) {
            console.error("Failed to fetch builds:", err);
        } finally {
            setIsLoadingData(false);
        }
    }, [setFieldValue]);

    useEffect(() => {
        if (isOpen) {
            loadVersions(values.type);
        }
    }, [isOpen, values.type, loadVersions]);

    useEffect(() => {
        if (isOpen && values.version) {
            loadBuilds(values.type, values.version);
        }
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
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
                onClick={onClose}
            />

            <div
                ref={containerRef}
                className="relative w-full max-w-xl bg-primary-white dark:bg-secondary-black rounded-3xl shadow-2xl p-8 flex flex-col gap-6"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-6 right-6 text-muted-gray hover:text-accent transition-colors size-5 cursor-pointer"
                >
                    {CloseIcon}
                </button>

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold tracking-tight">Create Service</h2>
                    <p className="text-xs text-muted-gray uppercase tracking-widest font-bold opacity-60">Deployment Wizard</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest ml-1">Unique Name</label>
                        <input
                            name="name"
                            placeholder="my-cool-server"
                            className={`form-input lowercase ${touched.name && errors.name ? 'border-red-500' : ''}`}
                            onChange={formik.handleChange}
                            value={values.name}
                        />
                        {touched.name && errors.name && (
                            <span className="text-red-primary text-[10px] font-bold uppercase ml-1">{errors.name}</span>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect<ProjectType>
                            label="Engine"
                            value={values.type}
                            options={['paper', 'velocity']}
                            onChange={(val) => setFieldValue('type', val)}
                        />

                        <div className={`flex flex-col gap-1.5 transition-all duration-300 ${values.type === 'velocity' ? 'opacity-100' : 'opacity-30 pointer-events-none grayscale'}`}>
                            <label className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest ml-1">Internal Port</label>
                            <input
                                name="port"
                                type="number"
                                className="form-input"
                                onChange={formik.handleChange}
                                value={values.port}
                                disabled={values.type !== 'velocity'}
                            />
                            {values.type === 'velocity' && errors.port && (
                                <span className="text-red-primary text-[10px] font-bold uppercase ml-1">{errors.port}</span>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect<string>
                            label="Software Version"
                            value={values.version}
                            options={versions}
                            onChange={(val) => setFieldValue('version', val)}
                            loading={isLoadingData}
                        />

                        <CustomSelect<string | number>
                            label="Build ID"
                            value={values.build}
                            options={builds}
                            onChange={(val) => setFieldValue('build', val)}
                            loading={isLoadingData}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid || !values.name}
                        className={`mt-4 flex justify-center items-center p-4 rounded-2xl transition-all duration-300 shadow-lg font-bold uppercase tracking-widest text-xs
                            ${(!isValid || isSubmitting || !values.name)
                            ? "bg-muted-gray/20 text-muted-gray cursor-not-allowed"
                            : "bg-accent text-white hover:shadow-accent/40 active:scale-95 cursor-pointer"
                        }`}
                    >
                        {isSubmitting ? (
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            'Deploy to Kubernetes'
                        )}
                    </button>
                </form>
            </div>
        </div>,
        document.body
    );
};

function CustomSelect<T extends string | number>({ label, value, options, onChange, loading }: CustomSelectProps<T>) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest ml-1">
                {label}
            </label>
            <Listbox value={value} onChange={onChange} disabled={loading}>
                <div className="relative">
                    <ListboxButton className={`form-input flex items-center justify-between w-full p-3 text-left min-h-[50px] transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}>
                        <span className="text-sm font-bold uppercase truncate">
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="size-3 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                                    <span className="text-accent animate-pulse">Fetching...</span>
                                </div>
                            ) : (
                                value || 'Select...'
                            )}
                        </span>
                        {!loading && (
                            <svg className="size-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </ListboxButton>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <ListboxOptions className="absolute z-110 mt-2 w-full bg-primary-white dark:bg-secondary-black rounded-2xl shadow-2xl border border-primary-black/10 dark:border-muted-gray/20 py-2 max-h-48 overflow-auto scrollbar-thin scrollbar-thumb-accent/50">
                            {options.length === 0 && !loading ? (
                                <div className="py-2 px-4 text-[10px] uppercase font-bold text-muted-gray">No options</div>
                            ) : (
                                options.map((opt) => (
                                    <ListboxOption key={opt} value={opt}>
                                        {({ selected, focus }) => (
                                            <div className={`cursor-pointer py-2.5 px-4 text-xs font-bold uppercase transition-colors 
                                                ${focus ? 'bg-accent/10 text-accent' : 'dark:text-primary-white'} 
                                                ${selected ? 'text-accent' : ''}`}
                                            >
                                                {opt}
                                            </div>
                                        )}
                                    </ListboxOption>
                                ))
                            )}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
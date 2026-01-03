'use client'

import {RoleDetails} from "@/types";
import {ErrorMessage, Field, Form, Formik, useField} from "formik";
import {PERMISSION_GROUPS} from "@/constants";
import React from "react";
import {useTranslations} from "next-intl";

interface FormErrors {
    name?: string;
    color?: string;
}

export const RoleForm = ({role} : {role? : RoleDetails}) => {
    const t = useTranslations("Roles")

    return (
        <Formik
            initialValues={{...role}}
            validate={(values) => {
                const errors: FormErrors = {};

                const nameRegex = /^[a-zA-Z0-9\-_\.\(\)\s]+$/;

                if (!values.name) {
                    errors.name = "nameRequired";
                } else if (values.name.length <= 3) {
                    errors.name = "nameTooShort";
                } else if (!nameRegex.test(values.name)) {
                    errors.name = "invalidNameFormat";
                }

                const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;

                if (!values.color) {
                    errors.color = "colorRequired";
                } else if (!hexRegex.test(values.color)) {
                    errors.color = "invalidColorFormat";
                }

                return errors;
            }}
            onSubmit={()=>{}}>
            {({errors, touched, dirty, isValid, isSubmitting}) => (
                <Form className="flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div>
                            <label htmlFor="name" className="form-label">{t("name")}</label>
                            <Field type="text" name="name" className={`${errors.name && touched.name ? 'form-input-error' : 'form-input'}`}/>
                            <ErrorMessage name="name">{(msg) => <span className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">{t(msg)}</span>}</ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="color" className="form-label">{t("color")}</label>
                            <div className="flex gap-2">
                                <Field type="color" name="color" className="size-8 outline-none border-none"/>
                                <Field type="text" name="color" className={`${errors.color && touched.color ? 'form-input-error' : 'form-input'}`}/>
                            </div>
                            <ErrorMessage name="color">{(msg) => <span className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">{t(msg)}</span>}</ErrorMessage>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h1 className="text-xl font-bold text-primary-black dark:text-primary-white">{t("permissions")}</h1>

                        <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/40"/>

                        {PERMISSION_GROUPS.map((group) => (
                            <React.Fragment key={group.category}>
                                <div key={group.category} className="flex flex-col gap-2">
                                    <h1 className="text-lg text-secondary-black dark:text-secondary-white">{t(`${group.category}Category`)}</h1>
                                    {group.permissions.map((p) => (
                                        <PermissionToggle
                                            key={`perm-${p.bit}`}
                                            name="permissions"
                                            bitIndex={p.bit}
                                            label={t(p.label)}
                                            description={t(`${p.label}Description`)}
                                        />
                                    ))}
                                </div>
                                <div key={`sep-${group.category}`} className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/40"/>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button className="p-2 px-6 rounded-xl bg-red-primary text-primary-white">{t("delete")}</button>
                        <button type="submit" disabled={!isValid || isSubmitting || !dirty} className="p-2 px-6 rounded-xl bg-accent disabled:bg-secondary-gray text-primary-white disabled:cursor-no-drop">{t("save")}</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

interface PermissionToggleProps {
    name: string;
    bitIndex: number;
    label: string;
    description: string;
}

const PermissionToggle = ({ name, bitIndex, label, description }: PermissionToggleProps) => {
    const [field, , helpers] = useField<number>(name);

    const bitValue = Math.pow(2, bitIndex);
    const isChecked = (field.value & bitValue) !== 0;

    const handleToggle = () => {
        let newValue: number;
        if (isChecked) {
            newValue = field.value - bitValue;
        } else {
            newValue = field.value + bitValue;
        }

        helpers.setValue(newValue >>> 0);
    };

    return (
        <div className="flex gap-6 text-wrap items-center justify-between p-4 bg-primary-white dark:bg-primary-black/30 rounded-xl transition-all">
            <div className="flex flex-col gap-0.5 pr-4">
                <span className="text-primary-black dark:text-primary-white font-semibold text-sm md:text-base">
                    {label}
                </span>
                <span className="text-secondary-black dark:text-muted-white text-xs md:text-sm font-light">
                    {description}
                </span>
            </div>

            <button
                type="button"
                onClick={handleToggle}
                className={`
                    relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
                    transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary
                    ${isChecked ? 'bg-accent' : 'bg-gray-300 dark:bg-zinc-700'}
                `}
            >
                <span
                    className={`
                        pointer-events-none inline-block size-6 transform rounded-full bg-white shadow-lg 
                        transition duration-200 ease-in-out
                        ${isChecked ? 'translate-x-5' : 'translate-x-0'}
                    `}
                />
            </button>
        </div>
    );
};
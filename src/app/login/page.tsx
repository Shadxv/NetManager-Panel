'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useTranslations } from "next-intl";
import Link from "next/dist/client/link";

interface FormValues {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const validate = (values: FormValues) => {
    const errors: FormErrors = {};

    if (!values.email) {
        errors.email = 'emailRequired';
    } else {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        const isValidEmail = emailRegex.test(values.email);
        if (values.email !== 'admin' && !isValidEmail) {
            errors.email = 'incorrectEmailFormat';
        }
    }

    if (!values.password) {
        errors.password = 'passwordRequired';
    } else if (values.password.length < 8 || /\s/.test(values.password)) {
        errors.password = 'incorrectPasswordFormat';
    }

    return errors;
};

export default function LoginPage() {
    const t = useTranslations("LoginPage");
    const tErrors = useTranslations("Errors");

    const [loginError, setLoginError] = useState<string | undefined>(undefined)

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        setSubmitting(true);
        console.log(values);
        setTimeout(() => {
            setSubmitting(false);
        }, 5000);
    };

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center bg-secondary-white/20 dark:bg-secondary-black shadow-md shadow-primary-black/10 rounded-xl p-4 md:px-10 py-8 gap-10">
            <Link href="/" className="size-30 transition-transform duration-300 active:scale-95 hover:scale-105 -mb-6 -mt-3">
                <svg viewBox="0 0 5000 5000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M912.942,1550.438l1591.3,-893.783l1586.879,891.771l0.408,1953.279l-1595.158,889.912l-1587.379,-883.808l3.95,-1957.367l0,-0.004Zm1249.567,-4.417l-617.512,356.733l0,1242.229l614.054,356.788l0,-1160.946l348.213,-190.492l335.442,194.721l5.854,1150.279l623.325,-340.162l0,-1248.083l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229Z" fill="#1e1b4b"/>
                    <path d="M2159.05,2340.829l348.213,-190.492l335.442,194.721l-330.504,189.633l-353.154,-193.863l0.004,0Z" fill="#3730a3"/>
                    <path d="M910.371,2822.842l2.567,-1272.4l1591.3,-893.783l1586.879,891.771l0.262,1268.883l-619.496,337.871l0,-1248.083l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-617.512,356.733l0,1242.229l-634.625,-322.146l0,-0.008Z" fill="#3730a3"/>
                    <path d="M912.921,1559.692l0.017,-9.254l1591.3,-893.783l1582.367,889.238l-614.725,361.904l0,-0.7l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-617.512,356.733l-632.054,-352.325l-0.017,9.254Z" fill="#4f46e5"/>
                    <path d="M2418.258,704.95l85.983,-48.296l85.712,48.171l677.084,1083.538l-416.238,-241.246l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-409.763,236.721l665.513,-1077.792l0,-0.004Z" fill="#473fcf"/>
                </svg>
            </Link>
            <h1 className="text-primary-black dark:text-primary-white text-2xl">{t("signIn")}</h1>

            <Formik
                initialValues={{ email: "", password: "" }}
                validate={validate}
                onSubmit={handleSubmit}>
                {({ errors, touched, isValid, isSubmitting, dirty }) => (
                    <Form className="w-full flex flex-col gap-8 px-10">

                        <div className="flex flex-col gap-2 transition-opacity duration-300">
                            <label htmlFor="email" className={`login-label transition-colors ${isSubmitting ? 'opacity-50' : ''}`}>
                                {t("email")}
                            </label>
                            <Field
                                type="email"
                                name="email"
                                disabled={isSubmitting}
                                className={`
                                    transition-all duration-300 outline-none
                                    ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-muted-gray/5' : ''}
                                    ${errors.email && touched.email ? 'login-input-error' : 'login-input'}
                                `}
                            />
                            <ErrorMessage name="email">
                                {msg => <span className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">{tErrors(msg)}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="flex flex-col gap-2 transition-opacity duration-300">
                            <label htmlFor="password" className={`login-label transition-colors ${isSubmitting ? 'opacity-50' : ''}`}>
                                {t("password")}
                            </label>
                            <Field
                                type="password"
                                name="password"
                                disabled={isSubmitting}
                                className={`
                                    ${isSubmitting ? 'opacity-50 cursor-not-allowed bg-muted-gray/5' : ''}
                                    ${errors.password && touched.password ? 'login-input-error' : 'login-input'}
                                `}
                            />
                            <ErrorMessage name="password">
                                {msg => <span className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">{tErrors(msg)}</span>}
                            </ErrorMessage>
                        </div>

                        {loginError && <div className="w-full bg-red-primary rounded-xl p-3 text-primary-white text-xs sm:text-base">{tErrors(loginError)}</div>}

                        <button
                            disabled={!isValid || isSubmitting || !dirty}
                            className={`
                                flex justify-center items-center mx-12 p-3 px-6 rounded-xl transition-all duration-300 shadow-lg
                                ${(!isValid || isSubmitting || !dirty)
                                ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none scale-100"
                                : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                            }
                            `}
                            type="submit"
                        >
                            { !isSubmitting ? (
                                <span>{t("signIn")}</span>
                            ) : (
                                <div className="size-6 rounded-full border-2 border-primary-white/30 border-b-primary-white animate-spin"/>
                            )}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
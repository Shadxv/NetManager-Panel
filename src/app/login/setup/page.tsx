'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@lib/features/accountSlice";
import axios from "axios";
import {RootState} from "@lib/store";
import {RESTAPI_URL} from "@/constants";
import Cookies from "js-cookie";

interface SetupValues {
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
}

export default function SetupPage() {
    const t = useTranslations("SetupPage");
    const tErrors = useTranslations("Errors");
    const router = useRouter();
    const dispatch = useDispatch();
    const [submitError, setSubmitError] = useState<string | undefined>(undefined);
    const [isFinished, setIsFinished] = useState(false);

    const token = useSelector((state: RootState) => state.account.token);

    if (isFinished) {
        return (
            <div className="w-full max-w-xl flex flex-col justify-center items-center bg-secondary-white/20 dark:bg-secondary-black shadow-md rounded-xl p-10 gap-8 animate-in fade-in zoom-in duration-300">
                <div className="size-20 rounded-full bg-accent/20 flex items-center justify-center">
                    <svg className="size-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div className="text-center gap-2 flex flex-col">
                    <h1 className="text-primary-black dark:text-primary-white text-2xl font-bold">{t("successTitle")}</h1>
                    <p className="text-secondary-black/60 dark:text-secondary-white/60">{t("successMessage")}</p>
                </div>
                <button
                    onClick={() => {
                        Cookies.remove('nm_auth_token');
                        localStorage.removeItem('nm_auth_token');
                        dispatch(logout());
                        router.push('/login');
                    }}
                    className="bg-accent text-primary-white p-3 px-10 rounded-xl hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent transition-all active:scale-95 shadow-lg shadow-accent/20"
                >
                    {t("backToLogin")}
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center bg-secondary-white/20 dark:bg-secondary-black shadow-md rounded-xl p-4 md:px-10 py-8 gap-10">
            <h1 className="text-primary-black dark:text-primary-white text-2xl font-bold">{t("setupAccount")}</h1>

            <Formik
                initialValues={{ name: "", surname: "", password: "", confirmPassword: "" }}
                validate={(values) => {
                    const errors: Partial<Record<keyof SetupValues, string>> = {};
                    if (!values.name) errors.name = 'nameRequired';
                    if (!values.surname) errors.surname = 'surnameRequired';
                    if (values.password.length < 8  || /\s/.test(values.password)) errors.password = 'incorrectPasswordFormat';
                    if (values.password !== values.confirmPassword) errors.confirmPassword = 'mismatch';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    setSubmitError(undefined);

                    axios.post(`${RESTAPI_URL}/auth/setup`, values, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                        .then(() => {
                            setIsFinished(true);
                        })
                        .catch((err) => {
                            const message = err.response?.data?.message || 'updateError';
                            setSubmitError(message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}>
                {({ errors, touched, isValid, isSubmitting, dirty }) => (
                    <Form className="w-full flex flex-col gap-6 px-4 md:px-10">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="login-label">{t("firstName")}</label>
                                <Field name="name" className={errors.name && touched.name ? 'login-input-error' : 'login-input'} />
                                <ErrorMessage name="name">{msg => <span className="text-red-500 text-[10px] font-medium">{tErrors(msg)}</span>}</ErrorMessage>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="login-label">{t("lastName")}</label>
                                <Field name="surname" className={errors.surname && touched.surname ? 'login-input-error' : 'login-input'} />
                                <ErrorMessage name="surname">{msg => <span className="text-red-500 text-[10px] font-medium">{tErrors(msg)}</span>}</ErrorMessage>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="login-label">{t("newPassword")}</label>
                            <Field name="password" type="password" className={errors.password && touched.password ? 'login-input-error' : 'login-input'} />
                            <ErrorMessage name="password">{msg => <span className="text-red-500 text-[10px] font-medium">{tErrors(msg)}</span>}</ErrorMessage>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="login-label">{t("confirmPassword")}</label>
                            <Field name="confirmPassword" type="password" className={errors.confirmPassword && touched.confirmPassword ? 'login-input-error' : 'login-input'} />
                            <ErrorMessage name="confirmPassword">{msg => <span className="text-red-500 text-[10px] font-medium">{tErrors(msg)}</span>}</ErrorMessage>
                        </div>

                        {submitError && <div className="w-full bg-red-primary rounded-xl p-3 text-primary-white text-xs">{tErrors(submitError)}</div>}

                        <button
                            disabled={!isValid || isSubmitting || !dirty}
                            className={`
                                flex justify-center items-center mx-12 mt-4 p-3 px-6 rounded-xl transition-all duration-300 shadow-lg
                                ${(!isValid || isSubmitting || !dirty)
                                ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none scale-100"
                                : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                            }
                            `}
                            type="submit"
                        >
                            { !isSubmitting ? <span>{t("completeSetup")}</span> : <div className="size-6 border-2 border-primary-white/30 border-b-primary-white animate-spin rounded-full"/> }
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
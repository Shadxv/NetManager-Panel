'use client';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@lib/features/accountSlice";
import axios from "axios";
import {RootState} from "@lib/store";
import {RESTAPI_URL} from "@/constants";
import Cookies from "js-cookie";

export default function ResetPage() {
    const t = useTranslations("ResetPage");
    const tErrors = useTranslations("Errors");
    const router = useRouter();
    const dispatch = useDispatch();
    const [isFinished, setIsFinished] = useState(false);
    const token = useSelector((state: RootState) => state.account.token);

    if (isFinished) {
        return (
            <div className="w-full max-w-xl flex flex-col justify-center items-center bg-secondary-white/20 dark:bg-secondary-black shadow-md rounded-xl p-10 gap-8 animate-in fade-in zoom-in duration-300">
                <div className="text-center gap-2 flex flex-col">
                    <h1 className="text-primary-black dark:text-primary-white text-2xl font-bold">{t("resetSuccessTitle")}</h1>
                    <p className="text-secondary-black/60 dark:text-secondary-white/60">{t("resetSuccessMessage")}</p>
                </div>
                <button onClick={() => {
                    Cookies.remove('nm_auth_token');
                    localStorage.removeItem('nm_auth_token');
                    dispatch(logout());
                    router.push('/login');
                }} className="bg-accent text-primary-white p-3 px-10 rounded-xl hover:bg-primary-black transition-all shadow-lg">{t("backToLogin")}</button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl flex flex-col justify-center items-center bg-secondary-white/20 dark:bg-secondary-black shadow-md rounded-xl p-4 md:px-10 py-8 gap-10">
            <h1 className="text-primary-black dark:text-primary-white text-2xl font-bold">{t("resetPassword")}</h1>
            <Formik
                initialValues={{ password: "", confirmPassword: "" }}
                validate={(values) => {
                    const errors: Partial<Record<keyof {password?: string, confirmPassword?: string}, string>> = {};
                    if (values.password.length < 8  || /\s/.test(values.password)) errors.password = 'incorrectPasswordFormat';
                    if (values.password !== values.confirmPassword) errors.confirmPassword = 'mismatch';
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);

                    axios.post(`${RESTAPI_URL}/auth/reset`,
                        { password: values.password },
                        { headers: { Authorization: `Bearer ${token}` } }
                    )
                        .then(() => {
                            setIsFinished(true);
                        })
                        .catch((err) => {
                            const message = err.response?.data?.message || 'resetError';
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
                }}>
                {({ errors, touched, isValid, isSubmitting, dirty }) => (
                    <Form className="w-full flex flex-col gap-8 px-10">
                        <div className="flex flex-col gap-2">
                            <label className="login-label">{t("newPassword")}</label>
                            <Field name="password" type="password" className={errors.password && touched.password ? 'login-input-error' : 'login-input'} />
                            <ErrorMessage name="password">{msg => <span className="text-red-500 text-xs">{tErrors(msg)}</span>}</ErrorMessage>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="login-label">{t("confirmPassword")}</label>
                            <Field name="confirmPassword" type="password" className={errors.confirmPassword && touched.confirmPassword ? 'login-input-error' : 'login-input'} />
                            <ErrorMessage name="confirmPassword">{msg => <span className="text-red-500 text-xs">{tErrors(msg)}</span>}</ErrorMessage>
                        </div>
                        <button
                            disabled={!isValid || isSubmitting || !dirty}
                            className={`
                                flex justify-center items-center mx-12 mt-4 p-3 px-6 rounded-xl transition-all duration-300 shadow-lg
                                ${(!isValid || isSubmitting || !dirty)
                                ? "bg-muted-gray/30 text-secondary-black/50 dark:text-secondary-white/50 cursor-not-allowed shadow-none scale-100"
                                : "bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white dark:hover:text-accent hover:shadow-accent/30 active:scale-95 cursor-pointer"
                            }
                            `}
                            type="submit">
                            { !isSubmitting ? t("updatePassword") : <div className="size-6 border-2 border-primary-white/30 border-b-primary-white animate-spin rounded-full"/> }
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
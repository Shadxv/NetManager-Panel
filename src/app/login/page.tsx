'use client';

import React from 'react';
import {Formik, Form, Field, ErrorMessage, FormikState, FormikHelpers} from 'formik';

interface FormValues {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

const initialValues: FormValues = {
    email: '',
    password: '',
};

const validate = (values: FormValues) => {
    const errors: FormErrors = {};

    if (!values.email) {
        errors.email = 'Email jest wymagany.';
    } else {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        const isValidEmail = emailRegex.test(values.email);

        if (values.email !== 'admin' && !isValidEmail) {
            errors.email = 'Nieprawidłowy format emaila lub musi być "admin".';
        }
    }

    if (!values.password) {
        errors.password = 'Hasło jest wymagane.';
    } else if (values.password.length < 8) {
        errors.password = 'Hasło musi mieć co najmniej 8 znaków.';
    } else if (/\s/.test(values.password)) {
        errors.password = 'Hasło nie może zawierać spacji lub innych białych znaków.';
    }

    return errors;
};


export default function LoginPage() {

    const handleSubmit = (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
        console.log('sent')
    };

    return (
        <div className="login-form-container">
            <h2>Panel Logowania</h2>

            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid, errors, touched }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email / Nazwa Użytkownika</label>
                            <Field type="text" name="email" id="email" />
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>

                        <div>
                            <label htmlFor="password">Hasło</label>
                            <Field type="password" name="password" id="password" />
                            <ErrorMessage name="password" component="div" className="text-red-500" />
                        </div>

                        <button type="submit" disabled={isSubmitting || !isValid}>
                            {isSubmitting ? 'Logowanie...' : 'Zaloguj się'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
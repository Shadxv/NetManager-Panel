'use client'

import { RoleDetails } from "@/types";
import { useFormik } from "formik";
import { PERMISSION_GROUPS, RESTAPI_URL } from "@/constants";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { useRoles } from "@/components/dashboard/roles/RolesContext";
import { useAppDispatch } from "@lib/hooks";
import { addPopup } from "@lib/features/popupSlice";
import { AlertComponent } from "@/components/dashboard";

interface FormErrors {
    name?: string;
    color?: string;
}

type RoleUpdatePayload = Partial<Omit<RoleDetails, 'id'>>;

declare global {
    interface Window {
        nextStepUrl?: string;
    }
}

interface PermissionToggleProps {
    label: string;
    description: string;
    isChecked: boolean;
    onChange: () => void;
    disabled: boolean;
}

export const RoleForm = ({ role }: { role: RoleDetails }) => {
    const t = useTranslations("Roles");
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { removeRoleLocal, updateRoleLocal } = useRoles();

    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const formik = useFormik<RoleDetails>({
        initialValues: { ...role },
        enableReinitialize: true,
        validate: (values) => {
            const errors: FormErrors = {};
            const nameRegex = /^[a-zA-Z0-9\-_\.\(\)\s]+$/;
            const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;

            if (!values.name) errors.name = "nameRequired";
            else if (values.name.length <= 3) errors.name = "nameTooShort";
            else if (!nameRegex.test(values.name)) errors.name = "invalidNameFormat";

            if (!values.color) errors.color = "colorRequired";
            else if (!hexRegex.test(values.color)) errors.color = "invalidColorFormat";

            return errors;
        },
        onSubmit: async (values) => {
            const changedFields: RoleUpdatePayload = {};
            (Object.keys(values) as Array<keyof RoleDetails>).forEach((key) => {
                if (key !== 'id' && values[key] !== role[key]) {
                    Object.assign(changedFields, { [key]: values[key] });
                }
            });

            if (Object.keys(changedFields).length === 0) return;

            try {
                await axios.patch(`${RESTAPI_URL}/roles/${role.id}`, changedFields, { timeout: 5000 });
                updateRoleLocal(role.id, changedFields);

                formik.resetForm({ values });
                dispatch(addPopup({ type: "success", message: "savedChangesRole", params: { name: values.name } }));

                if (window.nextStepUrl) {
                    const destination = window.nextStepUrl;
                    window.nextStepUrl = undefined;
                    router.push(destination);
                }
            } catch (e) {
                dispatch(addPopup({ type: "error", message: "errorChangesRole" }));
            }
        }
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`${RESTAPI_URL}/roles/${role.id}`, { timeout: 5000 });
            removeRoleLocal(role.id);
            formik.resetForm();
            router.push("/dashboard/roles");
            dispatch(addPopup({ type: "success", message: "deletedRole", params: { name: role.name } }));
        } catch (e) {
            dispatch(addPopup({ type: "error", message: "errorDeletingRole", params: { name: role.name } }));
            setShowDeleteModal(false);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (formik.dirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [formik.dirty]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && formik.dirty) {
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
    }, [formik.dirty, pathname]);

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row gap-8">
                <div>
                    <label className="form-label">{t("name")}</label>
                    <input
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        disabled={formik.isSubmitting}
                        className={`${formik.errors.name && formik.touched.name ? 'form-input-error' : 'form-input'}`}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <span className="text-red-primary text-xs font-medium mt-1 inline-block">
                            {t(formik.errors.name)}
                        </span>
                    )}
                </div>

                <div>
                    <label className="form-label">{t("color")}</label>
                    <div className="flex gap-2">
                        <input
                            name="color"
                            type="color"
                            onChange={formik.handleChange}
                            value={formik.values.color}
                            disabled={formik.isSubmitting}
                            className="size-7 outline-none border-none bg-transparent cursor-pointer"
                        />
                        <input
                            name="color"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.color}
                            disabled={formik.isSubmitting}
                            className={`${formik.errors.color && formik.touched.color ? 'form-input-error' : 'form-input'}`}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <h1 className="text-xl font-bold text-primary-black dark:text-primary-white">{t("permissions")}</h1>
                <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/10" />

                {PERMISSION_GROUPS.map((group) => (
                    <div key={group.category} className="flex flex-col gap-4">
                        <h1 className="text-lg text-secondary-black dark:text-secondary-white mt-4">
                            {t(`${group.category}Category`)}
                        </h1>
                        {group.permissions.map((p) => {
                            const bitValue = Math.pow(2, p.bit);
                            const isChecked = (formik.values.permissions & bitValue) !== 0;
                            return (
                                <PermissionToggle
                                    key={`perm-${p.bit}`}
                                    label={t(p.label)}
                                    description={t(`${p.label}Description`)}
                                    isChecked={isChecked}
                                    disabled={formik.isSubmitting}
                                    onChange={() => {
                                        const newVal = isChecked
                                            ? formik.values.permissions - bitValue
                                            : formik.values.permissions + bitValue;
                                        formik.setFieldValue("permissions", newVal >>> 0);
                                    }}
                                />
                            );
                        })}
                        <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/10" />
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={() => setShowDeleteModal(true)}
                    className="p-3 px-8 rounded-xl bg-red-primary/10 text-red-primary hover:bg-red-primary hover:text-white transition-all font-semibold"
                >
                    {t("delete")}
                </button>

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={() => formik.handleSubmit()}
                        disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                        className="relative p-3 px-8 rounded-xl font-bold bg-accent text-primary-white disabled:bg-secondary-gray flex items-center justify-center"
                    >
                        {formik.isSubmitting ? (
                            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : t("save")}
                    </button>
                </div>
            </div>

            <AlertComponent
                isOpen={showLeaveModal}
                onClose={() => {
                    setShowLeaveModal(false);
                    window.nextStepUrl = undefined;
                }}
                type="warning"
                title={t("unsavedChanges.title")}
                description={t("unsavedChanges.description")}
                onProceed={() => {
                    const url = window.nextStepUrl || '/dashboard/roles';
                    formik.resetForm({ values: role });
                    router.push(url);
                }}
                proceedLabel={t("unsavedChanges.proceed")}
                onSave={async () => {
                    await formik.submitForm();
                }}
                saveLabel={t("unsavedChanges.save")}
                isSaving={formik.isSubmitting}
            />

            <AlertComponent
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                type="warning"
                title={t("deleteAlert.title")}
                description={t("deleteAlert.description", { name: role.name })}
                onProceed={handleDelete}
                proceedLabel={t("deleteAlert.confirm")}
                onSave={() => setShowDeleteModal(false)}
                saveLabel={t("deleteAlert.cancel")}
                isSaving={isDeleting}
            />
        </div>
    );
};

const PermissionToggle = ({ label, description, isChecked, onChange, disabled }: PermissionToggleProps) => (
    <div className="flex gap-6 items-center justify-between p-5 bg-primary-white dark:bg-primary-black/20 rounded-2xl">
        <div className="flex flex-col gap-1 pr-4 text-left">
            <span className="text-primary-black dark:text-primary-white font-bold text-sm md:text-base">
                {label}
            </span>
            <span className="text-muted-gray dark:text-muted-white/60 text-xs md:text-sm font-light leading-snug">
                {description}
            </span>
        </div>
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            className={`
                relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent 
                transition-colors duration-300 ease-in-out 
                ${isChecked ? 'bg-accent' : 'bg-gray-300 dark:bg-zinc-800'} 
                disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
            `}
        >
            <span className={`
                pointer-events-none inline-block size-6 transform rounded-full bg-white shadow-xl 
                transition duration-300 ease-in-out 
                ${isChecked ? 'translate-x-5' : 'translate-x-0'}
            `} />
        </button>
    </div>
);
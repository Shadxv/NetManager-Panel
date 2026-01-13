'use client'

import {UserDetails} from "@/types";
import {Avatar} from "@/components/AvatarComponent";
import {getUserSubtext} from "@/utils";
import {useTranslations} from "next-intl";
import {useState} from "react";
import axios from "axios";
import {PermissionFlags, RESTAPI_URL} from "@/constants";
import {addPopup} from "@lib/features/popupSlice";
import {useAppDispatch} from "@lib/hooks";
import {useRouter} from "next/navigation";
import {AlertComponent} from "@/components/dashboard";
import {usePermissions} from "@/hooks";

export const UserDetailsPane = ({user}: {user: UserDetails}) => {
    const t = useTranslations("Users");
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const { hasPermission } = usePermissions();

    const canDelete = hasPermission([
        PermissionFlags.MANAGE_USERS,
        PermissionFlags.REMOVE_USERS,
    ]);

    const canResetPassword = hasPermission([
        PermissionFlags.MANAGE_USERS,
    ]);

    const handleDeleteUser = () => {
        setIsDeleting(true);
        axios.delete(`${RESTAPI_URL}/users/${user.id}`)
            .then(() => {
                dispatch(addPopup({ type: "success", message: "deleteUserSuccess" }));
                router.push('/dashboard/users');
            })
            .catch(() => {
                dispatch(addPopup({ type: "error", message: "deleteUserError" }));
            })
            .finally(() => {
                setIsDeleting(false);
                setShowDeleteModal(false);
            });
    };

    const handleResetPassword = () => {
        setIsResetting(true);
        axios.post(`${RESTAPI_URL}/users/${user.id}/reset-password`)
            .then(() => {
                dispatch(addPopup({ type: "success", message: "resetPasswordSuccess" }));
            })
            .catch(() => {
                dispatch(addPopup({ type: "error", message: "resetPasswordError" }));
            })
            .finally(() => {
                setIsResetting(false);
                setShowResetModal(false);
            });
    };

    const isResetDisabled = !user.isProvisioned && user.tempPasswordExpires && new Date(user.tempPasswordExpires) > new Date();

    return (
        <>
            <div className="w-full flex items-center justify-between flex-wrap bg-primary-white dark:bg-primary-black/60 rounded-xl shadow-md shadow-primary-black/10 p-4 gap-4">
                <div className="flex flex-wrap gap-8 items-center">
                    <Avatar size="size-24 md:size-32" src={user.avatar}/>
                    <div className="flex flex-col">
                        <h1 className="text-primary-black dark:text-primary-white text-2xl md:text-4xl font-bold">{(!user.name || !user.surname) ? user.email : `${user.name} ${user.surname}`}</h1>
                        <h4 className="text-primary-gray dark:text-muted-white text-base md:text-lg">{getUserSubtext(user, t)}</h4>
                    </div>
                </div>
                <div className={`flex gap-2 ${(!canDelete && !canResetPassword) && "hidden"}`}>
                    <button disabled={isResetDisabled || isResetting || !canResetPassword}
                            onClick={() => setShowResetModal(true)}
                            className="dashboard-small-btn text-primary-gray disabled:text-muted-gray dark:text-secondary-white dark:disabled:text-muted-white outline-1 outline-secondary-gray/20 disabled:outline-secondary-gray/5 hover:not-disabled:outline-none hover:not-disabled:bg-accent hover:not-disabled:text-primary-white transition-colors"
                    >
                        {t('resetPasswordBtn')}
                    </button>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        disabled={isDeleting || !canDelete}
                        className="dashboard-small-btn bg-red-primary/10 text-red-primary hover:not-disabled:bg-red-primary hover:not-disabled:text-white transition-colors"
                    >
                        {t('deleteUserBtn')}
                    </button>
                </div>
            </div>

        <AlertComponent
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            type="warning"
            title={t("deleteUserTitle")}
            description={t("deleteUserDescription")}
            onProceed={handleDeleteUser}
            proceedLabel={t("deleteConfirm")}
            rightLabel={t("cancel")}
            onRight={() => setShowDeleteModal(false)}
            isLoading={isDeleting}
            isLoadingOnRight={true}
        />

        <AlertComponent
            isOpen={showResetModal}
            onClose={() => setShowResetModal(false)}
            type="info"
            title={t("resetPasswordTitle")}
            description={t("resetPasswordDescription")}
            onProceed={handleResetPassword}
            proceedLabel={t("resetConfirm")}
            rightLabel={t("cancel")}
            onRight={() => setShowResetModal(false)}
            isLoading={isResetting}
            isLoadingOnRight={true}
        />
    </>
    )
}
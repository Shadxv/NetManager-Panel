import { PermissionFlags } from "@/constants";
import { useAppSelector } from "@lib/hooks";

export const usePermissions = () => {
    const currentUser = useAppSelector((state) => state.account.user);

    const userPerms = currentUser?.permissions ?? 0;
    const userIndex = currentUser?.roleIndex ?? 999;

    const isAdmin = (userPerms & PermissionFlags.ADMIN) !== 0;

    const hasPermission = (permission: PermissionFlags | PermissionFlags[]): boolean => {
        if (!currentUser) return false;
        if (isAdmin) return true;

        if (Array.isArray(permission)) {
            return permission.some(p => (userPerms & p) !== 0);
        }
        return (userPerms & permission) !== 0;
    };

    const canManageIndex = (targetIndex?: number): boolean => {
        if (targetIndex === undefined || currentUser === undefined) return false;
        return userIndex < targetIndex;
    };

    const canAssignBit = (bitValue: number): boolean => {
        if (isAdmin) return true;
        return (userPerms & bitValue) !== 0;
    };

    return {
        isAdmin,
        userIndex,
        hasPermission,
        canManageIndex,
        canAssignBit,
    };
};
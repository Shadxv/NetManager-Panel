'use client'

import {UserCard, useUsers} from ".";
import {useTranslations} from "next-intl";

export const UserList = () => {
    const t = useTranslations("Users")
    const { filteredUsers, rolesCache, isLoading, users } = useUsers();

    if (isLoading || (users.length === 0 && filteredUsers.length === 0)) {
        return (
            <div className="w-full h-full flex justify-center items-center py-20">
                <div className="size-10 border-4 border-muted-gray/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (filteredUsers.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center py-20">
                <p className="text-muted-white font-light text-4xl">
                    {t("noUsersFound")}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredUsers.map((user) => (
                <UserCard
                    key={user.id}
                    user={user}
                    role={user.roleId ? rolesCache[user.roleId] : undefined}
                />
            ))}
        </div>
    )
}
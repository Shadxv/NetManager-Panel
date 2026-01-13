import {BaseRole, BaseUser} from "@/types";
import {Avatar} from "@/components/AvatarComponent";
import {useTranslations} from "next-intl";
import Link from "next/dist/client/link";
import {getUserSubtext} from "@/utils";

export const UserCard = ({ user, role, disabled } : { user: BaseUser, role?: BaseRole, disabled: boolean }) => {
    const t = useTranslations("Users");

    return (
        <Link
            href={`/dashboard/users/${user.id}`}
            aria-disabled={disabled}
            className={`w-full flex flex-col gap-6 items-center p-6 rounded-2xl bg-primary-white dark:bg-primary-black/80 shadow-md shadow-primary-black/10 overflow-hidden transition-all duration-300
                    ${disabled ? "pointer-events-none " : "hover:scale-102"}
            `}
        >
            <div className="w-full flex flex-col gap-4 items-center min-w-0">
                <Avatar size="size-16 md:size-20 lg:size-24" src={user.avatar}/>

                <div className="w-full flex flex-col items-center min-w-0">
                    <h1 className="w-full text-center text-primary-black dark:text-primary-white font-bold text-xl md:text-2xl truncate">
                        {user.name && user.surname ? `${user.name} ${user.surname}` : user.email}
                    </h1>
                    <p className="w-full text-center text-secondary-black dark:text-muted-white font-light text-sm md:text-md truncate">
                        {getUserSubtext(user, t)}
                    </p>
                </div>
            </div>
            {role && <RoleComponent role={role}/>}
        </Link>
    )
}

const RoleComponent = ({ role }: { role: BaseRole } ) => {
    return (
        <div className="flex items-center justify-center gap-4 w-full p-4 md:p-2 md:px-4 min-w-0">
            <div className="size-2 rounded-full shrink-0" style={{backgroundColor: role.color}}/>
            <h4 className="text-primary-gray dark:text-muted-white truncate">
                {role.name}
            </h4>
        </div>
    )
}
import {BaseRole, BaseUser} from "@/types";
import {Avatar} from "@/components/AvatarComponent";
import {useTranslations} from "next-intl";
import Link from "next/dist/client/link";

export const UserCard = ({ user, role } : { user: BaseUser, role?: BaseRole }) => {
    const t = useTranslations("Users");

    const formatTimeUntilExpire = (expiryDate: Date | undefined): string => {
        if (!expiryDate) return "";

        const now = new Date();
        const expires = new Date(expiryDate);
        const diffInMs = expires.getTime() - now.getTime();

        if (diffInMs <= 0) return "";

        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays > 0) {
            return t('timeUnits.days', { count: diffInDays });
        }

        if (diffInHours > 0) {
            return t('timeUnits.hours', { count: diffInHours });
        }

        return t('timeUnits.minutes', { count: diffInMinutes > 0 ? diffInMinutes : 1 });
    };

    const getSubtext = () => {
        if (user.name && user.surname) return user.email;

        if (user.tempPasswordExpires) {
            const now = new Date();
            const expiryDate = new Date(user.tempPasswordExpires);

            if (expiryDate > now) {
                const timeLeft = formatTimeUntilExpire(user.tempPasswordExpires);
                return `${t('inviteExpiresIn')} ${timeLeft}`;
            } else {
                return t('inviteExpired');
            }
        }
        return user.email;
    };

    return (
        <Link
            href={`/dashboard/users/${user.id}`}
            className="w-full flex flex-col gap-6 items-center p-6 rounded-2xl bg-primary-white dark:bg-primary-black/80 shadow-md shadow-primary-black/10 overflow-hidden hover:scale-102 transition-all duration-300"
        >
            <div className="w-full flex flex-col gap-4 items-center min-w-0">
                <Avatar size="size-16 md:size-20 lg:size-24" src={user.avatar}/>

                <div className="w-full flex flex-col items-center min-w-0">
                    <h1 className="w-full text-center text-primary-black dark:text-primary-white font-bold text-xl md:text-2xl truncate">
                        {user.name && user.surname ? `${user.name} ${user.surname}` : user.email}
                    </h1>
                    <p className="w-full text-center text-secondary-black dark:text-muted-white font-light text-sm md:text-md truncate">
                        {getSubtext()}
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
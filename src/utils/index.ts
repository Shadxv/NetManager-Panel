import {BaseUser, UserDetails} from "@/types";
import {TranslationValues} from "use-intl";

type TranslateFn = (key: string, values?: TranslationValues) => string;

export const formatDate = (dateValue: Date | string | number) => {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date).replace(/,/g, '');
}

export const formatTimeUntilExpire = (expiryDate: Date | undefined, t: TranslateFn): string => {
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

export const getUserSubtext = (user: BaseUser | UserDetails, t: TranslateFn) => {
    if (user.name && user.surname) return user.email;

    if (user.tempPasswordExpires) {
        const now = new Date();
        const expiryDate = new Date(user.tempPasswordExpires);

        if (expiryDate > now) {
            const timeLeft = formatTimeUntilExpire(user.tempPasswordExpires, t);
            return `${t('inviteExpiresIn')} ${timeLeft}`;
        } else {
            return t('inviteExpired');
        }
    }
    return user.email;
};

export const toPascalCase = (str: string): string => {
    if (!str) return "";

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getLogStyle = (line: string): string => {
    if (line.includes('ERROR') || line.includes('SEVERE')) return 'text-red-500 font-semibold';
    if (line.includes('WARN') || line.includes('WARNING')) return 'text-orange-400 font-medium';
    if (line.includes('INFO')) return 'text-primary-white/90';
    return 'text-muted-white';
};

export const getStatusConfig = (status: string) => {
    const s = status.toUpperCase();
    switch (s) {
        case "RUNNING": return { color: "bg-green-500", label: "Running" };
        case "STOPPED": return { color: "bg-red-500", label: "Stopped" };
        case "CREATING": return { color: "bg-zinc-400", label: "Creating" };
        default: return { color: "bg-orange-500", label: toPascalCase(status) };
    }
};
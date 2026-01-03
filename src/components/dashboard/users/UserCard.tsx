import {BaseUser} from "@/types";
import {Avatar} from "@/components/AvatarComponent";
import {DeleteUserIcon} from "@/components/icons";

export const UserCard = ({ user } : { user: BaseUser }) => {
    const formatTimeUntilExpire = (date?: Date) => {
        if (!date) return ""
        return "Invite expired"
    }

    return (
        <div className="w-full flex justify-between items-center p-6 rounded-2xl bg-primary-white dark:bg-primary-black/80 shadow-md shadow-primary-black/10 overflow-hidden">
            <div className="flex gap-4 md:gap-6 items-center min-w-0 flex-1">
                <Avatar size="size-16 md:size-20 lg:size-24" src={user.avatar}/>

                <div className="min-w-0 max-w-68 flex-1">
                    <h1 className="text-primary-black dark:text-primary-white font-bold text-xl md:text-2xl truncate">
                        {user.name && user.surname ? (user.name + " " + user.surname) : user.email}
                    </h1>
                    <p className="text-secondary-black dark:text-muted-white font-light text-sm md:text-md truncate">
                        {user.name && user.surname && !user.tempPasswordExpires ? user.email : formatTimeUntilExpire(user.tempPasswordExpires)}
                    </p>
                </div>
            </div>

            <button
                title="Remove user"
                aria-label="Remove user"
                className="size-8 shrink-0 sm:size-10 p-2 ml-4 rounded-xl shadow-md shadow-primary-black/10 outline dark:outline-primary-white/10 outline-primary-black/5 text-muted-white hover:text-red-primary transition-colors">
                {DeleteUserIcon}
            </button>
        </div>
    )
}
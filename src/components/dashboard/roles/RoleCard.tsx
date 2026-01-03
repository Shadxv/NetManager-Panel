import {BaseRole} from "@/types";
import Link from "next/dist/client/link";

export const RoleCard = ({role, active}: {role: BaseRole, active: boolean}) => {
    return (
        <Link href={`/dashboard/roles/${role.id}`} className="group">
            <div className={`flex items-center gap-4 w-full p-4 md:p-2 md:px-4 ${active ? "scale-98 bg-secondary-white dark:bg-primary-gray" : "bg-primary-white dark:bg-primary-black/80"} group-hover:scale-98 rounded-xl shadow-md shadow-primary-black/10 cursor-pointer transition-all duration-300`}>
                <div className="size-2 rounded-full shrink-0" style={{backgroundColor: role.color}}/>
                <h4 className={`${active ? "text-primary-black dark:text-primary-white" : "text-primary-gray dark:text-muted-white"} group-hover:text-primary-black dark:group-hover:text-primary-white text-xl md:text-base truncate transition-colors`}>{role.name}</h4>
            </div>
        </Link>
    )
}
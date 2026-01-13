'use client'

import { BaseRole } from "@/types";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";

export const RoleCard = ({ role, active, isManageable }: { role: BaseRole; active: boolean; isManageable: boolean }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
        id: role.id,
        disabled: !isManageable
    });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...(isManageable ? listeners : {})}
            className={`group touch-none select-none transition-opacity ${isDragging ? "opacity-50 pointer-events-none" : "opacity-100"}`}
        >
            <Link
                href={`/dashboard/roles/${role.id}`}
                draggable={false}
                onClick={(e) => isDragging && e.preventDefault()}
                className="block"
            >
                <div className={`
                    flex items-center gap-4 w-full p-4 md:p-2 md:px-4 rounded-xl shadow-md shadow-primary-black/10 transition-all duration-300
                    ${active ? "scale-98 bg-secondary-white dark:bg-primary-gray" : "bg-primary-white dark:bg-primary-black/80"} 
                    ${!isManageable ? "opacity-50 grayscale-[0.3] cursor-default border border-dashed border-primary-black/10 dark:border-primary-white/10" : "group-hover:scale-98 cursor-pointer"}
                `}>
                    <div className="size-2 rounded-full shrink-0" style={{backgroundColor: role.color}}/>
                    <h4 className={`
                        text-xl md:text-base truncate transition-colors
                        ${active ? "text-primary-black dark:text-primary-white" : "text-primary-gray dark:text-muted-white"} 
                        ${isManageable ? "group-hover:text-primary-black dark:group-hover:text-primary-white" : "italic opacity-70"}
                    `}>
                        {role.name}
                    </h4>
                </div>
            </Link>
        </div>
    );
};
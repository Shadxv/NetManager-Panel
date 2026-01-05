'use client'

import React from "react";
import {usePathname} from "next/navigation";
import {BaseRole} from "@/types";
import {RoleCard} from "./RoleCard";
import {RolesSkeleton} from "./RolesSkeleton";
import {restrictToVerticalAxis, restrictToWindowEdges} from '@dnd-kit/modifiers';
import {closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors,} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy,} from '@dnd-kit/sortable';
import axios from "axios";
import {RESTAPI_URL} from "@/constants";
import {useTranslations} from "next-intl";
import {useAppDispatch} from "@lib/hooks";
import {addPopup} from "@lib/features/popupSlice";

interface Props {
    roles: BaseRole[];
    setRoles: React.Dispatch<React.SetStateAction<BaseRole[]>>;
    isLoading: boolean;
}

export const RoleListContainer = ({ roles, setRoles, isLoading }: Props) => {
    const path = usePathname();
    const dispatch = useAppDispatch()
    const t = useTranslations("Roles")

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = roles.findIndex((r) => r.id === active.id);
            const newIndex = roles.findIndex((r) => r.id === over.id);

            const newOrder = arrayMove(roles, oldIndex, newIndex);
            setRoles(newOrder);

            try {
                await axios.patch(`${RESTAPI_URL}/roles/${active.id}/move`, {
                    newIndex: newIndex
                });
            } catch (error) {
                dispatch(addPopup({type: "error", message: "errorRolePriority"}))
                setRoles(roles);
            }
        }
    };

    if (isLoading) return <RolesSkeleton />;

    if (roles.length === 0) return (
        <div className="w-full flex flex-col text-wrap p-4 pt-22 md:pt-0 text-secondary-black dark:text-primary-white text-xl">
            {t("noRoles")}
        </div>
    );

    return (
        <DndContext
            id="roles-dnd-context"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext
                items={roles.map(r => r.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="w-full flex flex-col gap-2 pt-4">
                    {roles.map(role => (
                        <RoleCard
                            key={role.id}
                            role={role}
                            active={path.endsWith(role.id)}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
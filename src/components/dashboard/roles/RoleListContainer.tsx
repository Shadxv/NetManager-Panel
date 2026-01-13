'use client'

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { BaseRole } from "@/types";
import { RoleCard } from "./RoleCard";
import { RolesSkeleton } from "./RolesSkeleton";
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors, Modifier } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import axios from "axios";
import { PermissionFlags, RESTAPI_URL } from "@/constants";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@lib/hooks";
import { addPopup } from "@lib/features/popupSlice";
import { usePermissions } from "@/hooks";

interface Props {
    roles: BaseRole[];
    setRoles: React.Dispatch<React.SetStateAction<BaseRole[]>>;
    isLoading: boolean;
}

export const RoleListContainer = ({ roles, setRoles, isLoading }: Props) => {
    const path = usePathname();
    const dispatch = useAppDispatch();
    const t = useTranslations("Roles");

    const { hasPermission, canManageIndex } = usePermissions();
    const canEditRoles = hasPermission(PermissionFlags.EDIT_ROLES);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
    );

    const manageableIds = useMemo(() => {
        return roles
            .filter(role => canEditRoles && canManageIndex(role.index))
            .map(role => role.id);
    }, [roles, canEditRoles, canManageIndex]);

    const restrictToManageableRange: Modifier = ({ transform, active, draggingNodeRect }) => {
        if (!draggingNodeRect || !active) return transform;

        const firstManageableId = manageableIds[0];
        const firstManageableNode = document.querySelector(`[id="${firstManageableId}"]`);

        if (firstManageableNode) {
            const limitY = firstManageableNode.getBoundingClientRect().top;
            const currentY = draggingNodeRect.top + transform.y;

            if (currentY < limitY) {
                return {
                    ...transform,
                    y: limitY - draggingNodeRect.top,
                };
            }
        }

        return transform;
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        let targetId = over?.id;

        if (!over && active) {
            targetId = manageableIds[0];
        }

        if (!targetId || active.id === targetId) return;

        const oldIndex = roles.findIndex((r) => r.id === active.id);
        const newIndex = roles.findIndex((r) => r.id === targetId);

        const newOrder = arrayMove(roles, oldIndex, newIndex);
        setRoles(newOrder);

        try {
            await axios.patch(`${RESTAPI_URL}/roles/${active.id}/move`, {
                newIndex: newIndex
            });
        } catch (error) {
            dispatch(addPopup({ type: "error", message: "errorRolePriority" }));
            setRoles(roles);
        }
    };

    if (isLoading) return <RolesSkeleton />;

    return (
        <DndContext
            id="roles-dnd-context"
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges, restrictToManageableRange]}
        >
            <SortableContext
                items={manageableIds}
                strategy={verticalListSortingStrategy}
            >
                <div className="w-full flex flex-col gap-2 pt-4">
                    {roles.map(role => (
                        <div id={role.id} key={role.id}>
                            <RoleCard
                                role={role}
                                active={path.endsWith(role.id)}
                                isManageable={manageableIds.includes(role.id)}
                            />
                        </div>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};
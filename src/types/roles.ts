export interface BaseRole {
    id: string;
    name: string;
    color: string;
    index: number;
}

export interface RoleDetails {
    id: string;
    name: string;
    color: string;
    permissions: number;
    index: number;
    createdAt: Date;
    updatedAt: Date;
}
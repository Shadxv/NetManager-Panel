export interface BaseUser {
    id: string;
    email: string;
    roleId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    isProvisioned: boolean;
    tempPasswordExpires?: Date;
    createdBy: string;
    createdAt: Date;
}

export interface UserDetails {
    id: string;
    email: string;
    roleId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    aditionalPermissions: string[];
    isProvisioned: boolean;
    tempPasswordExpires?: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

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
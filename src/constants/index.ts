import {
    DashboardIcon,
    DatabaseIcon,
    FilesIcon,
    RolesIcon,
    ServicesIcon,
    SettingsIcon,
    UsersIcon
} from "@/components/icons";
import {BaseRole, BaseUser, RoleDetails} from "@/types";

export const NavBarButtons = [
    {
        href: "/dashboard",
        text: "dashboard",
        icon: DashboardIcon,
        hasSubpages: false,
    },
    {
        href: "/dashboard/services",
        text: "services",
        icon: ServicesIcon,
        hasSubpages: true,
    },
    {
        href: "/dashboard/files",
        text: "files",
        icon: FilesIcon,
        hasSubpages: false,
    },
    {
        href: "/dashboard/settings",
        text: "settings",
        icon: SettingsIcon,
        hasSubpages: false,
    },
    {
        href: "/dashboard/database",
        text: "database",
        icon: DatabaseIcon,
        hasSubpages: false,
    },
    {
        href: "/dashboard/users",
        text: "users",
        icon: UsersIcon,
        hasSubpages: false,
    },
    {
        href: "/dashboard/roles",
        text: "roles",
        icon: RolesIcon,
        hasSubpages: false,
    },
]

export const MOCK_USER: BaseUser = {
    id: "659d1a2b3c4d5e6f7a8b9c0d",
    email: "shadxw.kontakt@gmail.com",
    name: "Kamil",
    surname: "Sadowski",
    roleId: "admin",
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    isProvisioned: true,
    createdBy: "658f0e1a2b3c4d5e6f7a8b9c",
    createdAt: new Date("2024-01-01T12:00:00Z"),
};

export const MOCK_ROLE: BaseRole = {
    id: "admin",
    name: "Admin",
    color: "#ff413e",
    index: 1,
}

export const MOCK_ROLE_ADMIN: RoleDetails = {
    id: "659426f8d3f1a2b3c4d5e6f7",
    name: "Administrator",
    color: "#ff413e",
    permissions: 4294967295,
    index: 0,
    createdAt: new Date("2024-01-10T10:00:00Z"),
    updatedAt: new Date("2024-01-10T10:00:00Z"),
};

export const MOCK_ROLES: BaseRole[] = [
    MOCK_ROLE_ADMIN,
    {
        id: "65942712d3f1a2b3c4d5e6f8",
        name: "Editor",
        color: "#FFA500",
        permissions: 1048575,
        index: 1,
        createdAt: new Date("2024-01-12T14:20:00Z"),
        updatedAt: new Date("2024-01-15T09:15:00Z"),
    },
    {
        id: "65942725d3f1a2b3c4d5e6f9",
        name: "Viewer",
        color: "#0074D9",
        permissions: 1,
        index: 2,
        createdAt: new Date("2024-02-01T11:00:00Z"),
        updatedAt: new Date("2024-02-01T11:00:00Z"),
    }
];

export const PERMISSION_GROUPS = [
    {
        category: "system",
        permissions: [
            { bit: 0, label: "admin" },
        ]
    },
    {
        category: "services",
        permissions: [
            { bit: 1, label: "readServices"},
            { bit: 2, label: "editServicesConfigs"},
            { bit: 3, label: "createNewServices"},
            { bit: 4, label: "deleteServices"},
            { bit: 5, label: "manageServicesState"},
            { bit: 6, label: "updateServices"},
        ]
    },
    {
        category: "files",
        permissions: [
            { bit: 7, label: "readAllFiles"},
            { bit: 8, label: "editAllFiles"},
            { bit: 9, label: "deleteAllFiles"},
        ]
    },
    {
        category: "settings",
        permissions: [
            { bit: 10, label: "readAppConfig"},
            { bit: 11, label: "editAppConfig"},
        ]
    },
    {
        category: "database",
        permissions: [
            { bit: 12, label: "readAllDatabases"},
            { bit: 13, label: "updateAllDatabases"},
            { bit: 14, label: "deleteAllDatabases"},
        ]
    },
    {
        category: "users",
        permissions: [
            { bit: 15, label: "seeUsersDetails"},
            { bit: 16, label: "editUsersDetails"},
            { bit: 17, label: "createUsers"},
            { bit: 18, label: "removeUsers"},
            { bit: 19, label: "manageUsers"},
        ]
    },
    {
        category: "roles",
        permissions: [
            { bit: 20, label: "editRoles"},
            { bit: 21, label: "createRoles"},
            { bit: 22, label: "deleteRoles"},
            { bit: 23, label: "applyRoles"},
        ]
    }
];
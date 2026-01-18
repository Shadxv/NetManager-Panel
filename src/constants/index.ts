import {
    DashboardIcon,
    DatabaseIcon,
    FilesIcon,
    RolesIcon,
    ServicesIcon,
    SettingsIcon,
    UsersIcon
} from "@/components/icons";
import {ServiceBaseInfo} from "@/types";

export const RESTAPI_URL = "https://panel.dreammc.pl/api/v1"
export const GATEWAY_URL = "https://panel.dreammc.pl/gateway/v1"
export const SSE_URL = "https://panel.dreammc.pl/gateway/events"

export enum PermissionFlags {
    // SYSTEM
    ADMIN = 1 << 0,

    // SERVICES
    READ_SERVICES = 1 << 1,
    EDIT_SERVICES_CONFIGS = 1 << 2,
    CREATE_NEW_SERVICES = 1 << 3,
    DELETE_SERVICES = 1 << 4,
    MANAGE_SERVICES_STATE = 1 << 5,
    UPDATE_SERVICES = 1 << 6,

    // FILES
    READ_ALL_FILES = 1 << 7,
    EDIT_ALL_FILES = 1 << 8,
    DELETE_ALL_FILES = 1 << 9,

    // SETTINGS
    READ_APP_CONFIG = 1 << 10,
    EDIT_APP_CONFIG = 1 << 11,

    // DATABASE
    READ_ALL_DATABASES = 1 << 12,
    UPDATE_ALL_DATABASES = 1 << 13,
    DELETE_ALL_DATABASES = 1 << 14,

    // USERS
    SEE_USERS_DETAILS = 1 << 15,
    EDIT_USERS_DETAILS = 1 << 16,
    CREATE_USERS = 1 << 17,
    REMOVE_USERS = 1 << 18,
    MANAGE_USERS = 1 << 19,

    // ROLES
    EDIT_ROLES = 1 << 20,
    CREATE_ROLES = 1 << 21,
    DELETE_ROLES = 1 << 22,
}

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
        requriedPermission: {
            rolePermission: [
                PermissionFlags.EDIT_SERVICES_CONFIGS,
                PermissionFlags.DELETE_SERVICES,
                PermissionFlags.UPDATE_SERVICES,
                PermissionFlags.READ_SERVICES,
                PermissionFlags.CREATE_NEW_SERVICES,
                PermissionFlags.MANAGE_SERVICES_STATE,
            ],
        }
    },
    {
        href: "/dashboard/files",
        text: "files",
        icon: FilesIcon,
        hasSubpages: false,
        requriedPermission: {
            rolePermission: [
                PermissionFlags.DELETE_ALL_FILES,
                PermissionFlags.EDIT_ALL_FILES,
                PermissionFlags.READ_ALL_FILES,
            ],
        }
    },
    {
        href: "/dashboard/settings",
        text: "settings",
        icon: SettingsIcon,
        hasSubpages: false,
        requriedPermission: {
            rolePermission: [
                PermissionFlags.EDIT_APP_CONFIG,
                PermissionFlags.READ_APP_CONFIG,
            ],
        }
    },
    {
        href: "/dashboard/database",
        text: "database",
        icon: DatabaseIcon,
        hasSubpages: false,
        requriedPermission: {
            rolePermission: [
                PermissionFlags.DELETE_ALL_DATABASES,
                PermissionFlags.READ_ALL_DATABASES,
                PermissionFlags.UPDATE_ALL_DATABASES,
            ],
        }
    },
    {
        href: "/dashboard/users",
        text: "users",
        icon: UsersIcon,
        hasSubpages: true,
    },
    {
        href: "/dashboard/roles",
        text: "roles",
        icon: RolesIcon,
        hasSubpages: true,
    },
]

const AVATAR_URL = "https://avatars.githubusercontent.com/u/124599?v=4";

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
        ]
    }
];

export const SERVICE_SECTIONS = [
    { id: 'console', href: '' },
    { id: 'versions', href: '/versions' },
    { id: 'settings', href: '/settings' },
];
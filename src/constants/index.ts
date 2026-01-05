import {
    DashboardIcon,
    DatabaseIcon,
    FilesIcon,
    RolesIcon,
    ServicesIcon,
    SettingsIcon,
    UsersIcon
} from "@/components/icons";

export const RESTAPI_URL = "http://127.0.0.1:50001/api/v1"

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
            { bit: 23, label: "applyRoles"},
        ]
    }
];
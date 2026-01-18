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
            additionalPermission: "services"
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
            additionalPermission: "files"
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
            additionalPermission: "database"
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

export const MOCK_SERVICE: ServiceBaseInfo = {
    name: "testproxy",
    type: "VELOCITY",
    status: "RUNNING",
}

export const FULL_MOCK_LOGS = [
    "[14:22:05 INFO]: Loading libraries, please wait...",
    "[14:22:08 INFO]: Found Java version 21.0.2. Scanning for patches...",
    "[14:22:10 INFO]: Starting pure-redstone processor...",
    "[14:22:12 INFO]: Building unoptimized graph for entity-collisions...",
    "[14:22:15 INFO]: Starting minecraft server version 1.20.4",
    "[14:22:15 INFO]: Loading properties",
    "[14:22:15 INFO]: Default game type: SURVIVAL",
    "[14:22:15 INFO]: Generating keypair",
    "[14:22:16 INFO]: Starting Minecraft server on *:25565",
    "[14:22:16 INFO]: Using epoll channel type",
    "[14:22:18 INFO]: [WorldEdit] Loading WorldEdit v7.2.15;build-5953",
    "[14:22:18 INFO]: [LuckPerms] Loading LuckPerms v5.4.102",
    "[14:22:18 INFO]: [Vault] Loading Vault v1.7.3-b131",
    "[14:22:18 INFO]: [PlaceholderAPI] Loading PlaceholderAPI v2.11.5",
    "[14:22:19 INFO]: Preparing level \"world\"",
    "[14:22:19 INFO]: Preparing start region for dimension minecraft:overworld",
    "[14:22:20 INFO]: Preparing spawn area: 0%",
    "[14:22:20 INFO]: Preparing spawn area: 14%",
    "[14:22:21 INFO]: Preparing spawn area: 38%",
    "[14:22:21 INFO]: Preparing spawn area: 62%",
    "[14:22:22 INFO]: Preparing spawn area: 89%",
    "[14:22:22 INFO]: Time elapsed: 3145 ms",
    "[14:22:22 INFO]: [LuckPerms] Enabling LuckPerms v5.4.102",
    "[14:22:23 INFO]: [LuckPerms] Loading configurations...",
    "[14:22:23 INFO]: [LuckPerms] Connecting to MariaDB (localhost:3306)...",
    "[14:22:24 INFO]: [LuckPerms] Successfully established connection.",
    "[14:22:24 INFO]: [PlaceholderAPI] Enabling PlaceholderAPI v2.11.5",
    "[14:22:24 INFO]: [PlaceholderAPI] Fetching cloud expansions...",
    "[14:22:25 INFO]: [Vault] Enabling Vault v1.7.3-b131",
    "[14:22:25 INFO]: [Vault] [Economy] Essentials Economy hooked.",
    "[14:22:25 WARN]: [ProtocolLib] Version check failed. You may be running an outdated version.",
    "[14:22:26 INFO]: Done (11.421s)! For help, type \"help\"",
    "[14:22:26 INFO]: Running delayed init tasks",
    "[14:22:30 INFO]: Starting Remote Control (RCON) listener on 0.0.0.0:25575",
    "[14:22:35 INFO]: UUID of player Shadxw is 550e8400-e29b-41d4-a716-446655440000",
    "[14:22:35 INFO]: Shadxw[/1270.0.1:54321] logged in with entity id 154 at ([world]12.5, 64.0, -8.2)",
    "[14:22:37 INFO]: Shadxw joined the game",
    "[14:22:45 INFO]: <Shadxw> Serwer działa idealnie!",
    "[14:23:01 WARN]: Can't keep up! Is the server overloaded? Running 2500ms or 50 ticks behind",
    "[14:23:10 ERROR]: Exception in thread \"Server-Worker-3\" java.lang.NullPointerException",
    "[14:23:10 ERROR]:     at net.minecraft.world.level.Level.getEntities(Level.java:452)",
    "[14:23:15 INFO]: Shadxw issued server command: /tps",
    "[14:23:15 INFO]: TPS from last 1m, 5m, 15m: 20.0, 19.95, 19.98",
    "[14:24:00 INFO]: Saving chunks for level \"world\"/minecraft:overworld",
    "[14:24:02 INFO]: ThreadedAnvilChunkStorage (world): All chunks are saved",
    "[14:24:05 INFO]: Auto-save complete.",
    "[14:24:10 INFO]: Processing 14 pending entity movements...",
    "[14:24:15 INFO]: GC freed 452MB RAM. Current usage: 2.1GB / 4.0GB",
    "[14:24:20 WARN]: Persistent data for player 'Shadxw' could not be synced with database. Retrying...",
    "[14:24:25 INFO]: Database sync successful."
];
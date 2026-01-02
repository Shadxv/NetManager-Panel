import {
    DashboardIcon,
    DatabaseIcon,
    FilesIcon,
    RolesIcon,
    ServicesIcon,
    SettingsIcon,
    UsersIcon
} from "@/components/icons";
import {BaseUser} from "@/types";

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
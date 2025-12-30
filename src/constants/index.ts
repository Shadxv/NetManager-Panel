import {
    DashboardIcon,
    DatabaseIcon,
    FilesIcon,
    RolesIcon,
    ServicesIcon,
    SettingsIcon,
    UsersIcon
} from "@/components/icons";

export const NavBarButtons = [
    {
        href: "/dashboard",
        text: "Dashboard",
        icon: DashboardIcon
    },
    {
        href: "/dashboard/services",
        text: "Services",
        icon: ServicesIcon
    },
    {
        href: "/dashboard/files",
        text: "Files",
        icon: FilesIcon
    },
    {
        href: "/dashboard/settings",
        text: "Settings",
        icon: SettingsIcon
    },
    {
        href: "/dashboard/database",
        text: "Database",
        icon: DatabaseIcon
    },
    {
        href: "/dashboard/users",
        text: "Users",
        icon: UsersIcon
    },
    {
        href: "/dashboard/roles",
        text: "Roles",
        icon: RolesIcon
    },
]
import React from "react";

interface SettingsProp {
    color?: string;
    className?: string;
    active: boolean;
    children: React.ReactNode;
}

export const SettingsSection = ({ color, className, active, children }: SettingsProp) => {
    return (
        <div
            className={`${className || ""} w-full border-2 rounded-2xl p-4 ${!active ? "opacity-60" : ""} ${!color ? "border-muted-gray" : ""}`}
            style={{ borderColor: color }}
        >
            {children}
        </div>
    );
};
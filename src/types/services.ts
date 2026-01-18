export type ServiceType = "VELOCITY" | "PAPER"
export type ServiceStatus = "CREATING" | "STARTING" | "STOPPING" | "STOPPED" | "RUNNING" | "ENABLED" | "DISABLED" | "TERMINATED"

export interface ServiceBaseInfo {
    name: string;
    type: ServiceType;
    status: ServiceStatus;
}

export interface PodInfo {
    name: string;
    status: string;
    internalIP?: string;
    externalIP?: string;
    port?: number;
}

export interface ServiceDetails {
    status: string;
    currentVersion: string;
    availableVersions: string[];
    pods: PodInfo[];
}
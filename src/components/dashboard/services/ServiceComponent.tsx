import {ServiceBaseInfo} from "@/types";
import {TerminalIcon} from "@/components/icons";
import {getStatusConfig, toPascalCase} from "@/utils";

export const ServiceComponent = ({ service }: { service: ServiceBaseInfo }) => {

    const config = getStatusConfig(service.status);
    const isCreating = service.status.toUpperCase() === "CREATING";

    return (
        <div className="relative flex items-center gap-5 p-4 rounded-3xl w-full group-hover:bg-secondary-white/80 bg-secondary-white/50 dark:bg-secondary-black dark:group-hover:bg-primary-black border border-muted-white/30 dark:border-muted-gray/50 shadow-sm transition-all">

            <div className="relative size-20 p-5 rounded-2xl flex items-center justify-center bg-white/50 dark:bg-muted-gray/20 shadow-inner">
                {isCreating ? (
                    <div className="size-7 border-2 border-zinc-200 border-t-zinc-500 dark:border-primary-white/10 dark:border-t-primary-white rounded-full animate-spin" />
                ) : (
                    <div className="w-full h-full text-primary-black/70 dark:text-primary-white/80">
                        {TerminalIcon}
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-primary-black dark:text-primary-white">
                    {service.name}
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-normal text-muted-gray dark:text-muted-white/80">
                        {service.type}
                    </span>
                    <span className="text-muted-gray/20 dark:text-muted-white/10">|</span>
                    <span className="text-sm font-light text-muted-gray/60 dark:text-muted-white/60">
                        {config.label}
                    </span>
                </div>
            </div>

            <div className={`absolute right-0 top-6 bottom-6 w-1 rounded-l-full ${config.color} opacity-80`} />
        </div>
    );
};
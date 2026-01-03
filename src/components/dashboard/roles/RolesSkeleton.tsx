export function RolesSkeleton() {
    return (
        <div className="w-full flex flex-col gap-2 pt-4 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-4 w-full p-4 md:p-2 md:px-4 bg-primary-white dark:bg-primary-black/20 rounded-xl"
                >
                    <div className="size-2 rounded-full bg-gray-300 dark:bg-zinc-700 shrink-0" />
                    <div className="h-6 w-24 bg-secondary-gray/20 dark:bg-muted-gray/60 rounded-md" />
                </div>
            ))}
        </div>
    );
}
export default function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <div className="size-10 border-4 border-muted-gray/20 border-t-accent rounded-full animate-spin" />
            </div>
        </div>
    );
}
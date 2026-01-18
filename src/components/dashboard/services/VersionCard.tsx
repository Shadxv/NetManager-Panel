'use client';

interface VersionCardProps {
    version: string;
    isActive: boolean;
    onSwitch: (version: string) => void;
}

export const VersionCard = ({ version, isActive, onSwitch }: VersionCardProps) => {
    return (
        <div
            className={`
                relative p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col
                ${isActive
                ? 'border-accent bg-accent/5 shadow-md shadow-accent/5'
                : 'border-muted-gray/10 dark:border-muted-gray/20 bg-muted-white/5 dark:bg-primary-black/10 hover:border-muted-gray/40'
            }
            `}
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-widest text-muted-gray dark:text-muted-white/40 uppercase">
                    Version Tag
                </span>
                {isActive && (
                    <span className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-green-500 uppercase">Live</span>
                    </span>
                )}
            </div>

            <div className="text-3xl font-mono font-bold text-primary-black dark:text-primary-white mb-6">
                {version}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isActive
                        ? 'bg-accent text-white'
                        : 'bg-muted-gray/10 text-muted-gray dark:text-muted-white/60'
                }`}>
                    {isActive ? 'ACTIVE' : 'IDLE'}
                </div>

                {!isActive && (
                    <button
                        onClick={() => onSwitch(version)}
                        className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                    >
                        Switch to →
                    </button>
                )}
            </div>
        </div>
    );
};
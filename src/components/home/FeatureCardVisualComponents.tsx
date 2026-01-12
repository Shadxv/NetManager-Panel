export const FileManagerCardVisual = () => {
    const files = [
        { width: "w-10", isFolder: true },
        { width: "w-16", isFolder: false, active: true },
        { width: "w-12", isFolder: false },
        { width: "w-14", isFolder: true},
        { width: "w-8", isFolder: false},
    ];

    const editorLines = [
        [0.15, 0.45],
        [0.05, 0.8],
        [0.2, 0.3, 0.15],
        [0.4, 0.25],
        [0,0],
        [0.1, 0.6],
        [0.35, 0.1, 0.2],
        [0.05, 0.3],
        [0,0],
        [0.7],
        [0.2, 0.5],
        [0.1, 0.2, 0.1, 0.3],
        [0.55],
        [0.15, 0.4, 0.1],
        [0.3, 0.3],
        [0.05, 0.75],
        [0.25, 0.2, 0.2],
        [0.45, 0.1]
    ];

    return (
        <div className="w-full h-full bg-primary-white rounded-xl overflow-hidden flex flex-col shadow-lg">
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/3 shadow-sm shadow-primary-black/30 p-2 flex flex-col gap-2">
                    {files.map((file, i) => (
                        <div key={i} className={`flex items-center gap-1.5 p-1 rounded ${file.active ? 'bg-accent' : ''}`}>
                            <div className={`w-2 h-2 rounded-sm shrink-0 ${file.isFolder ? 'bg-accent' : 'bg-secondary-gray'}`} />
                            <div className={`h-1 rounded-full bg-secondary-gray ${file.width}`} />
                        </div>
                    ))}
                </div>

                <div className="flex-1 p-3 flex flex-col gap-2 relative">
                    <div className="absolute right-1 top-2 w-0.5 h-8 bg-secondary-gray rounded-full" />

                    {editorLines.map((line, i) => (
                        <div key={i} className="flex gap-1.5 h-1 items-center">
                            {line.map((width, j) => (
                                <div
                                    key={j}
                                    style={{ width: `${width * 100}%` }}
                                    className={`h-full rounded-full ${
                                        j === 0 && i % 2 === 0 ? "bg-accent/40" : "bg-secondary-gray"
                                    }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const DatabaseVisual = () => {
    const headers = [0.1, 0.4, 0.25, 0.15];

    const rows = [
        [0.1, 0.35, 0.2, 0.1],
        [0.1, 0.45, 0.15, 0.2],
        [0.1, 0.25, 0.3, 0.1],
        [0.1, 0.4, 0.2, 0.15],
        [0.1, 0.3, 0.1, 0.25],
        [0.1, 0.5, 0.2, 0.1],
        [0.1, 0.2, 0.35, 0.15],
    ];

    return (
        <div className="w-full h-full bg-primary-white rounded-xl overflow-hidden flex flex-col shadow-lg border border-black/5">
            <div className="w-full h-8 border-b border-secondary-gray/40 flex items-center px-4 gap-4 bg-secondary-gray/5">
                <div className="h-1.5 w-16 bg-secondary-gray rounded-full" />
            </div>

            <div className="flex-1 flex flex-col p-4">
                <div className="flex gap-4 mb-4 border-b border-secondary-gray/40 pb-2">
                    {headers.map((w, i) => (
                        <div
                            key={i}
                            style={{ width: `${w * 100}%` }}
                            className="h-2 bg-secondary-gray/40 rounded-full"
                        />
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                    {rows.map((row, i) => (
                        <div key={i} className="flex gap-4 items-center group">
                            {row.map((w, j) => (
                                <div
                                    key={j}
                                    style={{ width: `${w * 100}%` }}
                                    className={`h-1.5 rounded-full ${
                                        j === 0
                                            ? "bg-accent/60"
                                            : "bg-secondary-gray"
                                    }`}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className="mt-auto flex justify-between items-center pt-2">
                    <div className="h-1 w-12 bg-secondary-gray/30 rounded-full" />
                    <div className="flex gap-1">
                        <div className="w-4 h-4 rounded bg-accent" />
                        <div className="w-4 h-4 rounded bg-secondary-gray/10" />
                        <div className="w-4 h-4 rounded bg-secondary-gray/10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const PermissionsVisual = () => {
    const users = [
        { nameWidth: "w-20", roleColor: "bg-accent", roleWidth: "w-12" },
        { nameWidth: "w-24", roleColor: "bg-emerald-500", roleWidth: "w-14" },
        { nameWidth: "w-16", roleColor: "bg-blue-500", roleWidth: "w-10" },
        { nameWidth: "w-28", roleColor: "bg-blue-500", roleWidth: "w-10" },
        { nameWidth: "w-20", roleColor: "bg-secondary-gray", roleWidth: "w-12" },
    ];

    return (
        <div className="w-full h-full bg-primary-white rounded-xl overflow-hidden flex flex-col shadow-lg">
            <div className="px-4 py-3 border-b border-secondary-gray/10 flex justify-between items-center bg-secondary-gray/5">
                <div className="h-2 w-24 bg-secondary-gray/40 rounded-full" />
                <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin-slow opacity-20" />
            </div>

            <div className="p-4 flex flex-col gap-4">
                {users.map((user, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full bg-secondary-gray/20 border border-secondary-gray/10" />
                            <div className={`h-1.5 rounded-full bg-secondary-gray ${user.nameWidth}`} />
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`h-4 rounded-md opacity-40 ${user.roleColor} ${user.roleWidth}`} />
                            <div className="w-7 h-3.5 bg-secondary-gray/20 rounded-full relative">
                                <div className={`absolute top-0.5 left-0.5 w-2.5 h-2.5 rounded-full bg-white shadow-sm ${i < 2 ? 'translate-x-3.5 bg-accent/80' : ''} transition-all`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-auto p-3 bg-accent/5 flex gap-2">
                <div className="h-1.5 w-full bg-accent/20 rounded-full" />
            </div>
        </div>
    );
};

export const DeploymentVisual = () => {
    const steps = [
        { labelWidth: "w-24", status: "complete" },
        { labelWidth: "w-32", status: "complete" },
        { labelWidth: "w-20", status: "loading" },
        { labelWidth: "w-28", status: "pending" },
    ];

    return (
        <div className="w-full h-full bg-primary-white rounded-xl overflow-hidden flex flex-col shadow-lg border border-black/5">
            <div className="px-4 py-3 border-b border-secondary-gray/10 flex items-center justify-between">
                <div className="h-2 w-20 bg-secondary-gray/40 rounded-full" />
                <div className="h-6 w-20 bg-accent rounded-md flex items-center justify-center shadow-sm shadow-accent/20">
                    <div className="h-1 w-10 bg-white/40 rounded-full" />
                </div>
            </div>

            <div className="p-5 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-end">
                        <div className="h-3 w-12 bg-accent/40 rounded-full" />
                        <div className="h-1.5 w-8 bg-secondary-gray/20 rounded-full" />
                    </div>
                    <div className="w-full h-2 bg-secondary-gray/10 rounded-full overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-[65%] bg-accent transition-all duration-1000 shadow-[0_0_8px_rgba(var(--accent-rgb),0.5)]" />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <div className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center ${
                                step.status === "complete" ? "bg-accent/20" :
                                    step.status === "loading" ? "border-2 border-accent border-t-transparent animate-spin" :
                                        "bg-secondary-gray/10"
                            }`}>
                                {step.status === "complete" && <div className="w-1.5 h-1.5 rounded-full bg-accent" />}
                            </div>

                            <div className={`h-1.5 rounded-full ${step.status === "pending" ? "bg-secondary-gray/20" : "bg-secondary-gray"} ${step.labelWidth}`} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto mx-4 mb-4 p-2 bg-secondary-black rounded-lg flex flex-col gap-1.5 opacity-80">
                <div className="flex gap-1">
                    <div className="h-1 w-3 bg-accent/60 rounded-full" />
                    <div className="h-1 w-16 bg-white/20 rounded-full" />
                </div>
                <div className="flex gap-1">
                    <div className="h-1 w-3 bg-accent/60 rounded-full" />
                    <div className="h-1 w-24 bg-white/20 rounded-full" />
                </div>
            </div>
        </div>
    );
};
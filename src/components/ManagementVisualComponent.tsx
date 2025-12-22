export const ManagementVisualComponent = () => {
    return (
        <div className="w-full h-full bg-primary-white flex flex-row">
            <div className="w-1/18 h-full shadow-sm shadow-primary-black/30 flex flex-col p-1 gap-2 py-6">
                {Array.from({ length: 7 }).map((_, index) => (
                    <IconTile key={index} active={index == 1}/>
                ))}
            </div>
            <div className="w-full h-full p-6 flex flex-col gap-2">
                <span className="bg-primary-black rounded-xl aspect-4/1 w-1/6 mb-4"/>
                {Array.from({ length: 5 }).map((_, index) => (
                    <ServiceTile key={index} active={index != 2}/>
                ))}
            </div>
        </div>
    )
}

const IconTile = ( { active } : {active: boolean}) => {
    return (
        <div className={`${active ? "bg-accent" : "bg-secondary-gray"} w-full aspect-square rounded-md`}/>
    )
}

const ServiceTile = ( { active } : { active: boolean }) => {
    return (
        <div className="bg-white aspect-8/1 w-full rounded-md shadow-md shadow-primary-black/10 p-4 flex flex-col gap-3">
            <div className="flex flex-row gap-2 items-center">
                <span className="bg-secondary-gray rounded-md aspect-6/1 w-1/6 opacity-30"/>
                <span className="relative flex size-2">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${active ? "bg-green-500" : "bg-red-500"} opacity-50`}></span>
                    <span className={`relative inline-flex size-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"} animate-pulse`}></span>
                </span>
            </div>
            <span className="bg-secondary-gray rounded-md aspect-22/1 w-1/2 opacity-10"/>
        </div>
    )
}
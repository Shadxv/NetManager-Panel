import {ServiceList} from "@/components/dashboard/services/";

export default function ServicesPage() {
    return (
        <div className="flex flex-col gap-4 w-full h-full overflow-y-auto animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">
                Services
            </h1>

            <ServiceList />
        </div>
    );
}
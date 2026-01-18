import {VersionsListView} from "@/components/dashboard/services";

export default async function VersionsPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    return (
        <VersionsListView name={id}/>
    );
}
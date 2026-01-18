import PodView from "@/components/dashboard/services/PodView";

interface PageProps {
    params: Promise<{ id: string; podId: string; }>;
}

export default async function Page({ params }: PageProps) {
    const { id, podId } = await params;

    return <PodView serviceId={id} podId={podId} />;
}
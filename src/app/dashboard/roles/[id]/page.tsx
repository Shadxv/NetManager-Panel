import {MOCK_ROLE_ADMIN} from "@/constants";
import {formatDate} from "@/utils";
import {RoleForm} from "@/components/dashboard/roles";
import Link from "next/link";
import {BackIcon} from "@/components/icons";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";

interface RoleDetailsParams {
    id: string
}

interface RoleDetailsProp {
    params: Promise<RoleDetailsParams>
}

export default async function RoleDetailsPage(props: RoleDetailsProp) {
    const t = await getTranslations("Roles")
    const id = (await props.params).id

    const role = MOCK_ROLE_ADMIN

    return (
        <div className="w-full flex flex-col gap-4 p-4 pt-22 md:pt-0">
            <Link
                href="/dashboard/roles"
                className="md:hidden text-accent/80 hover:text-accent gap-2 items-center inline-flex w-fit"
            >
                <div className="size-4 shrink-0">
                    {BackIcon}
                    {t("back")}
                </div>

            </Link>
            <h1 className="text-2xl font-bold text-primary-black dark:text-primary-white">{t("details")}</h1>
            <div className="text-primary-gray/70 dark:text-secondary-gray">
                <p>{t("createdAt")} {formatDate(role.createdAt)}</p>
                <p>{t("updatedAt")} {formatDate(role.updatedAt)}</p>
            </div>
            <RoleForm role={role}/>
        </div>
    )
}
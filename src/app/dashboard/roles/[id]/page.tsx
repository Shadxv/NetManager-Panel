import { formatDate } from "@/utils";
import {RoleForm} from "@/components/dashboard/roles";
import Link from "next/link";
import { BackIcon } from "@/components/icons";
import { getTranslations } from "next-intl/server";
import axios from "axios";
import { RESTAPI_URL } from "@/constants";
import {RequestError, RoleDetails} from "@/types";

interface RoleDetailsProp {
    params: Promise<{ id: string }>;
}

export default async function RoleDetailsPage({ params }: RoleDetailsProp) {
    const t = await getTranslations("Roles");
    const id = (await params).id;

    const role: RoleDetails | RequestError = await axios.get<RoleDetails>(`${RESTAPI_URL}/roles/${id}`, { timeout: 5000 })
        .then((res) => {
            return res.data;
        }).catch((e) => {

            const status = (e.response && e.response.status) || (e.code === 'ECONNABORTED' && 408);

            switch(status) {
                case 404:
                case 400: return new RequestError(404, "roleNotFound")
                case 408: return new RequestError(408)
                default: return new RequestError()
            }
        });

    if (role instanceof RequestError) throw role;

    return (
        <div className="w-full flex flex-col gap-4 p-4 pt-22 md:pt-0">
            <Link
                href="/dashboard/roles"
                className="md:hidden text-accent/80 hover:text-accent gap-2 items-center inline-flex w-fit transition-colors"
            >
                <div className="size-4 shrink-0">{BackIcon}</div>
                {t("back")}
            </Link>

            <h1 className="text-2xl font-bold text-primary-black dark:text-primary-white">
                {t("details")}
            </h1>

            <div className="text-primary-gray/70 dark:text-secondary-gray text-sm">
                <p>{t("createdAt")} {formatDate(role.createdAt)}</p>
                <p>{t("updatedAt")} {formatDate(role.updatedAt)}</p>
            </div>

            <RoleForm role={role} />
        </div>
    );
}
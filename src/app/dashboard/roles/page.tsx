import {useTranslations} from "next-intl";

export default function RolesPage() {

    const t = useTranslations("Roles")

    return (
        <div className="w-full h-full justify-center items-center hidden md:flex">
            <div className="size-80 flex flex-col items-center justify-center gap-2 rounded-full p-6 bg-[radial-gradient(circle_closest-side,#4f46e528_0%,transparent_100%)]">
                <h1 className="text-muted-gray dark:text-secondary-white font-bold text-3xl">{t("notSelected")}</h1>
                <p className="text-muted-gray/60 dark:text-muted-white/70 font-light text-lg text-center">{t("notSelectedDescription")}</p>
            </div>
        </div>
    )
}
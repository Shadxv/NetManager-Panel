'use client'

import {useTranslations} from "next-intl";
import {RequestError} from "@/types";
import {useRouter} from "next/navigation";

export const ErrorComponent = ({ error, reset, previous }: { error: Error, reset: () => void, previous: string }) => {
    const t = useTranslations("Errors")
    const router = useRouter()

    const err = RequestError.decode(error.message)

    return (
        <div className="w-full h-full flex flex-col justify-center items-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-full h-px bg-linear-to-r from-transparent via-muted-gray/10 dark:via-muted-white/5 to-transparent -translate-y-32" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-linear-to-b from-transparent via-muted-gray/10 dark:via-muted-white/5 to-transparent translate-x-32" />

            <div className="size-96 flex flex-col items-center justify-center gap-6 rounded-full p-10 bg-[radial-gradient(circle_closest-side,#ef444415_0%,transparent_100%)] relative z-10">

                <div className="flex flex-col items-center gap-1">
                    <span className="text-red-primary font-mono text-sm tracking-widest uppercase opacity-70">
                        {err.code}
                    </span>
                    <h1 className="text-primary-black dark:text-primary-white font-bold text-4xl tracking-tight text-center">
                        {t(`${err.code}.title`)}
                    </h1>
                </div>

                <div className="w-12 h-0.5 bg-red-primary/30 rounded-full" />

                <p className="text-muted-gray/80 dark:text-muted-white/80 font-light text-base text-center max-w-xs leading-relaxed">
                    {(err.msg && t(`${err.code}.messages.${err.msg}`)) || t(`${err.code}.message`)}
                </p>

                <div className="flex items-center gap-4 mt-4">
                    {/*<button*/}
                    {/*    onClick={() => {*/}
                    {/*        reset()*/}
                    {/*    }}*/}
                    {/*className="px-6 py-2.5 rounded-xl bg-accent text-primary-white hover:opacity-90 transition-all font-medium text-sm"*/}
                    {/*    >*/}
                    {/*    {t("retry")}*/}
                    {/*</button>*/}

                    <button
                    onClick={() => router.push(previous)}
                    className="px-6 py-2.5 rounded-xl border border-muted-gray/20 dark:border-muted-white/20 text-secondary-black dark:text-secondary-white hover:bg-muted-gray/5 transition-all text-sm"
                        >
                        {t("goBack")}
                    </button>
                </div>
            </div>
            <div className="absolute bottom-10 right-10 size-1 bg-red-primary rounded-full opacity-40" />
        </div>
    );
}
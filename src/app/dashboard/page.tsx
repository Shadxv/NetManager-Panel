'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { GATEWAY_URL } from "@/constants";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Stats {
    totalServices: number;
    runningServices: number;
    totalPods: number;
    nonRunningPods: number;
}

export default function DashboardPage() {
    const t = useTranslations("Dashboard");
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${GATEWAY_URL}/services/stats`)
            .then(res => setStats(res.data))
            .catch(err => console.error("Stats fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    const servicesData = [
        { name: 'Running', value: stats.runningServices, color: 'var(--accent)' },
        { name: 'Stopped', value: stats.totalServices - stats.runningServices, color: 'rgba(156, 163, 175, 0.2)' }
    ];

    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">
                    {t("title")}
                </h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 bg-muted-white/5 dark:bg-primary-black/5 p-8 rounded-4xl border border-muted-white/10 dark:border-muted-gray/10 flex flex-col sm:flex-row items-center gap-10">
                    <div className="w-full sm:w-1/2 h-52 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={servicesData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={450}
                                >
                                    {servicesData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-3xl text-primary-black dark:text-primary-white">{stats.totalServices}</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-gray mt-1">{t("services")}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 w-full sm:w-1/2">
                        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">{t("infrastructure")}</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-accent/5 border border-accent/10">
                                <span className="text-sm text-accent">{t("running")}</span>
                                <span className="text-xl text-primary-black dark:text-primary-white">{stats.runningServices}</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-2xl bg-muted-gray/5 border border-muted-gray/10">
                                <span className="text-sm text-muted-gray">{t("stopped")}</span>
                                <span className="text-xl text-primary-black dark:text-primary-white">{stats.totalServices - stats.runningServices}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-muted-white/5 dark:bg-primary-black/5 p-8 rounded-4xl border border-muted-white/10 dark:border-muted-gray/10 flex flex-col justify-between min-h-[300px]">
                    <div>
                        <h3 className="text-lg font-bold text-primary-black dark:text-primary-white">{t("podsMetrics")}</h3>
                        <p className="text-xs text-muted-gray mt-1">{t("instanceDistribution")}</p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl text-accent tracking-tighter">
                                {stats.totalPods - stats.nonRunningPods}
                            </span>
                            <span className="text-muted-gray text-sm">/ {stats.totalPods} {t("active")}</span>
                        </div>

                        <div className="space-y-2">
                            <div className="w-full h-1.5 bg-muted-gray/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent transition-all duration-700 ease-out"
                                    style={{ width: `${((stats.totalPods - stats.nonRunningPods) / stats.totalPods) * 100}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-gray/50">
                                <span>{t("healthy")}</span>
                                <span>{stats.nonRunningPods} {t("issues")}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
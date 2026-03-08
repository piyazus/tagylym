"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase";
import ProgressBar from "@/components/ProgressBar";
import type { Progress } from "@/types";

export default function DashboardPage() {
    const t = useTranslations("dashboard");
    const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
    const [progress, setProgress] = useState<Progress[]>([]);
    const [categories, setCategories] = useState<{ id: string; name: string; icon: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser ? { id: authUser.id, email: authUser.email } : null);

        // Fetch categories
        const { data: cats } = await supabase
            .from("categories")
            .select("id, name, icon")
            .order("order");
        if (cats) setCategories(cats);

        // Fetch user progress
        if (authUser) {
            const { data: prog } = await supabase
                .from("progress")
                .select("*")
                .eq("user_id", authUser.id)
                .order("completed_at", { ascending: false });
            if (prog) setProgress(prog);
        }

        setLoading(false);
    };

    // Calculate per-category progress (lessons completed / total lessons in category)
    // For now show overall counts since we don't have lessons seeded yet
    const completedCount = progress.length;

    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
                {/* Welcome */}
                <div className="mb-12">
                    <h1 className="text-3xl font-black text-white mb-2">
                        {t("welcome")} {user?.email ? `(${user.email})` : ""} 👋
                    </h1>
                    <p className="text-muted">Ваш прогресс по категориям FLL</p>
                </div>

                {loading ? (
                    <div className="text-center py-16">
                        <p className="text-muted">Загрузка...</p>
                    </div>
                ) : !user ? (
                    <div className="text-center py-16">
                        <span className="text-4xl mb-4 block">🔒</span>
                        <p className="text-muted mb-4">{t("noProgress")}</p>
                        <a
                            href="/auth/login"
                            className="inline-flex px-6 py-3 rounded-lg gradient-brand text-white font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                            Войти для отслеживания прогресса
                        </a>
                    </div>
                ) : (
                    <>
                        {/* Progress Cards */}
                        <section className="mb-16">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-lg">📊</span>
                                {t("progress")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="glass-card p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl">{cat.icon}</span>
                                            <div>
                                                <h3 className="font-semibold text-white">{cat.name}</h3>
                                                <p className="text-xs text-muted">
                                                    0 из 0 уроков {t("completed")}
                                                </p>
                                            </div>
                                        </div>
                                        <ProgressBar completed={0} total={1} />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Recent Progress */}
                        <section className="mb-16">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-lg">🕐</span>
                                {t("recent")}
                            </h2>
                            {progress.length === 0 ? (
                                <p className="text-sm text-muted">{t("noProgress")}</p>
                            ) : (
                                <div className="space-y-3">
                                    {progress.slice(0, 5).map((p, idx) => (
                                        <div key={`${p.user_id}-${p.lesson_id}`} className="glass-card p-4 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-sm font-bold text-accent shrink-0">
                                                {idx + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-white">Lesson ID: {p.lesson_id.slice(0, 8)}...</p>
                                                <p className="text-xs text-muted">
                                                    {new Date(p.completed_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Checklist Status */}
                        <section>
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="text-lg">✅</span>
                                {t("checklist")}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {["Начинающий", "Средний", "Продвинутый"].map((level, idx) => {
                                    const colors = ["beginner", "intermediate", "advanced"];
                                    return (
                                        <div key={level} className="glass-card p-5">
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className={`w-2 h-2 rounded-full bg-${colors[idx]}`} />
                                                <span className="font-medium text-sm text-white">{level}</span>
                                            </div>
                                            <ProgressBar completed={0} total={1} />
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </>
                )}
            </div>
        </div>
    );
}

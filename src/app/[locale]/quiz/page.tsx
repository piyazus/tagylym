"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import QuizCard from "@/components/QuizCard";
import { supabase } from "@/lib/supabase";
import type { Quiz } from "@/types";

export default function QuizPage() {
    const t = useTranslations("quiz");
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [filterCategory, setFilterCategory] = useState("");
    const [filterLevel, setFilterLevel] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizzes();
    }, [filterCategory, filterLevel]);

    const fetchQuizzes = async () => {
        setLoading(true);
        let query = supabase.from("quizzes").select("*");

        if (filterCategory) query = query.eq("category", filterCategory);
        if (filterLevel) query = query.eq("level", filterLevel);

        const { data, error } = await query;
        if (!error && data) {
            setQuizzes(data);
        }
        setLoading(false);
    };

    const categories = [
        { value: "", label: t("all") },
        { value: "robot-design", label: "Конструирование" },
        { value: "innovation", label: "Инновационный проект" },
        { value: "coding", label: "Программирование" },
        { value: "robot-game", label: "Игра роботов" },
    ];

    const levels = [
        { value: "", label: t("all") },
        { value: "beginner", label: "Начинающий" },
        { value: "intermediate", label: "Средний" },
        { value: "advanced", label: "Продвинутый" },
    ];

    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-3">{t("title")}</h1>
                    <p className="text-muted">
                        Проверьте знания команды по всем категориям и уровням
                    </p>
                </div>

                {/* Filters */}
                <div className="glass-card p-4 mb-8 flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-xs text-muted font-medium mb-1.5">
                            {t("filterCategory")}
                        </label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full bg-surface-lighter text-slate-300 text-sm rounded-lg px-3 py-2 border border-surface-lighter/50 focus:border-accent/50 focus:outline-none"
                        >
                            {categories.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-xs text-muted font-medium mb-1.5">
                            {t("filterLevel")}
                        </label>
                        <select
                            value={filterLevel}
                            onChange={(e) => setFilterLevel(e.target.value)}
                            className="w-full bg-surface-lighter text-slate-300 text-sm rounded-lg px-3 py-2 border border-surface-lighter/50 focus:border-accent/50 focus:outline-none"
                        >
                            {levels.map((l) => (
                                <option key={l.value} value={l.value}>{l.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results count */}
                <p className="text-sm text-muted mb-6">
                    {loading ? "Загрузка..." : `${quizzes.length} вопросов найдено`}
                </p>

                {/* Quiz Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {quizzes.map((quiz) => (
                            <QuizCard key={quiz.id} quiz={quiz} />
                        ))}
                    </div>
                )}

                {!loading && quizzes.length === 0 && (
                    <div className="text-center py-16">
                        <span className="text-4xl mb-4 block">🔍</span>
                        <p className="text-muted">Вопросы не найдены. Попробуйте изменить фильтры.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

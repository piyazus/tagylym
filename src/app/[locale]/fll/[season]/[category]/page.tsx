import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LevelBadge from "@/components/LevelBadge";
import {
    getSeasonBySlug,
    getCategoryBySlug,
    getLevelsWithCounts,
} from "@/lib/queries";
import type { LevelName } from "@/types";

const levelSlugMap: Record<string, LevelName> = {
    "Начинающий": "beginner",
    "Средний": "intermediate",
    "Продвинутый": "advanced",
};

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ locale: string; season: string; category: string }>;
}) {
    const { category, season } = await params;

    const seasonData = await getSeasonBySlug("fll", season);
    const categoryData = seasonData
        ? await getCategoryBySlug(seasonData.id, category)
        : null;
    const levels = categoryData
        ? await getLevelsWithCounts(categoryData.id)
        : [];

    return (
        <CategoryPageContent
            category={category}
            season={season}
            cat={categoryData}
            levels={levels}
        />
    );
}

function CategoryPageContent({
    category,
    season,
    cat,
    levels,
}: {
    category: string;
    season: string;
    cat: { id: string; name: string; slug: string; icon: string } | null;
    levels: { id: string; name: string; color: string; order: number; lessonCount: number; checklistCount: number }[];
}) {
    const t = useTranslations("category");

    if (!cat) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted">Category not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
                    <div className="text-5xl mb-4">{cat.icon}</div>
                    <h1 className="text-4xl font-black text-white mb-3">{cat.name}</h1>
                    <p className="mt-4 text-sm text-accent font-medium">
                        Стандартное решение (X) → Наш подход (Y) потому что (Z)
                    </p>
                </div>
            </section>

            {/* Level Cards */}
            <section className="max-w-7xl mx-auto px-6 pb-16">
                <h2 className="text-2xl font-bold text-center mb-2">{t("levels")}</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-beginner via-intermediate to-advanced rounded-full mx-auto mb-10" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
                    {levels.map((level) => {
                        const slug = levelSlugMap[level.name] || "beginner";
                        return (
                            <Link
                                key={level.id}
                                href={`/fll/${season}/${category}/${slug}` as "/"}
                                className="glass-card p-8 group relative overflow-hidden"
                            >
                                {/* Top accent bar */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                    style={{ backgroundColor: level.color }}
                                />

                                <LevelBadge level={slug} />

                                <h3 className="text-xl font-bold text-white mt-4 mb-3 group-hover:text-accent transition-colors">
                                    {level.name}
                                </h3>

                                <div className="space-y-2 text-xs text-muted mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">🎬</span>
                                        {level.lessonCount} {t("lessons")}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">✅</span>
                                        {level.checklistCount} {t("checklistItems")}
                                    </div>
                                </div>

                                <div
                                    className="py-2.5 rounded-lg text-center text-sm font-medium transition-all"
                                    style={{ backgroundColor: `${level.color}20`, color: level.color }}
                                >
                                    {t("start")}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="glass-card p-6 border-l-4 border-accent">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                        <span className="text-xl">💜</span>
                        {t("coreValues")}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{t("coreValuesText")}</p>
                </div>
            </section>
        </div>
    );
}

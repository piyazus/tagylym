import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
    getActiveSeasonByCompetition,
    getCategoriesBySeason,
} from "@/lib/queries";

export default async function FLLPage() {
    const season = await getActiveSeasonByCompetition("fll");
    const categories = season
        ? await getCategoriesBySeason(season.id)
        : [];

    // Build season slug from name + year, e.g. "submerged-2025-26"
    const seasonSlug = season
        ? season.name.toLowerCase().replace(/\s+/g, "-")
        : "current";

    return (
        <FLLPageContent
            categories={categories}
            seasonSlug={seasonSlug}
            seasonName={season?.name ?? ""}
            seasonYear={season?.year ?? 0}
        />
    );
}

function FLLPageContent({
    categories,
    seasonSlug,
    seasonName,
    seasonYear,
}: {
    categories: { id: string; name: string; slug: string; icon: string; order: number }[];
    seasonSlug: string;
    seasonName: string;
    seasonYear: number;
}) {
    const t = useTranslations();

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-beginner/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-beginner/10 border border-beginner/20 mb-6 text-sm text-beginner font-medium">
                            <span className="text-lg">🤖</span>
                            FIRST LEGO League
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            {t("home.fllTitle")}
                        </h1>
                        <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                            {t("home.fllDescription")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Season Badge */}
            <div className="max-w-7xl mx-auto px-6 mb-8">
                <div className="flex items-center justify-center gap-3">
                    <span className="h-px flex-1 bg-surface-lighter/30" />
                    <span className="px-4 py-2 rounded-full glass text-sm font-semibold text-accent">
                        🌊 {seasonName} {seasonYear ? `(${seasonYear})` : ""}
                    </span>
                    <span className="h-px flex-1 bg-surface-lighter/30" />
                </div>
            </div>

            {/* Category Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/fll/${seasonSlug}/${cat.slug}` as "/"}
                            className="glass-card p-8 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full group-hover:bg-accent/10 transition-all" />

                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 rounded-xl glass flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed mb-4">
                                        3 уровня подготовки от начального до продвинутого. Видеоуроки, чек-листы и критерии оценки.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-muted">
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-beginner" />
                                            {t("category.beginner")}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-intermediate" />
                                            {t("category.intermediate")}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-2 h-2 rounded-full bg-advanced" />
                                            {t("category.advanced")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
                                {t("category.start")} <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Core Values Notice */}
                <div className="mt-12 glass-card p-6 border-l-4 border-accent">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
                        <span className="text-xl">💜</span>
                        {t("category.coreValues")}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                        {t("category.coreValuesText")}
                    </p>
                </div>
            </section>
        </div>
    );
}

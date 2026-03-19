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
        <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
            {/* Hero */}
            <section className="relative overflow-hidden bg-white border-b border-[#E5E7EB]">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-50 rounded-full blur-[80px]" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 mb-6 text-sm text-[#2563EB] font-medium">
                            <span className="text-lg">🤖</span>
                            FIRST LEGO League
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#1A1A1A] mb-4">
                            {t("home.fllTitle")}
                        </h1>
                        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
                            {t("home.fllDescription")}
                        </p>
                    </div>
                </div>
            </section>

            {/* Season Badge */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-center gap-3">
                    <span className="h-px flex-1 bg-[#E5E7EB]" />
                    <span className="px-4 py-2 rounded-full bg-white border border-[#E5E7EB] text-sm font-semibold text-[#2563EB] shadow-sm">
                        🌊 {seasonName} {seasonYear ? `(${seasonYear})` : ""}
                    </span>
                    <span className="h-px flex-1 bg-[#E5E7EB]" />
                </div>
            </div>

            {/* Category Grid */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/fll/${seasonSlug}/${cat.slug}` as "/"}
                            className="bg-white border border-[#E5E7EB] rounded-2xl p-8 group relative overflow-hidden transition-all hover:shadow-md hover:border-[#2563EB]/50"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full group-hover:bg-blue-100 transition-colors" />

                            <div className="flex items-start gap-5 relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#2563EB] transition-colors">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                                        Бастауыштан бастап жетілдірілгенге дейінгі 3 дайындық деңгейі. Бейнесабақтар, чек-листтер және бағалау критерийлері.
                                    </p>
                                    <div className="flex items-center gap-4 text-xs font-medium text-[#4B5563]">
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                                            {t("category.beginner")}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                                            {t("category.intermediate")}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                                            {t("category.advanced")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-[#F3F4F6] pt-4 text-sm font-medium text-[#2563EB] relative z-10">
                                {t("category.start")}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Core Values Notice */}
                <div className="mt-12 bg-[#EFF6FF] rounded-2xl p-6 border-l-4 border-[#2563EB]">
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-3 text-[#1E40AF]">
                        <span className="text-xl">💜</span>
                        Негізгі Құндылықтар
                    </h3>
                    <p className="text-sm text-[#3B82F6] leading-relaxed">
                        Негізгі құндылықтар жеке пән емес. Олар барлық сабақтар процесіне біріктірілген. Бағалау кезінде төрешілер команданың жарыс барысында бұл құндылықтарды қалай көрсететініне назар аударады.
                    </p>
                </div>
            </section>
        </div>
    );
}

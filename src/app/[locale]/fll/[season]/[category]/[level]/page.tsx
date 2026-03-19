import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LevelBadge from "@/components/LevelBadge";
import ChecklistBlock from "@/components/ChecklistBlock";
import RubricCallout from "@/components/RubricCallout";
import ArtifactCard from "@/components/ArtifactCard";
import {
    getSeasonBySlug,
    getCategoryBySlug,
    getLevelByCategoryAndName,
    getChecklistItems,
    getCoursesByLevel,
    getArtifactsByLevel,
} from "@/lib/queries";
import type { LevelName } from "@/types";

const rubricCriterionMap: Record<string, "DESIGN" | "CREATE" | "INNOVATION" | "ITERATE"> = {
    "robot-design": "DESIGN",
    coding: "CREATE",
    innovation: "INNOVATION",
    "robot-game": "ITERATE",
};

const rubricTexts: Record<string, Record<string, string>> = {
    "robot-design": {
        beginner: "Робот жобаланды, негізгі тапсырмаларды орындай алады. Команда дизайнның негізгі шешімдерін түсіндіре алады.",
        intermediate: "Дизайн тестілеу негізінде жақсартылды. Инженерлік журналда процесс құжатталған.",
        advanced: "Нақты негіздемесі бар инновациялық дизайн. Команда инженерлік процесті терең түсінетінін көрсетеді.",
    },
    coding: {
        beginner: "Бағдарлама роботты миссияларды орындау үшін іске қосады. Код жүйелі және түсінікті.",
        intermediate: "Датчиктер мен шарттарды қолдану. Дәл қозғалыс үшін P-контроллер.",
        advanced: "PID-реттегіш, PyBricks-тегі модульдік код. Маршрутты оңтайландыру алгоритмдері.",
    },
    innovation: {
        beginner: "Мәселе анықталды, шешім ұсынылды. Презентация құрылымдалған.",
        intermediate: "Прототип нақты пайдаланушылармен сыналды. Әсер ету көрсеткіштері бар.",
        advanced: "Impact First: алғашқы 10 секундта цифрлық нәтиже. Масштабталатын шешім.",
    },
    "robot-game": {
        beginner: "Робот 3+ миссияны орындайды. Команда ережелер мен стратегияны біледі.",
        intermediate: "Миссиялардың ROI-анализі. Оңтайландырылған маршруттар. 150+ ұпай.",
        advanced: "300+ ұпай. Резервтік жоспарлары бар толық автономды стратегия.",
    },
};

export default async function LevelPage({
    params,
}: {
    params: Promise<{ locale: string; season: string; category: string; level: string }>;
}) {
    const { category, level, season, locale } = await params;

    const seasonData = await getSeasonBySlug("fll", season);
    const categoryData = seasonData
        ? await getCategoryBySlug(seasonData.id, category)
        : null;
    const levelData = categoryData
        ? await getLevelByCategoryAndName(categoryData.id, level)
        : null;

    const [checklist, courses, artifacts] = levelData
        ? await Promise.all([
            getChecklistItems(levelData.id),
            getCoursesByLevel(levelData.id),
            getArtifactsByLevel(levelData.id),
        ])
        : [[], [], []];

    return (
        <LevelPageContent
            category={category}
            level={level}
            season={season}
            levelData={levelData}
            categoryData={categoryData}
            checklist={checklist}
            courses={courses}
            artifacts={artifacts}
        />
    );
}

function LevelPageContent({
    category,
    level,
    season,
    levelData,
    categoryData,
    checklist,
    courses,
    artifacts,
}: {
    category: string;
    level: string;
    season: string;
    levelData: { id: string; name: string; color: string } | null;
    categoryData: { name: string } | null;
    checklist: { id: string; level_id: string; text: string; order: number }[];
    courses: { id: string; title: string; description: string | null; order: number }[];
    artifacts: { id: string; name: string; file_url: string; description: string | null }[];
}) {
    const t = useTranslations("level");
    const levelName = level as LevelName;
    const rubricLevel = level === "advanced" ? "EXCEEDS" as const : "ACCOMPLISHED" as const;
    const criterion = rubricCriterionMap[category] || "DESIGN";
    const rubricText = rubricTexts[category]?.[level] || "Бұл деңгей үшін бағалау критерийлері.";

    if (!levelData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
                <p className="text-[#6B7280]">Деңгей табылмады.</p>
            </div>
        );
    }

    const allLevels = ["beginner", "intermediate", "advanced"];
    const displayNames: Record<string, string> = {
        "beginner": "Бастауыш",
        "intermediate": "Орташа",
        "advanced": "Жетілдірілген"
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
            {/* Header */}
            <header className="bg-white px-6 py-6 border-b border-[#E5E7EB] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* LEFT */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <Link href={`/fll/${season}/${category}` as any} className="text-[#6B7280] hover:text-[#1A1A1A] transition-colors flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#F3F4F6]">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <div>
                            <h1 className="font-display text-2xl text-[#1A1A1A]">
                                {categoryData?.name || "Трек"}
                            </h1>
                            <p className="text-sm text-[#6B7280] mt-1">
                                {checklist.length} тапсырмасының 0 орындалды
                            </p>
                        </div>
                    </div>

                    {/* RIGHT (Level tabs) */}
                    <div className="flex bg-[#F3F4F6] p-1 rounded-xl w-full md:w-auto overflow-x-auto">
                        {allLevels.map(lvl => (
                            <Link
                                key={lvl}
                                href={`/fll/${season}/${category}/${lvl}` as any}
                                className={`px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${lvl === level
                                    ? "bg-white shadow-sm text-[#1A1A1A] font-medium"
                                    : "text-[#6B7280] hover:text-[#374151]"
                                    }`}
                            >
                                {displayNames[lvl]}
                            </Link>
                        ))}
                    </div>
                </div>
            </header>

            {/* Track Navigation Banner */}
            <div className="bg-white border-b border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold text-[#1A1A1A]">Трек: {categoryData?.name}</span>
                        <LevelBadge level={levelName} />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
                {/* Rubric */}
                <RubricCallout criterion={criterion} level={rubricLevel} text={rubricText} />

                {/* Course Grid */}
                <div>
                    <h2 className="text-2xl font-display text-[#1A1A1A] mb-6 flex items-center gap-2">
                        {t("courses")}
                    </h2>
                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course, idx) => (
                                <Link
                                    key={course.id}
                                    href={`/fll/${season}/${category}/${level}/${course.id}` as any}
                                    className="block bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
                                >
                                    {/* Image Placeholder */}
                                    <div className="bg-[#F3F4F6] aspect-video flex items-center justify-center relative overflow-hidden">
                                        <span className="text-4xl">📚</span>
                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <span className="text-xs font-bold text-[#2563EB] tracking-wider mb-2 block uppercase">
                                            УРОК {idx + 1}
                                        </span>
                                        <h3 className="text-lg font-semibold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#2563EB] transition-colors">
                                            {course.title}
                                        </h3>
                                        {course.description && (
                                            <p className="text-sm text-[#6B7280] line-clamp-2 h-10">
                                                {course.description}
                                            </p>
                                        )}

                                        <div className="border-t border-[#F3F4F6] my-4" />

                                        {/* Footer */}
                                        <div className="flex justify-between items-center text-xs font-medium text-[#6B7280]">
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                15 мин
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                                                3 задания
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#6B7280]">Курстар әзірге қосылмаған.</p>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checklist */}
                    {checklist.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-[#1A1A1A]">Тексеру тізімі</h2>
                            <ChecklistBlock items={checklist} levelId={levelData.id} />
                        </div>
                    )}

                    {/* Artifacts */}
                    {artifacts.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1A1A1A]">
                                <span className="text-lg">📎</span>
                                {t("artifacts")}
                            </h2>
                            <div className="space-y-3">
                                {artifacts.map((artifact) => (
                                    <ArtifactCard
                                        key={artifact.id}
                                        artifact={{ ...artifact, level_id: levelData.id, description: artifact.description || "" }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

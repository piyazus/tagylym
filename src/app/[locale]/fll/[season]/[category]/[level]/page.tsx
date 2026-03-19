import { useTranslations } from "next-intl";
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
    const { category, level, season } = await params;

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
            levelData={levelData}
            checklist={checklist}
            courses={courses}
            artifacts={artifacts}
        />
    );
}

function LevelPageContent({
    category,
    level,
    levelData,
    checklist,
    courses,
    artifacts,
}: {
    category: string;
    level: string;
    levelData: { id: string; name: string; color: string } | null;
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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-[#94a3b8]">Деңгей табылмады.</p>
            </div>
        );
    }

    // Replace the Russian level names from DB with Kazakh for display if needed
    const displayNames: Record<string, string> = {
        "beginner": "Бастауыш",
        "intermediate": "Орташа",
        "advanced": "Жетілдірілген"
    };
    const displayName = displayNames[level] || levelData.name;

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
            {/* Header */}
            <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className="w-2 h-12 rounded-full"
                        style={{ backgroundColor: levelData.color }}
                    />
                    <div>
                        <LevelBadge level={levelName} />
                        <h1 className="text-3xl font-black text-white mt-2">{displayName}</h1>
                    </div>
                </div>
                <p className="text-sm text-[#8B5CF6] font-medium">
                    Стандартты шешім (X) → Біздің тәсіл (Y), өйткені (Z)
                </p>
            </section>

            <div className="max-w-5xl mx-auto px-6 pb-24 space-y-8">
                {/* Rubric */}
                <RubricCallout criterion={criterion} level={rubricLevel} text={rubricText} />

                {/* Checklist */}
                {checklist.length > 0 && (
                    <ChecklistBlock items={checklist} levelId={levelData.id} />
                )}

                {/* Courses */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-lg">📚</span>
                        {t("courses")}
                    </h2>
                    {courses.length > 0 ? (
                        <div className="space-y-3">
                            {courses.map((course, idx) => (
                                <div key={course.id} className="bg-[#1e293b] rounded-xl border border-[#334155] p-5 flex items-center gap-4 group hover:border-[#8B5CF6]/50 transition-colors cursor-pointer">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                                        style={{ backgroundColor: `${levelData.color}30`, color: levelData.color }}
                                    >
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white group-hover:text-[#8B5CF6] transition-colors">
                                            {course.title}
                                        </h3>
                                        {course.description && (
                                            <p className="text-xs text-[#94a3b8] mt-0.5">{course.description}</p>
                                        )}
                                    </div>
                                    <span className="text-[#94a3b8] group-hover:text-[#8B5CF6] transition-colors">→</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[#94a3b8]">Курстар әзірге қосылмаған.</p>
                    )}
                </div>

                {/* Artifacts */}
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-lg">📎</span>
                        {t("artifacts")}
                    </h2>
                    {artifacts.length > 0 ? (
                        <div className="space-y-3">
                            {artifacts.map((artifact) => (
                                <ArtifactCard
                                    key={artifact.id}
                                    artifact={{ ...artifact, level_id: levelData.id, description: artifact.description || "" }}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-[#94a3b8]">{t("noArtifacts")}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

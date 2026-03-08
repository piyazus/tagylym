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
        beginner: "Робот спроектирован, может выполнять основные задачи. Команда может объяснить базовые решения дизайна.",
        intermediate: "Дизайн итерирован на основе тестирования. Документация процесса в инженерном журнале.",
        advanced: "Инновационный дизайн с чётким обоснованием. Команда демонстрирует глубокое понимание инженерного процесса.",
    },
    coding: {
        beginner: "Программа запускает робота для выполнения миссий. Код организован и понятен.",
        intermediate: "Использование датчиков и условий. P-контроллер для точного движения.",
        advanced: "PID-регулятор, модульный код на PyBricks. Алгоритмы оптимизации маршрутов.",
    },
    innovation: {
        beginner: "Проблема идентифицирована, решение предложено. Презентация структурирована.",
        intermediate: "Прототип протестирован с реальными пользователями. Есть цифры воздействия.",
        advanced: "Impact First: цифровой результат в первых 10 секундах. Масштабируемое решение.",
    },
    "robot-game": {
        beginner: "Робот выполняет 3+ миссии. Команда знает правила и стратегию.",
        intermediate: "ROI-анализ миссий. Оптимизированные маршруты. 150+ баллов.",
        advanced: "300+ баллов. Полная автономная стратегия с fallback-планами.",
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
    const rubricText = rubricTexts[category]?.[level] || "Критерии оценки для данного уровня.";

    if (!levelData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted">Level not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="max-w-5xl mx-auto px-6 pt-16 pb-8">
                <div className="flex items-center gap-4 mb-6">
                    <div
                        className="w-2 h-12 rounded-full"
                        style={{ backgroundColor: levelData.color }}
                    />
                    <div>
                        <LevelBadge level={levelName} />
                        <h1 className="text-3xl font-black text-white mt-2">{levelData.name}</h1>
                    </div>
                </div>
                <p className="text-sm text-accent font-medium">
                    Стандартное решение (X) → Наш подход (Y) потому что (Z)
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
                                <div key={course.id} className="glass-card p-5 flex items-center gap-4 group">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                                        style={{ backgroundColor: `${levelData.color}30`, color: levelData.color }}
                                    >
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                                            {course.title}
                                        </h3>
                                        {course.description && (
                                            <p className="text-xs text-muted mt-0.5">{course.description}</p>
                                        )}
                                    </div>
                                    <span className="text-muted group-hover:text-accent transition-colors">→</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted">Курсы пока не добавлены.</p>
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
                        <p className="text-sm text-muted">{t("noArtifacts")}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

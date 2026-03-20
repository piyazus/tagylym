"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getCourseThumbnail } from "@/lib/course-thumbnails";
import LevelBadge from "@/components/LevelBadge";
import ChecklistBlock from "@/components/ChecklistBlock";
import RubricCallout from "@/components/RubricCallout";
import ArtifactCard from "@/components/ArtifactCard";
import ProgressBar from "@/components/ProgressBar";
import type { LevelName, ChecklistItem } from "@/types";

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

const levelLearnContent: Record<
    string,
    Record<
        LevelName,
        {
            bullets: string[];
            leadsTo?: string;
        }
    >
> = {
    "robot-design": {
        beginner: {
            bullets: [
                "Rigid base construction for stability",
                "Symmetrical wheel placement for predictable movement",
                "Building your first passive attachment",
                "Using the Roles Journal every session",
                "Basic robot inspection checklist",
            ],
            leadsTo: "Leads to: Robot Design Intermediate",
        },
        intermediate: {
            bullets: [
                "Active attachments with moving parts",
                "Innovation formula: X → Y because Z",
                "Test Log documentation",
                "ROI analysis for missions",
            ],
            leadsTo: "Leads to: Robot Design Advanced",
        },
        advanced: {
            bullets: [
                "Multi-attachment systems",
                "Aligner mechanisms",
                "Pitstop procedure under 15 seconds",
                "Plan B strategy",
            ],
        },
    },
    innovation: {
        beginner: {
            bullets: [
                "Identifying 3–5 real problems",
                "Choosing one problem to solve",
                "Creating a Project Plan with named roles",
                "Research from 3+ sources",
            ],
            leadsTo: "Leads to: Innovation Project Intermediate",
        },
        intermediate: {
            bullets: [
                "Building an Iteration Log",
                "Collecting feedback from 2+ sources",
                "Creating numeric before/after impact data",
                "Writing an impact statement with numbers",
            ],
            leadsTo: "Leads to: Innovation Project Advanced",
        },
        advanced: {
            bullets: [
                "Running 3 Mock Judging sessions",
                "\"Impact First\" pitch structure",
                "Presenting to partners with real numbers",
                "Energy scale scoring ≥ 3",
            ],
        },
    },
    coding: {
        beginner: {
            bullets: [
                "Error measurement in degrees vs seconds",
                "Setting anchor points on the field",
                "Code Log documentation",
                "Building a hypothesis table",
            ],
            leadsTo: "Leads to: Coding Intermediate",
        },
        intermediate: {
            bullets: [
                "P-controller: motor power = error × Kp",
                "Bisection method for finding optimal Kp",
                "Custom block naming conventions",
                "Route bisection debugging",
            ],
            leadsTo: "Leads to: Coding Advanced",
        },
        advanced: {
            bullets: [
                "PID controller (P + I + D components)",
                "PyBricks Python programming",
                "Hub menu for match-day selection",
                "Explaining code to judges",
            ],
        },
    },
    "robot-game": {
        beginner: {
            bullets: [
                "ROI formula: Points ÷ Time",
                "Priority: >0.6 do it | 0.4–0.6 consider | <0.4 skip",
                "Dividing the field into zones",
                "Building Route 1 (priority missions)",
            ],
            leadsTo: "Leads to: Robot Game Intermediate",
        },
        intermediate: {
            bullets: [
                "Full ROI table for all missions",
                "Pitstop system: Robot Captain, Code Lead, Pitstoppers",
                "Attachment swap under 15 seconds",
                "Route 2 (secondary missions)",
            ],
            leadsTo: "Leads to: Robot Game Advanced",
        },
        advanced: {
            bullets: [
                "Plan B: always loaded, handles attachment failure",
                "Multi-mission runs",
                "Anti-crisis protocols",
                "Saving 30–40% of score with Plan B",
            ],
        },
    },
};

export default function LevelPageContent({
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
    checklist: ChecklistItem[];
    courses: { id: string; title: string; description: string | null; order: number }[];
    artifacts: { id: string; name: string; file_url: string; description: string | null }[];
}) {
    const tCommon = useTranslations("common");
    const tCourses = useTranslations("courses");
    const tNav = useTranslations("nav");
    const tErrors = useTranslations("errors");
    const tLesson = useTranslations("lesson");
    const tQuiz = useTranslations("quiz");
    const tChecklist = useTranslations("checklist");
    const tFll = useTranslations("fll");
    const levelName = level as LevelName;
    const rubricLevel = level === "advanced" ? "EXCEEDS" as const : "ACCOMPLISHED" as const;
    const criterion = rubricCriterionMap[category] || "DESIGN";
    const rubricText = rubricTexts[category]?.[level] || "Бұл деңгей үшін бағалау критерийлері.";
    const learn = levelLearnContent[category]?.[levelName];
    const timeEstimate = `~4 ${tCommon("lessons")} · 2 ${tCommon("week")}`;

    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [courseLessonState, setCourseLessonState] = useState<
        Record<
            string,
            {
                total: number;
                completed: number;
                firstIsFree: boolean;
            }
        >
    >({});

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data } = await supabase
                    .from("checklist_progress")
                    .select("item_id, checked")
                    .eq("user_id", user.id);

                if (data) {
                    const progress: Record<string, boolean> = {};
                    data.forEach((row) => {
                        progress[row.item_id] = row.checked;
                    });
                    setCheckedItems(progress);
                }
            } catch {
                // Not logged in or error
            }
        };

        loadProgress();
    }, [checklist]);

    useEffect(() => {
        const loadCourseProgress = async () => {
            try {
                if (courses.length === 0) {
                    setCourseLessonState({});
                    return;
                }

                const courseIds = courses.map((c) => c.id);

                const { data: lessonsData, error: lessonsErr } = await supabase
                    .from("lessons")
                    // Include order so we can detect lesson #1 for "Free"
                    .select('id, course_id, is_free, "order"')
                    .in("course_id", courseIds);

                if (lessonsErr || !lessonsData) return;

                const byCourse: Record<string, typeof lessonsData> = {};
                for (const lesson of lessonsData) {
                    if (!byCourse[lesson.course_id]) byCourse[lesson.course_id] = [];
                    byCourse[lesson.course_id].push(lesson);
                }

                for (const courseId of Object.keys(byCourse)) {
                    byCourse[courseId].sort((a: any, b: any) => Number(a.order) - Number(b.order));
                }

                const allLessonIds = lessonsData.map((l) => l.id);
                const completedSet = new Set<string>();

                const { data: { user } } = await supabase.auth.getUser();
                if (user && allLessonIds.length > 0) {
                    const { data: progressRows } = await supabase
                        .from("progress")
                        .select("lesson_id")
                        .eq("user_id", user.id)
                        .in("lesson_id", allLessonIds);

                    (progressRows ?? []).forEach((r) => completedSet.add(r.lesson_id));
                }

                const next: typeof courseLessonState = {};
                for (const course of courses) {
                    const lessons = byCourse[course.id] ?? [];
                    const total = lessons.length;
                    const firstIsFree = total > 0 ? Boolean((lessons[0] as any)?.is_free) : false;
                    const completed = lessons.reduce(
                        (acc, l: any) => acc + (completedSet.has(l.id) ? 1 : 0),
                        0
                    );
                    next[course.id] = { total, completed, firstIsFree };
                }

                setCourseLessonState(next);
            } catch {
                // Non-fatal: if lessons/progress are missing, course cards still render.
            }
        };

        loadCourseProgress();
    }, [courses]);

    const handleToggle = async (itemId: string) => {
        const newChecked = !checkedItems[itemId];
        setCheckedItems((prev) => ({ ...prev, [itemId]: newChecked }));

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            await supabase.from("checklist_progress").upsert({
                user_id: user.id,
                item_id: itemId,
                checked: newChecked,
            }, { onConflict: "user_id,item_id" });
        } catch {
            // Persist locally
        }
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    if (!levelData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
                <p className="text-[#6B7280]">{tErrors("not_found")}</p>
            </div>
        );
    }

    const allLevels = ["beginner", "intermediate", "advanced"];
    const displayNames: Record<string, string> = {
        "beginner": tCourses("beginner"),
        "intermediate": tCourses("intermediate"),
        "advanced": tCourses("advanced")
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
                            <h1 className="text-2xl font-bold text-[#1A1A1A]">
                                {tFll(`categories.${category}`)}
                            </h1>
                            <p className="text-sm text-[#6B7280] mt-1">
                                {completedCount} / {checklist.length} {tChecklist("progress")}
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
                        <span className="text-lg font-semibold text-[#1A1A1A]">{tQuiz("filter_track")}: {tFll(`categories.${category}`)}</span>
                        <LevelBadge level={levelName} />
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">
                {/* Rubric */}
                <RubricCallout criterion={criterion} level={rubricLevel} text={rubricText} />

                {/* What you'll learn */}
                {learn && (
                    <section className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
                        <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">{tFll("level_learn_heading")}</h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-[#374151]">
                            {learn.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                            ))}
                        </ul>
                        <div className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                            {timeEstimate}
                            {learn.leadsTo ? <div className="mt-2">{learn.leadsTo}</div> : null}
                        </div>
                    </section>
                )}

                {/* Course Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
                        {tCourses("page_title")}
                    </h2>
                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {courses.map((course) => {
                                const meta = courseLessonState[course.id];
                                const total = meta?.total ?? 0;
                                const completed = meta?.completed ?? 0;
                                const firstIsFree = meta?.firstIsFree ?? false;

                                const ctaLabel =
                                    total === 0
                                        ? tCourses("start")
                                        : completed === 0
                                            ? tCourses("start")
                                            : completed >= total
                                                ? tLesson("complete")
                                                : tCourses("continue");
                                const ctaDisabled = total === 0;

                                return (
                                    <div
                                        key={course.id}
                                        className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
                                    >
                                        {/* Course Thumbnail */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image
                                                src={getCourseThumbnail(category)}
                                                alt={course.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            {firstIsFree && total > 0 ? (
                                                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                                                    {tLesson("free_lesson")}
                                                </span>
                                            ) : total > 0 ? (
                                                <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                                                    {tLesson("locked")}
                                                </span>
                                            ) : null}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex flex-col flex-1">
                                            <h3 className="text-lg font-semibold text-[#1A1A1A] leading-tight mb-3 group-hover:text-[#2563EB] transition-colors">
                                                {course.title}
                                            </h3>

                                            {course.description && (
                                                <p className="text-sm text-[#6B7280] line-clamp-2 h-10">
                                                    {course.description}
                                                </p>
                                            )}

                                            <div className="mt-4">
                                                <div className="flex items-center justify-between gap-3 text-xs font-medium text-[#6B7280] mb-2">
                                                    <span>
                                                        {total > 0 ? `${total} ${tCommon("lessons")}` : "—"}
                                                    </span>
                                                    <span className="text-[#2563EB]">
                                                        {`~4 ${tCommon("lessons")} · 2 ${tCommon("week")}`}
                                                    </span>
                                                </div>

                                                <ProgressBar completed={completed} total={total} />
                                            </div>

                                            <div className="mt-auto pt-4">
                                                <button
                                                    type="button"
                                                    disabled={ctaDisabled}
                                                    className={`w-full text-center px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                                                        ctaDisabled
                                                            ? "bg-[#E5E7EB] text-[#6B7280] cursor-not-allowed"
                                                            : "bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                                                    }`}
                                                >
                                                    {ctaLabel}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl border-2 border-dashed border-[#E5E7EB] p-6 opacity-60">
                                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">
                                    {tCommon("coming_soon.badge")}
                                </h3>
                                <p className="text-sm text-[#6B7280] leading-relaxed">
                                    {tCourses("coming_soon_course_desc")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Checklist */}
                    {checklist.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-[#1A1A1A]">{tChecklist("title")}</h2>
                            <ChecklistBlock 
                                items={checklist} 
                                levelId={levelData.id} 
                                checkedItems={checkedItems}
                                onToggle={handleToggle}
                            />
                        </div>
                    )}

                    {/* Artifacts */}
                    {artifacts.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#1A1A1A]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                                {tNav("resources")}
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

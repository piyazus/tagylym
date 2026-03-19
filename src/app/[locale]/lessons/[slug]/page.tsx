"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { getLessonBySlug } from "@/lib/sanity";
import { supabase } from "@/lib/supabase";
import { PortableText } from "@portabletext/react";
import VideoPlayer from "@/components/VideoPlayer";
import QuizCard from "@/components/QuizCard";
import TipBox from "@/components/TipBox";
import RubricCallout from "@/components/RubricCallout";
import type { Quiz, RubricCriterion, RubricLevel } from "@/types";

interface SanityLesson {
    title: string;
    slug: string;
    courseSlug: string;
    order: number;
    isFree: boolean;
    videoUrl: string | null;
    content: any[] | null;
    tip: string | null;
    rubricCriterion: string | null;
    rubricLevel: string | null;
}

export default function LessonPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(null);

    useEffect(() => {
        params.then((p) => setResolvedParams(p));
    }, [params]);

    if (!resolvedParams) return <LessonLoading />;
    return <LessonContent slug={resolvedParams.slug} />;
}

function LessonLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-[#f1f5f9]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-muted text-sm">Загрузка урока...</p>
            </div>
        </div>
    );
}

function LessonContent({ slug }: { slug: string }) {
    const t = useTranslations("lesson");
    const [lesson, setLesson] = useState<SanityLesson | null>(null);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [siblings, setSiblings] = useState<{ slug: string; title: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchLesson();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUserId(user?.id ?? null);
        });
    }, [slug]);

    const fetchLesson = async () => {
        setLoading(true);
        setNotFound(false);

        try {
            // Fetch from Sanity
            const data = await getLessonBySlug(slug);

            if (!data) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            setLesson(data);

            // Fetch sibling lessons in same course from Sanity
            const { getLessonsByCourseSlug } = await import("@/lib/sanity");
            const sibs = await getLessonsByCourseSlug(data.courseSlug);
            if (sibs) setSiblings(sibs);

            // Fetch quizzes linked to this lesson from Supabase (by lesson slug match)
            const { data: quizData } = await supabase
                .from("quizzes")
                .select("*")
                .eq("lesson_id", slug);
            if (quizData) setQuizzes(quizData);
        } catch {
            setNotFound(true);
        }

        setLoading(false);
    };

    const handleVideoEnd = async () => {
        if (!userId || !lesson) return;
        // Track completion in Supabase progress table
        await supabase.from("progress").upsert({
            user_id: userId,
            lesson_id: lesson.slug,
            completed_at: new Date().toISOString(),
        });
    };

    if (loading) return <LessonLoading />;

    if (notFound || !lesson) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-[#f1f5f9]">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mx-auto mb-6 text-4xl">
                        📝
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-3">Контент жақында шығады</h1>
                    <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">
                        Бұл сабақ әлі әзірленуде. Біз бейне, мәтін және тапсырмаларды жақын арада қосамыз.
                    </p>
                    <Link
                        href={"/fll" as "/"}
                        className="inline-flex px-5 py-2.5 rounded-lg bg-[#3B82F6] text-white font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                        ← FLL-ге қайту
                    </Link>
                </div>
            </div>
        );
    }

    // Find prev/next in siblings
    const currentIdx = siblings.findIndex((s) => s.slug === slug);
    const prevLesson = currentIdx > 0 ? siblings[currentIdx - 1] : null;
    const nextLesson = currentIdx < siblings.length - 1 ? siblings[currentIdx + 1] : null;

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9]">
            <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
                {/* Title */}
                <h1 className="text-3xl font-black text-white mb-6">{lesson.title}</h1>

                {/* Video */}
                {lesson.videoUrl && (
                    <div className="mb-8">
                        <VideoPlayer
                            videoUrl={lesson.videoUrl}
                            lessonId={lesson.slug}
                            onComplete={handleVideoEnd}
                        />
                    </div>
                )}

                {/* Content (Portable Text) */}
                {lesson.content && lesson.content.length > 0 && (
                    <div className="prose-custom mb-8 text-[#f1f5f9]">
                        <PortableText value={lesson.content} />
                    </div>
                )}

                {/* Tip */}
                {lesson.tip && <TipBox text={lesson.tip} />}

                {/* Rubric */}
                {lesson.rubricCriterion && lesson.rubricLevel && (
                    <div className="mt-8">
                        <RubricCallout
                            criterion={lesson.rubricCriterion as RubricCriterion}
                            level={lesson.rubricLevel as RubricLevel}
                            text={`Критерий: ${lesson.rubricCriterion} — Деңгей: ${lesson.rubricLevel}`}
                        />
                    </div>
                )}

                {/* Quizzes */}
                {quizzes.length > 0 && (
                    <div className="mt-8 space-y-6">
                        <h2 className="text-xl font-bold text-white">{t("quiz")}</h2>
                        {quizzes.map((q) => (
                            <QuizCard key={q.id} quiz={q} />
                        ))}
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-[#334155] pt-8">
                    {prevLesson ? (
                        <Link
                            href={`/lessons/${prevLesson.slug}` as "/"}
                            className="text-sm text-[#3B82F6] hover:text-white transition-colors flex items-center gap-1"
                        >
                            {t("previous")}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextLesson ? (
                        <Link
                            href={`/lessons/${nextLesson.slug}` as "/"}
                            className="text-sm text-[#3B82F6] hover:text-white transition-colors flex items-center gap-1"
                        >
                            {t("next")}
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        </div>
    );
}

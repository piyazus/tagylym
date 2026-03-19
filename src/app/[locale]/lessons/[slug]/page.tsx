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
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] text-[#1A1A1A]">
            <div className="text-center">
                <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-[#6B7280] text-sm">Урок жүктелуде...</p>
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
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] text-[#1A1A1A]">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center mx-auto mb-6 text-4xl">
                        📝
                    </div>
                    <h1 className="text-2xl font-bold font-display text-[#1A1A1A] mb-3">Контент жақында шығады</h1>
                    <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
                        Бұл сабақ әлі әзірленуде. Біз бейне, мәтін және тапсырмаларды жақын арада қосамыз.
                    </p>
                    <Link
                        href={"/fll" as "/"}
                        className="inline-flex px-6 py-2.5 rounded-lg bg-[#2563EB] text-white font-medium text-sm hover:bg-[#1D4ED8] transition-colors"
                    >
                        ← Курстарға қайту
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
        <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
            <div className="max-w-3xl mx-auto py-10 px-6">
                {/* Title */}
                <h1 className="font-display text-3xl font-bold text-[#1A1A1A] mb-6">{lesson.title}</h1>

                {/* Video */}
                {lesson.videoUrl && (
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <VideoPlayer
                            videoUrl={lesson.videoUrl}
                            lessonId={lesson.slug}
                            onComplete={handleVideoEnd}
                        />
                    </div>
                )}

                {/* Content (Portable Text) */}
                {lesson.content && lesson.content.length > 0 && (
                    <div className="prose prose-lg max-w-none mb-8 text-base text-[#374151] leading-relaxed prose-headings:font-semibold prose-headings:text-[#1A1A1A] prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4">
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
                    <div className="mt-12 mb-6">
                        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">Проверка знаний</h2>
                        <div className="space-y-6">
                            {quizzes.map((q) => (
                                <QuizCard key={q.id} quiz={q} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="mt-12 flex items-center justify-between border-t border-[#E5E7EB] pt-8">
                    {prevLesson ? (
                        <Link
                            href={`/lessons/${prevLesson.slug}` as "/"}
                            className="bg-white border border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] transition-colors rounded-lg px-6 py-2.5 text-sm font-medium flex items-center gap-2 shadow-sm"
                        >
                            &larr; {t("previous")}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {nextLesson ? (
                        <Link
                            href={`/lessons/${nextLesson.slug}` as "/"}
                            className="bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors rounded-lg px-6 py-2.5 text-sm font-medium flex items-center gap-2 shadow-sm"
                        >
                            {t("next")} &rarr;
                        </Link>
                    ) : (
                        <span />
                    )}
                </div>
            </div>
        </div>
    );
}

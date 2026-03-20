"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import LevelBadge from "./LevelBadge";
import { getCourseThumbnail } from "@/lib/course-thumbnails";
import { useTranslations } from "next-intl";
import type { EnrichedCourse } from "@/lib/queries";

interface CourseCardProps {
    course: EnrichedCourse;
    seasonSlug: string;
}

export default function CourseCard({ course, seasonSlug }: CourseCardProps) {
    const tCourses = useTranslations("courses");

    return (
        <Link
            href={`/fll/${seasonSlug}/${course.categorySlug}/${course.levelSlug}/${course.id}` as "/"}
            className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] cursor-pointer transition-shadow duration-150 hover:shadow-md group flex flex-col h-full"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden bg-[#1E293B]">
                <Image
                    src={getCourseThumbnail(course.categorySlug)}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <span className="absolute top-2 right-2 bg-black/65 text-white text-[10px] font-medium px-[7px] py-[2px] rounded">
                    {tCourses("preview")}
                </span>
            </div>

            {/* Body */}
            <div className="px-3.5 pt-3 pb-3.5 flex flex-col flex-1">
                <p className="text-[11px] text-slate-500 mb-1">
                    {tCourses("free_label")}
                </p>
                <h3 className="text-sm font-semibold text-[#1A1A1A] leading-[1.3] line-clamp-2 min-h-[2.4rem] mb-1.5">
                    FLL CHALLENGE: {course.categoryName.toUpperCase()}
                </h3>
                {course.description && (
                    <p className="text-[12px] text-slate-700 leading-[1.4] line-clamp-3 mb-2.5 flex-1">
                        {course.description}
                    </p>
                )}

                <div className="mt-auto">
                    {/* Level badge */}
                    <LevelBadge level={course.levelSlug} />

                    {/* Duration */}
                    <p className="text-[11px] text-slate-500 mt-0.5">
                        {tCourses("week_range")}
                    </p>
                </div>
            </div>
        </Link>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import type { EnrichedCourse } from "@/lib/queries";

interface CourseCardProps {
    course: EnrichedCourse;
    seasonSlug: string;
}

export default function CourseCard({ course, seasonSlug }: CourseCardProps) {
    const t = useTranslations("courses");

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="glass-card group relative overflow-hidden flex flex-col h-full bg-card border border-border hover:border-accent/40 transition-all duration-300 shadow-md hover:shadow-xl"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="p-6 flex-grow space-y-4">
                <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                        {course.categoryName || "FLL"}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none">
                        {course.levelName || t("beginner")}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t("free_label")}
                    </div>
                </div>
            </div>

            <div className="p-6 pt-0 mt-auto">
                <Link
                    href={`/fll/${seasonSlug}/${course.categorySlug}/${course.levelSlug}` as any}
                    className="flex items-center justify-center w-full py-3 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] btn-primary"
                >
                    {t("start")}
                </Link>
            </div>
        </motion.div>
    );
}

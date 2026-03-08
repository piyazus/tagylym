import type { LevelBadgeProps } from "@/types";
import { useTranslations } from "next-intl";

const levelConfig = {
    beginner: {
        label: "Beginner",
        labelRu: "Начальный",
        className: "bg-beginner/15 text-beginner border-beginner/30",
    },
    intermediate: {
        label: "Intermediate",
        labelRu: "Средний",
        className: "bg-intermediate/15 text-intermediate border-intermediate/30",
    },
    advanced: {
        label: "Advanced",
        labelRu: "Продвинутый",
        className: "bg-advanced/15 text-advanced border-advanced/30",
    },
};

export default function LevelBadge({ level }: LevelBadgeProps) {
    const config = levelConfig[level];
    const t = useTranslations("common");

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className} transition-all hover:scale-105`}
        >
            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${level === "beginner" ? "bg-beginner" :
                level === "intermediate" ? "bg-intermediate" : "bg-advanced"
                }`} />
            {t(level)}
        </span>
    );
}

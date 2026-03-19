import type { LevelBadgeProps } from "@/types";
import { useTranslations } from "next-intl";

export default function LevelBadge({ level }: LevelBadgeProps) {
    const config: Record<string, string> = {
        beginner: "text-[#2563EB]",
        intermediate: "text-[#D97706]",
        advanced: "text-[#16A34A]",
    };

    const t = useTranslations("common");
    const colorClass = config[level] || config.beginner;

    return (
        <span className={`inline-flex items-center gap-1 text-xs font-medium ${colorClass}`}>
            ★ {t(level)}
        </span>
    );
}

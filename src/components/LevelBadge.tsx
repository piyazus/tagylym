import type { LevelName } from "@/types";

const colors: Record<string, string> = {
    beginner: '#2563EB',
    intermediate: '#D97706',
    advanced: '#16A34A',
};

const labels: Record<string, Record<string, string>> = {
    beginner: { kz: 'Бастауыш', ru: 'Beginner', en: 'Beginner' },
    intermediate: { kz: 'Орташа', ru: 'Intermediate', en: 'Intermediate' },
    advanced: { kz: 'Жетілдірілген', ru: 'Advanced', en: 'Advanced' },
};

export default function LevelBadge({ level }: { level: LevelName | string }) {
    const color = colors[level] || colors.beginner;
    const label = labels[level]?.kz || level;

    return (
        <span
            style={{ color }}
            className="flex items-center gap-0.5 text-xs font-medium"
        >
            <span>★</span>
            <span>{label}</span>
        </span>
    );
}

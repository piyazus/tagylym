import type { RubricCalloutProps } from "@/types";

const criterionColors: Record<string, string> = {
    DESIGN: "border-beginner bg-beginner/10 text-beginner",
    CREATE: "border-intermediate bg-intermediate/10 text-intermediate",
    ITERATE: "border-advanced bg-advanced/10 text-advanced",
    COMMUNICATE: "border-accent bg-accent/10 text-accent",
    IMPACT: "border-tip bg-tip/10 text-tip",
    INNOVATION: "border-yellow-500 bg-yellow-500/10 text-yellow-400",
    FUN: "border-pink-500 bg-pink-500/10 text-pink-400",
};

const levelIcons: Record<string, string> = {
    ACCOMPLISHED: "✅",
    EXCEEDS: "⭐",
};

export default function RubricCallout({
    criterion,
    level,
    text,
}: RubricCalloutProps) {
    const colorClass = criterionColors[criterion] || criterionColors.DESIGN;

    return (
        <div
            className={`border-l-4 rounded-r-lg p-4 my-4 ${colorClass} transition-all hover:shadow-lg`}
        >
            <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{levelIcons[level]}</span>
                <span className="font-bold text-sm uppercase tracking-wider">
                    {criterion}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 font-medium">
                    {level}
                </span>
            </div>
            <p className="text-sm leading-relaxed opacity-90">{text}</p>
        </div>
    );
}

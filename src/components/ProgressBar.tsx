import type { ProgressBarProps } from "@/types";

export default function ProgressBar({ completed, total }: ProgressBarProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted font-medium">
                    {completed} / {total}
                </span>
                <span className="text-xs font-semibold text-accent">{percentage}%</span>
            </div>
            <div className="w-full h-2.5 bg-surface-lighter rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-beginner via-accent to-advanced transition-all duration-700 ease-out relative"
                    style={{ width: `${percentage}%` }}
                >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            </div>
        </div>
    );
}

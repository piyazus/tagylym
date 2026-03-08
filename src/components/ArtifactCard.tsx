import { useTranslations } from "next-intl";
import type { ArtifactCardProps } from "@/types";

export default function ArtifactCard({ artifact }: ArtifactCardProps) {
    const t = useTranslations("common");

    return (
        <div className="glass-card p-4 flex items-center gap-4 group">
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 group-hover:bg-accent/25 transition-colors">
                <span className="text-xl">📄</span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-white truncate">
                    {artifact.name}
                </h4>
                <p className="text-xs text-muted mt-0.5 leading-relaxed line-clamp-2">
                    {artifact.description}
                </p>
            </div>

            {/* Download */}
            <a
                href={artifact.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2 rounded-lg bg-accent/15 text-accent text-xs font-medium border border-accent/20 hover:bg-accent/25 hover:border-accent/40 transition-all"
            >
                {t("download")}
            </a>
        </div>
    );
}

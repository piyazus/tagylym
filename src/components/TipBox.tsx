import type { TipBoxProps } from "@/types";
import { useTranslations } from "next-intl";

export default function TipBox({ text }: TipBoxProps) {
    const t = useTranslations("lesson");
    return (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-tip-bg/50 border border-tip/20 my-4 transition-all hover:border-tip/40 hover:shadow-lg hover:shadow-tip/5">
            <span className="text-2xl mt-0.5 animate-float">💡</span>
            <div>
                <span className="font-bold text-tip text-xs uppercase tracking-wider block mb-1">
                    {t("tips")}
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">{text}</p>
            </div>
        </div>
    );
}

import type { TipBoxProps } from "@/types";
import { useTranslations } from "next-intl";

export default function TipBox({ text }: TipBoxProps) {
    const t = useTranslations("lesson");
    return (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-5 my-6">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">💡</span>
                <span className="font-mono text-xs uppercase tracking-wide text-[#92400E]">
                    {t("tips")}
                </span>
            </div>
            <p className="text-sm text-[#78350F] leading-relaxed">{text}</p>
        </div>
    );
}

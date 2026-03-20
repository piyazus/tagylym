"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface ComingSoonCardProps {
    competition: "ftc" | "fgc";
}

export default function ComingSoonCard({ competition }: ComingSoonCardProps) {
    const t = useTranslations("coming_soon");
    const tNav = useTranslations("nav");

    const images = {
        ftc: "/images/robot-ftc.png",
        fgc: "/images/robot-fgc.png"
    };

    const colors = {
        ftc: "from-orange-500/20 to-orange-600/20",
        fgc: "from-purple-500/20 to-purple-600/20"
    };

    const accentColors = {
        ftc: "text-orange-600 bg-orange-50 border-orange-200",
        fgc: "text-purple-600 bg-purple-50 border-purple-200"
    };

    return (
        <div className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-sm flex flex-col h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {/* Thumbnail Placeholder */}
            <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${colors[competition]} flex items-center justify-center p-8`}>
                <Image
                    src={images[competition]}
                    alt={competition.toUpperCase()}
                    width={120}
                    height={120}
                    className="object-contain drop-shadow-lg"
                />
                <span className="absolute top-2 right-2 bg-slate-800/80 text-white text-[10px] font-bold px-[7px] py-[2px] rounded uppercase tracking-wider">
                    {t("badge")}
                </span>
            </div>

            {/* Body */}
            <div className="px-3.5 pt-3 pb-3.5 flex flex-col flex-1">
                <p className="text-[11px] text-slate-500 mb-1">
                    {tNav(`${competition}_soon`)}
                </p>
                <h3 className="text-sm font-semibold text-[#1A1A1A] leading-[1.3] line-clamp-2 min-h-[2.4rem] mb-1.5 uppercase">
                    {competition === "ftc" ? "FIRST Tech Challenge" : "FIRST Global Challenge"}
                </h3>
                <p className="text-[12px] text-slate-600 leading-[1.4] line-clamp-3 mb-2.5 flex-1">
                    {t(`${competition}_desc`)}
                </p>

                <div className="mt-auto">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${accentColors[competition]}`}>
                        Coming Late 2025
                    </span>
                </div>
            </div>
        </div>
    );
}

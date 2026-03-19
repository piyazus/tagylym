"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FGCPage() {
    const t = useTranslations("coming_soon");
    const tAuth = useTranslations("auth");
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6 py-20">
                <div className="w-24 h-24 rounded-2xl bg-[#1e293b] border border-[#334155] flex items-center justify-center mx-auto mb-8 text-5xl shadow-lg shadow-black/20">
                    🌍
                </div>
                <h1 className="text-4xl font-black text-white mb-3 tracking-wide">
                    FIRST Global Challenge
                </h1>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-sm text-[#22C55E] font-semibold tracking-wider mb-6">
                    {t("badge")}
                </div>
                <p className="text-[#94a3b8] leading-relaxed mb-8">
                    {t("fgc_desc")}
                </p>

                {submitted ? (
                    <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] p-4 rounded-xl font-medium animate-fade-in-up">
                        🎉 {t("success")}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                        <input
                            type="email"
                            required
                            placeholder={tAuth("email_placeholder")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 bg-[#1e293b] text-white placeholder:text-[#64748b] border border-[#334155] rounded-xl px-4 py-3 focus:outline-none focus:border-[#22C55E] transition-colors"
                        />
                        <button
                            type="submit"
                            className="bg-[#22C55E] hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-green-500/20 whitespace-nowrap"
                        >
                            {t("subscribe")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LandingPage({
    params,
}: {
    params: { locale: "kk" | "en" };
}) {
    const tNav = useTranslations("nav");
    const locale = params.locale;

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] overflow-hidden">
            {/* 1. NAV */}
            <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="sticky top-0 z-50 backdrop-blur-sm bg-[rgba(250,250,250,0.95)] border-b border-[#E2E8F0] h-14"
            >
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    {/* Left: wordmark */}
                    <Link href={"/" + locale} className="flex items-center">
                        <span
                            className="font-bold"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: 18,
                                color: "#0F172A",
                                lineHeight: "1.1",
                                letterSpacing: "-0.01em",
                            }}
                        >
                            Tagylym
                        </span>
                    </Link>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                        {/* Robotics icon from existing codebase */}
                        <Image
                            src="/images/logo-first.png"
                            alt="FIRST"
                            width={28}
                            height={28}
                            className="w-7 h-7"
                        />

                        {/* Language toggle (KK + EN only) */}
                        <div className="flex items-center gap-2 text-sm">
                            <Link
                                href="/kk"
                                className={`px-4 py-1.5 rounded-lg font-medium ${
                                    locale === "kk"
                                        ? "bg-[#0052FF] text-white"
                                        : "bg-transparent text-[#64748B]"
                                }`}
                                aria-current={locale === "kk" ? "page" : undefined}
                            >
                                KK
                            </Link>
                            <span className="w-px h-5 bg-[#E2E8F0]" />
                            <Link
                                href="/en"
                                className={`px-4 py-1.5 rounded-lg font-medium ${
                                    locale === "en"
                                        ? "bg-[#0052FF] text-white"
                                        : "bg-transparent text-[#64748B]"
                                }`}
                                aria-current={locale === "en" ? "page" : undefined}
                            >
                                EN
                            </Link>
                        </div>

                        {/* Login */}
                        <Link
                            href="/auth/login"
                            className="bg-[#7C3AED] text-white rounded-lg px-4 py-1.5 text-sm font-semibold"
                        >
                            {tNav("login")}
                        </Link>
                    </div>
                </div>
            </motion.nav>

            {/* Placeholders for the remaining sections (filled in next commits) */}
            <div id="hero" />
            <div id="stats" />
            <div id="curriculum" />
            <div id="how-it-works" />
            <div id="cta" />
            <div id="footer" />
        </div>
    );
}


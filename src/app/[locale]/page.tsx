"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function LandingPage({
    params,
}: {
    params: { locale: string };
}) {
    const tNav = useTranslations("nav");
    const locale = params.locale === "en" ? "en" : "kk";
    const t = useTranslations("landing");

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

            {/* 2. HERO */}
            <Hero locale={locale} t={t} />

            {/* 3. STATS BAR */}
            <StatsBar locale={locale} t={t} />
            <div id="curriculum" />
            <div id="how-it-works" />
            <div id="cta" />
            <div id="footer" />
        </div>
    );
}

function Hero({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const reducedMotion = useReducedMotion();

    const heroEase = [0.16, 1, 0.3, 1] as const;

    const heroContainer = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    };

    const heroChild = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: heroEase },
        },
    };

    const heroImage = {
        hidden: { opacity: 0, scale: 0.96 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, delay: 0.3, ease: heroEase },
        },
    };

    return (
        <section className="w-full">
            <div className="max-w-6xl mx-auto px-6" style={{ minHeight: "calc(100vh - 64px)" }}>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
                    initial="hidden"
                    animate="visible"
                    variants={heroContainer}
                >
                    {/* Left column */}
                    <motion.div variants={heroChild} className="relative z-10">
                        <motion.div
                            variants={heroChild}
                            className="inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-4 py-2"
                        >
                            <motion.span
                                animate={
                                    reducedMotion
                                        ? { scale: 1, opacity: 1 }
                                        : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                                }
                                transition={
                                    reducedMotion
                                        ? undefined
                                        : { duration: 2, repeat: Infinity, ease: "easeOut" }
                                }
                                className="h-2 w-2 rounded-full bg-[#0052FF]"
                            />
                            <span
                                className="font-mono text-xs uppercase tracking-[0.15em] text-[#0F172A] font-semibold"
                            >
                                {t("hero_tracks")}
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={heroChild}
                            className="mt-6 font-bold leading-[1.05]"
                            style={{
                                fontFamily: "'Syne', sans-serif",
                            }}
                        >
                            {locale === "kk" ? (
                                <>
                                    <span className="text-[42px] md:text-[72px]">
                                        {t("hero_headline_prefix_kk")}&nbsp;
                                    </span>
                                    <span className="relative inline-block">
                                        <span
                                            className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] bg-clip-text text-transparent"
                                            style={{
                                                fontFamily: "'Syne', sans-serif",
                                            }}
                                        >
                                            {t("hero_headline_gradient_kk")}
                                        </span>
                                        <span
                                            className="absolute -bottom-3 left-0 right-0"
                                            style={{
                                                height: 10,
                                                borderRadius: 2,
                                                background:
                                                    "linear-gradient(135deg, rgba(0,82,255,0.15), rgba(77,124,255,0.10))",
                                            }}
                                        />
                                    </span>
                                    <span className="text-[42px] md:text-[72px]">&nbsp;{t("hero_headline_suffix_kk")}</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-[42px] md:text-[72px]">{t("hero_headline_prefix_en")}&nbsp;</span>
                                    <span className="relative inline-block">
                                        <span className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] bg-clip-text text-transparent">
                                            {t("hero_headline_gradient_en")}
                                        </span>
                                        <span
                                            className="absolute -bottom-3 left-0 right-0"
                                            style={{
                                                height: 10,
                                                borderRadius: 2,
                                                background:
                                                    "linear-gradient(135deg, rgba(0,82,255,0.15), rgba(77,124,255,0.10))",
                                            }}
                                        />
                                    </span>
                                    <span className="text-[42px] md:text-[72px]">&nbsp;{t("hero_headline_suffix_en")}</span>
                                </>
                            )}
                        </motion.h1>

                        <motion.p
                            variants={heroChild}
                            className="mt-6 text-[#64748B]"
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 18,
                                lineHeight: 1.7,
                                maxWidth: 480,
                            }}
                        >
                            {locale === "kk" ? t("hero_body_kk") : t("hero_body_en")}
                        </motion.p>

                        <motion.div variants={heroChild} className="mt-10 flex flex-col sm:flex-row gap-4">
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto"
                            >
                                <Link
                                    href={`/${locale}/#curriculum`}
                                    className="inline-flex items-center justify-center gap-3 px-8 rounded-xl text-white font-semibold shadow-accent-lg"
                                    style={{
                                        background: "linear-gradient(135deg, #0052FF, #4D7CFF)",
                                        height: 52,
                                    }}
                                >
                                    <span>{locale === "kk" ? t("hero_cta_primary_kk") : t("hero_cta_primary_en")}</span>
                                    <motion.span
                                        className="inline-flex"
                                        initial={false}
                                        whileHover={{ x: 6 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h12" />
                                            <path d="M13 6l6 6-6 6" />
                                        </svg>
                                    </motion.span>
                                </Link>
                            </motion.div>

                            <Link
                                href={`/${locale}/#curriculum`}
                                className="inline-flex items-center justify-center px-8 rounded-xl text-[#0052FF] font-semibold border border-[#E2E8F0] bg-transparent"
                                style={{ height: 52 }}
                            >
                                {locale === "kk" ? t("hero_cta_secondary_kk") : t("hero_cta_secondary_en")}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right column */}
                    <motion.div variants={heroImage} className="relative hidden md:block">
                        <div className="relative w-[480px] h-[480px]">
                            {/* Layer 1 — Rotating dashed ring */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    style={{
                                        width: 440,
                                        height: 440,
                                        borderRadius: 9999,
                                        border: "1.5px dashed #E2E8F0",
                                    }}
                                    animate={
                                        reducedMotion
                                            ? { rotate: 0 }
                                            : { rotate: 360 }
                                    }
                                    transition={
                                        reducedMotion
                                            ? { duration: 0 }
                                            : { duration: 80, repeat: Infinity, ease: "linear" }
                                    }
                                />
                            </div>

                            {/* Layer 2 — Background circle fill */}
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    width: 380,
                                    height: 380,
                                    borderRadius: 9999,
                                    background:
                                        "radial-gradient(circle, rgba(0,82,255,0.04) 0%, transparent 70%)",
                                }}
                            />

                            {/* Layer 3 — Robot image */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                animate={reducedMotion ? { y: 0 } : { y: [0, -12, 0] }}
                                transition={
                                    reducedMotion
                                        ? undefined
                                        : { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                }
                            >
                                <Image
                                    src="/images/robot-fll.png"
                                    alt="Robot visual"
                                    width={320}
                                    height={320}
                                    style={{ objectFit: "contain" }}
                                />
                            </motion.div>

                            {/* Layer 4 — Floating stat card (top-right) */}
                            <motion.div
                                className="absolute top-5 right-[-20px] bg-white shadow-lg rounded-xl p-3 min-w-[140px]"
                                animate={reducedMotion ? { y: 0 } : { y: [0, -6, 0] }}
                                transition={
                                    reducedMotion
                                        ? undefined
                                        : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
                                    <span
                                        className="text-[#0F172A] font-semibold"
                                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
                                    >
                                        {locale === "kk" ? t("hero_stat_countries_kk") : t("hero_stat_countries_en")}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Layer 5 — Floating stat card (bottom-left) */}
                            <motion.div
                                className="absolute bottom-[40px] left-[-20px] bg-white shadow-lg rounded-xl p-3 min-w-[140px]"
                                animate={reducedMotion ? { y: 0 } : { y: [0, 8, 0] }}
                                transition={
                                    reducedMotion
                                        ? undefined
                                        : { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }
                            >
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#0052FF]" />
                                    <span
                                        className="text-[#0F172A] font-semibold"
                                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
                                    >
                                        {locale === "kk" ? t("hero_stat_teams_kk") : t("hero_stat_teams_en")}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

function CountUpNumber({
    target,
    suffix,
    finalDisplay,
}: {
    target: number;
    suffix?: string;
    finalDisplay: string;
}) {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true, amount: 0.15, margin: "-60px" });
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const start = performance.now();
        const durationMs = 1200;

        const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = easeOut(t);
            const next = Math.round(target * eased);
            setValue(next);
            if (t < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [isInView, target]);

    const display = useMemo(() => {
        // If we animate a string-like value (e.g. seasons range), show the exact final on completion.
        if (target === 0) return finalDisplay;
        if (value >= target) return finalDisplay;
        return `${value}${suffix ?? ""}`;
    }, [finalDisplay, suffix, target, value]);

    return (
        <span ref={ref}>
            {display}
        </span>
    );
}

function StatsBar({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const isKK = locale === "kk";

    const teamsNumber = t("stats_teams_number");
    const countriesNumber = t("stats_countries_number");
    const coursesNumber = t("stats_courses_number");
    const seasonsNumber = t("stats_seasons_number");

    // Numeric targets for the count-up animation.
    const teamsTarget = Number(teamsNumber.replace("+", ""));
    const countriesTarget = Number(countriesNumber.replace("+", ""));
    const coursesTarget = Number(coursesNumber);
    const seasonsTarget = 2025;

    const teamsLabel = isKK ? t("stats_teams_label_kk") : t("stats_teams_label_en");
    const countriesLabel = isKK ? t("stats_countries_label_kk") : t("stats_countries_label_en");
    const coursesLabel = isKK ? t("stats_courses_label_kk") : t("stats_courses_label_en");
    const seasonsLabel = isKK ? t("stats_seasons_label_kk") : t("stats_seasons_label_en");

    return (
        <section
            id="stats"
            className="relative bg-[#0F172A] text-white overflow-hidden"
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4">
                    {[
                        {
                            number: teamsNumber,
                            target: teamsTarget,
                            suffix: "+",
                            label: teamsLabel,
                            borderRight: false,
                        },
                        {
                            number: countriesNumber,
                            target: countriesTarget,
                            suffix: "+",
                            label: countriesLabel,
                            borderRight: false,
                        },
                        {
                            number: coursesNumber,
                            target: coursesTarget,
                            suffix: "",
                            label: coursesLabel,
                            borderRight: false,
                        },
                        {
                            number: seasonsNumber,
                            target: seasonsTarget,
                            suffix: "",
                            label: seasonsLabel,
                            borderRight: false,
                        },
                    ].map((s, idx) => {
                        // Divider spec: vertical dividers between columns on desktop.
                        // Render a right border on the first 3 items for md+.
                        const dividerClass = idx < 3 ? "md:border-r md:border-white/10" : "";

                        return (
                            <div
                                key={idx}
                                className={`text-center py-16 px-6 ${dividerClass}`}
                            >
                                <div
                                    style={{
                                        fontFamily: "'Syne', sans-serif",
                                        fontSize: 48,
                                        fontWeight: 700,
                                        color: "white",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    <CountUpNumber
                                        target={s.target}
                                        suffix={s.suffix}
                                        finalDisplay={s.number}
                                    />
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 14,
                                        color: "rgba(255,255,255,0.5)",
                                        letterSpacing: "0.1em",
                                    }}
                                    className="uppercase mt-3"
                                >
                                    {s.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}


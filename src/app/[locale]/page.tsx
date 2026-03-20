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
            {/* 4. COURSE CATALOG */}
            <CatalogSection locale={locale} t={t} />
            {/* 5. HOW IT WORKS */}
            <HowItWorksSection locale={locale} t={t} />
            {/* 6. CTA SECTION (INVERTED) */}
            <CTASection locale={locale} t={t} />
            {/* 7. FOOTER */}
            <FooterSection locale={locale} t={t} />
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

function CatalogSection({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const tLevels = useTranslations("levels");
    const isKK = locale === "kk";
    const reducedMotionForBadge = useReducedMotion();

    const landingEase = [0.16, 1, 0.3, 1] as const;

    const catalogContainer = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
            },
        },
    };

    const catalogCard = {
        hidden: { opacity: 0, y: 32 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.55, ease: landingEase },
        },
    };

    const categories = [
        {
            id: "robot-design",
            icon: "wrench",
            color: "#3B82F6",
            titleKK: t("catalog_robot_design_title_kk"),
            titleEN: t("catalog_robot_design_title_en"),
            descKK: t("catalog_robot_design_desc_kk"),
            descEN: t("catalog_robot_design_desc_en"),
        },
        {
            id: "innovation",
            icon: "lightbulb",
            color: "#8B5CF6",
            titleKK: t("catalog_innovation_title_kk"),
            titleEN: t("catalog_innovation_title_en"),
            descKK: t("catalog_innovation_desc_kk"),
            descEN: t("catalog_innovation_desc_en"),
        },
        {
            id: "coding",
            icon: "terminal",
            color: "#F97316",
            titleKK: t("catalog_coding_title_kk"),
            titleEN: t("catalog_coding_title_en"),
            descKK: t("catalog_coding_desc_kk"),
            descEN: t("catalog_coding_desc_en"),
        },
        {
            id: "robot-game",
            icon: "trophy",
            color: "#22C55E",
            titleKK: t("catalog_robot_game_title_kk"),
            titleEN: t("catalog_robot_game_title_en"),
            descKK: t("catalog_robot_game_desc_kk"),
            descEN: t("catalog_robot_game_desc_en"),
        },
    ];

    const levelChips = [
        { key: "beginner", label: tLevels("beginner"), bg: "#EFF6FF", fg: "#3B82F6" },
        { key: "intermediate", label: tLevels("intermediate"), bg: "#FFF7ED", fg: "#F97316" },
        { key: "advanced", label: tLevels("advanced"), bg: "#F0FDF4", fg: "#22C55E" },
    ];

    const exploreText = isKK ? t("catalog_explore_kk") : t("catalog_explore_en");

    return (
        <section id="curriculum" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    {/* Badge */}
                    <CatalogBadge />
                    <h2
                        className="mt-6 font-bold"
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 48,
                            color: "#0F172A",
                            lineHeight: 1.05,
                        }}
                    >
                        {isKK ? t("catalog_heading_kk") : t("catalog_heading_en")}
                    </h2>
                    <p
                        className="mt-4"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 18,
                            color: "#64748B",
                            lineHeight: 1.7,
                        }}
                    >
                        {isKK ? t("catalog_subtext_kk") : t("catalog_subtext_en")}
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1, margin: "-60px" }}
                    variants={catalogContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
                >
                    {categories.map((cat) => (
                        <motion.div
                            key={cat.id}
                            variants={catalogCard}
                            whileHover={{
                                y: -4,
                                boxShadow: "0 20px 40px rgba(0,82,255,0.10)",
                            }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="bg-white border border-[#E2E8F0] rounded-[20px] p-8"
                            style={{ boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
                        >
                            {/* Icon container */}
                            <div
                                className="w-12 h-12 rounded-xl mb-4"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0052FF, #4D7CFF)",
                                }}
                            >
                                <div className="w-full h-full flex items-center justify-center">
                                    {cat.icon === "wrench" ? <WrenchIcon /> : null}
                                    {cat.icon === "lightbulb" ? <LightbulbIcon /> : null}
                                    {cat.icon === "terminal" ? <TerminalIcon /> : null}
                                    {cat.icon === "trophy" ? <TrophyIcon /> : null}
                                </div>
                            </div>

                            {/* Titles */}
                            <h3
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 22,
                                    fontWeight: 600,
                                    color: "#0F172A",
                                }}
                            >
                                {isKK ? cat.titleKK : cat.titleEN}
                            </h3>
                            <p
                                className="mt-2"
                                style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: 15,
                                    color: "#64748B",
                                    lineHeight: 1.6,
                                }}
                            >
                                {isKK ? cat.descKK : cat.descEN}
                            </p>

                            {/* Chips */}
                            <div className="flex gap-2 mt-4">
                                {levelChips.map((chip) => (
                                    <span
                                        key={chip.key}
                                        className="inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono text-[12px] uppercase"
                                        style={{
                                            background: chip.bg,
                                            color: chip.fg,
                                        }}
                                    >
                                        {chip.label}
                                    </span>
                                ))}
                            </div>

                            {/* Explore link */}
                            <div className="mt-6">
                                <Link
                                    href={`/${locale}/fll/submerged-2025-26/${cat.id}/beginner`}
                                    className="inline-flex items-center gap-2"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 14,
                                        color: "#0052FF",
                                    }}
                                >
                                    <span>{exploreText}</span>
                                    <motion.span
                                        whileHover={{ x: 4 }}
                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                    >
                                        →
                                    </motion.span>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );

    function CatalogBadge() {
        return (
            <div className="inline-flex items-center gap-3">
                <motion.span
                    animate={
                        reducedMotionForBadge
                            ? undefined
                            : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                    }
                    transition={
                        reducedMotionForBadge
                            ? undefined
                            : { duration: 2, repeat: Infinity, ease: "easeOut" }
                    }
                    style={{ width: 8, height: 8, borderRadius: 9999, background: "#0052FF" }}
                />
                <span className="font-mono uppercase text-xs" style={{ letterSpacing: "0.15em", color: "#0F172A" }}>
                    {t("catalog_badge")}
                </span>
            </div>
        );
    }

    function WrenchIcon() {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2l-2 2" />
                <path d="M7.5 13.5L2 19l3 3 5.5-5.5" />
                <path d="M15 4l5 5" />
            </svg>
        );
    }

    function LightbulbIcon() {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M8 14c-1.5-1.5-2-3-2-5a6 6 0 1112 0c0 2-0.5 3.5-2 5-0.8 0.8-1 1.5-1 2H9c0-0.5-0.2-1.2-1-2z" />
            </svg>
        );
    }

    function TerminalIcon() {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 17l6-5-6-5" />
                <path d="M12 19h8" />
            </svg>
        );
    }

    function TrophyIcon() {
        return (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8" />
                <path d="M12 17v4" />
                <path d="M7 4h10" />
                <path d="M7 4v6a5 5 0 0010 0V4" />
                <path d="M17 4h3v3a4 4 0 01-3 4" />
                <path d="M7 4H4v3a4 4 0 003 4" />
            </svg>
        );
    }
}

function HowItWorksSection({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const isKK = locale === "kk";
    const reducedMotion = useReducedMotion();
    const stepsEase = [0.16, 1, 0.3, 1] as const;

    const parentVariants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 },
        },
    };

    const stepVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: stepsEase } },
    };

    const steps = [
        {
            n: "01",
            title: isKK ? t("howitworks_step1_title_kk") : t("howitworks_step1_title_en"),
            desc: isKK ? "" : t("howitworks_step1_desc_en"),
            icon: <LevelIcon />,
        },
        {
            n: "02",
            title: isKK ? t("howitworks_step2_title_kk") : t("howitworks_step2_title_en"),
            desc: isKK ? "" : t("howitworks_step2_desc_en"),
            icon: <WatchIcon />,
        },
        {
            n: "03",
            title: isKK ? t("howitworks_step3_title_kk") : t("howitworks_step3_title_en"),
            desc: isKK ? "" : t("howitworks_step3_desc_en"),
            icon: <ReadyIcon />,
        },
    ];

    return (
        <section id="how-it-works" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-3">
                        <motion.span
                            animate={
                                reducedMotion
                                    ? undefined
                                    : { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }
                            }
                            transition={
                                reducedMotion
                                    ? undefined
                                    : { duration: 2, repeat: Infinity, ease: "easeOut" }
                            }
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 9999,
                                background: "#0052FF",
                            }}
                        />
                        <span
                            className="font-mono uppercase text-xs"
                            style={{ letterSpacing: "0.15em", color: "#0F172A" }}
                        >
                            {isKK ? t("howitworks_badge_kk") : t("howitworks_badge_en")}
                        </span>
                    </div>
                    <h2
                        className="mt-6 font-bold"
                        style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: 48,
                            color: "#0F172A",
                            lineHeight: 1.05,
                        }}
                    >
                        {isKK ? t("howitworks_heading_kk") : t("howitworks_heading_en")}
                    </h2>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15, margin: "-60px" }}
                    variants={parentVariants}
                    className="w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4"
                >
                    {steps.map((s, idx) => (
                        <React.Fragment key={s.n}>
                            <motion.div
                                variants={stepVariants}
                                className="w-full md:w-[320px] flex flex-col items-center md:items-start"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        style={{
                                            fontFamily: "'Syne', sans-serif",
                                            fontSize: 64,
                                            fontWeight: 700,
                                            color: "rgba(0,82,255,0.08)",
                                            lineHeight: 1,
                                        }}
                                    >
                                        {s.n}
                                    </div>
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                                        style={{
                                            background: "linear-gradient(135deg, #0052FF, #4D7CFF)",
                                        }}
                                    >
                                        {s.icon}
                                    </div>
                                </div>
                                <h3
                                    className="mt-5"
                                    style={{
                                        fontFamily: "'DM Sans', sans-serif",
                                        fontSize: 20,
                                        fontWeight: 600,
                                        color: "#0F172A",
                                    }}
                                >
                                    {s.title}
                                </h3>
                                {s.desc ? (
                                    <p
                                        className="mt-2"
                                        style={{
                                            fontFamily: "'DM Sans', sans-serif",
                                            fontSize: 15,
                                            color: "#64748B",
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {s.desc}
                                    </p>
                                ) : null}
                            </motion.div>

                            {idx < steps.length - 1 ? (
                                <>
                                    <div className="md:hidden w-px h-8 border-l border-dashed border-[#E2E8F0] my-1" />
                                    <div className="hidden md:block flex-1 border-t border-dashed border-[#E2E8F0] mt-6" />
                                </>
                            ) : null}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </section>
    );

    function LevelIcon() {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12l9-9 9 9" />
                <path d="M9 21V9h6v12" />
            </svg>
        );
    }

    function WatchIcon() {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z" />
                <path d="M1 5h8v14H1z" />
            </svg>
        );
    }

    function ReadyIcon() {
        return (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
                <path d="M22 6h-2" />
                <path d="M6 22v-2" />
            </svg>
        );
    }
}

function CTASection({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const isKK = locale === "kk";
    const reducedMotion = useReducedMotion();

    return (
        <motion.section
            id="cta"
            className="relative bg-[#0F172A] text-white overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={
                reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, amount: 0.15, margin: "-60px" }}
            transition={{ duration: 0.7 }}
        >
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 800px 400px at 50% 50%, rgba(0,82,255,0.12), transparent)",
                }}
            />

            <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
                <h2
                    style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 52,
                        lineHeight: 1.05,
                        fontWeight: 700,
                    }}
                >
                    {isKK ? t("cta_title_kk") : t("cta_title_en")}
                </h2>
                <p
                    className="mt-6"
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 18,
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.7,
                    }}
                >
                    {isKK ? t("cta_subtitle_kk") : t("cta_subtitle_en")}
                </p>

                <div className="mt-10 flex justify-center">
                    <Link
                        href={`/${locale}/auth/login`}
                        className="inline-flex"
                    >
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="h-[56px] px-8 rounded-xl font-semibold shadow-accent-lg"
                            style={{
                                background: "linear-gradient(135deg, #0052FF, #4D7CFF)",
                                color: "#FFFFFF",
                                width: "auto",
                            }}
                        >
                            <span>
                                {isKK ? t("cta_button_kk") : t("cta_button_en")}
                            </span>
                        </motion.button>
                    </Link>
                </div>

                <p
                    className="mt-5"
                    style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.4)",
                    }}
                >
                    {isKK ? t("cta_small_kk") : t("cta_small_en")}
                </p>
            </div>
        </motion.section>
    );
}

function FooterSection({
    locale,
    t,
}: {
    locale: string;
    t: ReturnType<typeof useTranslations>;
}) {
    const isKK = locale === "kk";

    return (
        <footer id="footer" className="bg-white border-t border-[#E2E8F0] py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "#64748B",
                            fontWeight: 500,
                        }}
                    >
                        {t("footer_tagline")}
                    </h3>
                    <p
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "#64748B",
                            fontWeight: 500,
                        }}
                    >
                        {t("footer_tagline")}
                    </p>
                </div>
                <div>
                    <div
                        className="font-semibold mb-3"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "#0F172A",
                            fontSize: 14,
                        }}
                    >
                        {t("footer_links_header")}
                    </div>
                    <div
                        className="flex flex-col gap-2 text-sm"
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            color: "#64748B",
                        }}
                    >
                        <Link href={`/${locale}/fll#curriculum`} className="hover:text-[#0052FF]">
                            {t("footer_link_courses")}
                        </Link>
                        <Link href={`/${locale}/quiz`} className="hover:text-[#0052FF]">
                            {t("footer_link_quiz")}
                        </Link>
                        <Link href={`/${locale}/resources`} className="hover:text-[#0052FF]">
                            {t("footer_link_resources")}
                        </Link>
                        <Link href={`/${locale}/#how-it-works`} className="hover:text-[#0052FF]">
                            {t("footer_link_about")}
                        </Link>
                    </div>
                </div>
                <div className="text-right">
                    <div
                        style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "#64748B",
                        }}
                    >
                        © 2026 Tagylym
                    </div>
                    <div className="mt-3 flex justify-end gap-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif", color: "#64748B" }}>
                        <Link href="/kk" className={isKK ? "text-[#0052FF]" : "hover:text-[#0052FF]"}>
                            KK
                        </Link>
                        <span className="text-[#E2E8F0]">|</span>
                        <Link href="/en" className={!isKK ? "text-[#0052FF]" : "hover:text-[#0052FF]"}>
                            EN
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}


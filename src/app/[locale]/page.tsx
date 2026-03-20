"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <div className="min-h-screen bg-background text-foreground font-sans overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative w-full px-6 py-28 md:py-44 flex flex-col lg:flex-row items-center justify-center isolate">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(0,82,255,0.06),transparent_60%)]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,rgba(77,124,255,0.06),transparent_60%)]" />
                
                <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
                    {/* Hero Text */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="relative z-10 flex flex-col justify-center items-start lg:pr-10"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl md:text-6xl lg:text-[5.25rem] font-calistoga leading-[1.05] tracking-[-0.02em] text-foreground mb-4 text-left"
                        >
                            <span className="relative inline-block">
                                <span className="gradient-text">{t("hero_title")}</span>
                                <span className="gradient-underline"></span>
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeInUp}
                            className="text-2xl md:text-3xl font-semibold text-foreground mb-6 text-left leading-snug"
                        >
                            {t("hero_tagline")}
                        </motion.p>

                        <motion.div variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg space-y-4 mb-8">
                            <p>{t("hero_subtitle_1")} {t("hero_subtitle_2")}</p>
                            <p>{t("hero_subtitle_3")} {t("hero_subtitle_4")}</p>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Link
                                href={"/lessons/zhestkoe-osnovanie" as "/"}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#8B5CF6] text-white font-semibold text-base hover:bg-[#7C3AED] transition-colors shadow-lg shadow-[#8B5CF6]/30"
                            >
                                {t("hero_cta")}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Graphic - Animated Robots */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: easeOut, delay: 0.3 }}
                        className="relative h-[400px] md:h-[500px] w-full hidden md:block"
                    >
                        {/* Decorative rotating ring */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-accent/20"
                            />
                        </div>

                        {/* Floating elements */}
                        <motion.div 
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-[10%] top-1/2 -translate-y-1/2 z-10"
                        >
                            <Image src="/images/robot-ftc.png" alt="FTC Robot" width={220} height={260} className="object-contain drop-shadow-2xl" priority />
                        </motion.div>

                        <motion.div 
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute right-[5%] top-1/3 -translate-y-1/2 z-20"
                        >
                            <Image src="/images/robot-fll.png" alt="FLL Robot" width={200} height={240} className="object-contain drop-shadow-2xl" priority />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* "О проекте Tagylym" Section */}
            <section className="bg-white px-6 py-28 relative">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 items-center">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15, margin: "-60px" }}
                        variants={stagger}
                    >
                        {/* Badge */}
                        <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2">
                            <motion.span 
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} 
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-2 w-2 rounded-full bg-accent" 
                            />
                            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent font-semibold">
                                About
                            </span>
                        </motion.div>

                        <motion.h2 
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-calistoga text-foreground mb-6 leading-tight"
                        >
                            {t("about_title")}
                        </motion.h2>
                        
                        <motion.p variants={fadeInUp} className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {t("about_body")}
                        </motion.p>

                        {/* Callout Card */}
                        <motion.div variants={fadeInUp} className="relative bg-card rounded-2xl p-6 border border-border shadow-md hover:shadow-xl transition-shadow duration-300">
                            <div className="absolute top-0 right-8 -translate-y-[40%] text-[8rem] text-accent/[0.04] font-calistoga leading-none select-none">&quot;</div>
                            <p className="italic text-lg text-foreground relative z-10 font-medium tracking-tight">
                                {t("about_quote")}
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, ease: easeOut }}
                        className="relative"
                    >
                        {/* Gradient Border Frame */}
                        <div className="rounded-[2.5rem] bg-gradient-to-br from-accent via-accent-secondary to-accent p-[2px] shadow-accent-lg">
                            <div className="rounded-[calc(2.5rem-2px)] overflow-hidden bg-card">
                                <Image src="/images/photo-girl.png" alt="Student photo" width={600} height={700} className="w-full object-cover aspect-[4/5] md:aspect-[3/4]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* "Проблема" Section (Inverted Contrast) */}
            <section className="bg-foreground text-background px-6 py-32 relative overflow-hidden">
                {/* Dot grid texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                
                {/* Accent glow */}
                <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 md:gap-24 items-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.7, ease: easeOut }}
                        className="order-last lg:order-first relative"
                    >
                        <div className="rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-2xl relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent z-10 pointer-events-none" />
                            <Image src="/images/photo-boy.png" alt="Student photo" width={500} height={600} className="w-full object-cover aspect-square md:aspect-[4/5] transition-all duration-700" />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15, margin: "-60px" }}
                        variants={stagger}
                    >
                         {/* Badge */}
                         <motion.div variants={fadeInUp} className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent-secondary/30 bg-background/5 px-5 py-2">
                            <motion.span 
                                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} 
                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                className="h-2 w-2 rounded-full bg-accent-secondary" 
                            />
                            <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent-secondary font-semibold">
                                Highlight
                            </span>
                        </motion.div>

                        <motion.h2 
                            variants={fadeInUp}
                            className="text-4xl md:text-5xl font-calistoga text-white mb-6 leading-tight"
                        >
                            {t("problem_title")}
                        </motion.h2>

                        <motion.p variants={fadeInUp} className="text-lg text-slate-100 leading-relaxed mb-8">
                            {t("problem_body")}
                        </motion.p>

                        {/* Callout Card */}
                        <motion.div variants={fadeInUp} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
                            <p className="italic text-lg text-white font-medium">
                                <span className="text-accent-secondary mr-2 font-calistoga text-2xl leading-none">&quot;</span>
                                {t("problem_quote")}
                                <span className="text-accent-secondary ml-2 font-calistoga text-2xl leading-none">&quot;</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

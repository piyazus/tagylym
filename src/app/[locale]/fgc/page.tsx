"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

export default function FGCPage() {
    const t = useTranslations("fgc");

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* FGC Theme Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-xs font-bold uppercase tracking-[0.2em] mb-8"
                    >
                        FIRST® Global Challenge
                    </motion.div>
                    
                    <motion.h1
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-calistoga mb-6 tracking-tight"
                    >
                        INCHEON <span className="text-teal-600">2026</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed mb-12"
                    >
                        {t("description")}
                    </motion.p>

                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <button 
                            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 py-4 rounded-xl bg-teal-600 text-white font-bold text-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            {t("join_waitlist")}
                        </button>
                        <Link 
                            href="/"
                            className="px-8 py-4 rounded-xl border border-border text-foreground font-bold text-lg hover:bg-muted transition-all"
                        >
                            {t("back_to_home")}
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Values / Features */}
            <section className="py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { titleKey: "feature_team_title" as const, descKey: "feature_team_desc" as const, icon: "🇰🇿" },
                        { titleKey: "feature_impact_title" as const, descKey: "feature_impact_desc" as const, icon: "🌎" },
                        { titleKey: "feature_mentoring_title" as const, descKey: "feature_mentoring_desc" as const, icon: "🥇" }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card p-10 hover:border-teal-500/30 transition-all hover:-translate-y-2 group"
                        >
                            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{feature.icon}</div>
                            <h3 className="text-2xl font-bold text-foreground mb-4">{t(feature.titleKey)}</h3>
                            <p className="text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Waitlist Section */}
            <section id="waitlist" className="py-32 px-6">
                <div className="max-w-4xl mx-auto relative">
                     <div className="absolute inset-0 bg-teal-500/5 rounded-[3rem] blur-3xl -z-10" />
                     <div className="glass-card p-12 md:p-20 text-center border-border">
                        <h2 className="text-4xl font-calistoga text-foreground mb-6">{t("waitlist_title")}</h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">{t("waitlist_subtitle")}</p>
                        <div className="max-w-md mx-auto">
                            <WaitlistForm track="fgc" />
                        </div>
                    </div>
                </div>
            </section>

             {/* Resources Footer */}
             <footer className="py-20 border-t border-border">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h4 className="text-xs font-black tracking-[0.3em] uppercase text-muted-foreground mb-8">Official Resources</h4>
                    <div className="flex flex-wrap justify-center gap-10">
                        <a href="https://first.global/" target="_blank" className="text-muted-foreground hover:text-teal-600 transition-colors font-bold uppercase text-[10px] tracking-widest">FIRST Global</a>
                        <a href="https://first.global/fgc/" target="_blank" className="text-muted-foreground hover:text-teal-600 transition-colors font-bold uppercase text-[10px] tracking-widest">The Challenge</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

import { useTranslations } from "next-intl";
import ROICalculator from "@/components/ROICalculator";

export default function ResourcesPage() {
    const t = useTranslations("resources");

    return (
        <div className="min-h-screen">
            <div className="max-w-5xl mx-auto px-6 pt-16 pb-24">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-white mb-3">{t("title")}</h1>
                    <p className="text-muted">{t("subtitle")}</p>
                </div>

                {/* ROI Calculator */}
                <section className="mb-16">
                    <ROICalculator />
                </section>

                {/* Useful Links */}
                <section>
                    <h2 className="text-xl font-bold mb-6">{t("linksTitle")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { title: t("link1Title"), url: "https://www.firstlegoleague.org/", desc: t("link1Desc") },
                            { title: t("link2Title"), url: "https://education.lego.com/en-us/product-resources/spike-prime", desc: t("link2Desc") },
                            { title: t("link3Title"), url: "https://docs.pybricks.com/", desc: t("link3Desc") },
                            { title: t("link4Title"), url: "https://www.firstinspires.org/resource-library/fll/challenge/challenge-and-updates", desc: t("link4Desc") },
                        ].map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card p-5 flex items-center gap-4 group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center text-lg shrink-0">
                                    🔗
                                </div>
                                <div>
                                    <h3 className="font-medium text-white text-sm group-hover:text-accent transition-colors">
                                        {link.title}
                                    </h3>
                                    <p className="text-xs text-muted mt-0.5">{link.desc}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A]">
            {/* HERO SECTION */}
            <section
                className="relative flex flex-col items-center justify-center w-full px-6 py-20 overflow-hidden"
                style={{
                    background: "linear-gradient(160deg, #1E3A8A 0%, #2563EB 40%, #60A5FA 70%, #93C5FD 100%)",
                    minHeight: "380px",
                }}
            >
                {/* LEFT Robot (desktop) */}
                <div className="absolute left-[-20px] bottom-0 hidden md:block">
                    <Image
                        src="/images/robot-ftc.png"
                        alt="FTC Robot"
                        width={200}
                        height={240}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* RIGHT Robot (desktop) */}
                <div className="absolute right-[-20px] bottom-0 hidden md:block">
                    <Image
                        src="/images/robot-fll.png"
                        alt="FLL Robot"
                        width={200}
                        height={240}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center max-w-xl mx-auto">
                    <h1
                        className="text-7xl md:text-8xl text-white text-center italic mb-6"
                        style={{ fontWeight: 800, letterSpacing: "-0.02em" }}
                    >
                        Tagylym
                    </h1>

                    <p className="text-sm text-white/90 text-center max-w-[480px] mx-auto leading-relaxed">
                        Бесплатный доступ к системному обучению робототехнике и
                        инженерии для школьников и менторов.
                    </p>
                    <p className="text-sm text-white/90 text-center max-w-[480px] mx-auto leading-relaxed mt-2">
                        Проект выстроен по ценностям и целям FIRST, чтобы
                        готовить сильные команды и будущих инженеров.
                    </p>
                </div>

                {/* Bottom wave */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
                    <svg
                        className="relative block w-full h-10 md:h-14"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,201.5,114.4,242.06,110.39,282.88,89.5,321.39,56.44Z"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </section>

            {/* "О проекте Tagylym" Section */}
            <section className="bg-white px-6 py-20">
                <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div>
                        <h2
                            className="text-4xl text-[#1A1A1A] mb-6"
                            style={{ fontWeight: 700, lineHeight: 1.1 }}
                        >
                            О проекте{"\n"}Tagylym
                        </h2>
                        <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                            Tagylym — это открытая онлайн-платформа, которая даёт школьникам
                            и менторам из любых регионов Казахстана бесплатный доступ к
                            структурированным курсам по робототехнике, программированию и
                            инженерии. Все треки выстроены по ценностям и критериям FIRST, чтобы
                            не просто учить собирать робота, а помогать командам расти до уровня
                            сильных участников, менторов и будущих инженеров.
                        </p>

                        {/* Callout */}
                        <div className="bg-[#FEFCE8] border border-[#FDE68A] rounded-2xl px-5 py-4 max-w-[340px]">
                            <p className="italic text-sm text-[#92400E]">
                                &quot;Сотни школ с робототехникой не используют её в полную силу
                                из-за нехватки контента и менторов.&quot;
                            </p>
                        </div>
                    </div>

                    <div>
                        <Image
                            src="/images/photo-girl.png"
                            alt="Студентка"
                            width={400}
                            height={480}
                            className="w-full rounded-3xl object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* "Проблема" Section */}
            <section className="bg-white px-6 py-20">
                <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div className="order-last md:order-first">
                        <Image
                            src="/images/photo-boy.png"
                            alt="Студент"
                            width={400}
                            height={480}
                            className="w-full rounded-3xl object-contain"
                        />
                    </div>

                    <div>
                        <h2
                            className="text-4xl text-[#1A1A1A] mb-6"
                            style={{ fontWeight: 700, lineHeight: 1.1 }}
                        >
                            Проблема
                        </h2>
                        <p className="text-base text-[#6B7280] leading-relaxed">
                            Сегодня доступ к качественному STEM-образованию и робототехнике
                            сильно зависит от города, школы и дохода семьи: в крупных центрах
                            есть НИШ, специализированные лицеи и кружки, а в сельских школах
                            даже при появлении кабинетов робототехники часто не хватает контента,
                            методик и наставников. В результате тысячи детей с интересом к
                            технике не получают системного обучения, не знают про FIRST и теряют
                            шанс выстроить свой инженерный путь.
                        </p>

                        {/* Callout */}
                        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl px-5 py-4 mt-6">
                            <p className="italic text-sm text-[#1E40AF]">
                                &quot;Более 60% школьников Казахстана учатся в сельских школах и
                                малых городах, где доступ к устойчивым STEM-программам ограничен.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

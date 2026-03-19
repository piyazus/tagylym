"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#1A1A1A]">
            {/* HERO SECTION */}
            <section
                className="relative flex flex-col items-center justify-center min-h-[40vh] w-full px-8 py-16 overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1A237E 0%, #283593 50%, #1565C0 100%)",
                }}
            >
                {/* LEFT Robot (desktop only) */}
                <div className="absolute left-6 lg:left-16 bottom-0 hidden md:block">
                    <Image
                        src="/images/robot-ftc.png"
                        alt="FTC Robot"
                        width={320}
                        height={380}
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* RIGHT Robot (desktop only) */}
                <div className="absolute right-6 lg:right-16 bottom-0 hidden md:block">
                    <Image
                        src="/images/robot-fll.png"
                        alt="FLL Robot"
                        width={280}
                        height={320}
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                    {/* Logo row */}
                    <div className="flex items-center justify-center gap-4 text-white/80 text-sm mb-8">
                        <Image
                            src="/images/logo-tagylym.png"
                            alt="Tagylym"
                            width={100}
                            height={28}
                            className="h-6 w-auto"
                            priority
                        />
                        <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                        <Image
                            src="/images/logo-first.png"
                            alt="FIRST"
                            width={36}
                            height={32}
                            className="h-6 w-auto"
                        />
                        <span className="font-semibold tracking-wider text-white/80">FIRST Kazakhstan</span>
                        <span className="w-1 h-1 bg-white/30 rounded-full hidden sm:block"></span>
                        <span className="hidden sm:inline text-white/60">Powered by USTEM Foundation</span>
                    </div>

                    <h1 className="font-display text-6xl md:text-8xl text-white text-center italic mb-4">
                        Tagylym
                    </h1>

                    <p className="text-white/90 text-sm md:text-base text-center max-w-lg mx-auto leading-relaxed mb-8">
                        Бесплатный доступ к системному обучению робототехнике и инженерии для школьников и менторов. Проект выстроен по ценностям и целям FIRST, чтобы готовить сильные команды и будущих инженеров.
                    </p>

                    <Link href="/fll" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium py-3.5 px-8 rounded-lg transition-colors shadow-lg">
                        Get Started
                    </Link>
                </div>

                {/* Bottom Wave/Curve transitioning to white section */}
                <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
                    <svg
                        className="relative block w-full h-12 md:h-16"
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,121.32,201.5,114.4,242.06,110.39,282.88,89.5,321.39,56.44Z"
                            className="fill-white"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* "О проекте" Section */}
            <section className="bg-white px-8 py-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-display text-4xl text-[#1A1A1A] mb-6">О проекте Tagylym</h2>
                        <p className="text-base text-[#6B7280] leading-relaxed mb-6">
                            Tagylym — это открытая онлайн-платформа, которая даёт школьникам и педагогам доступ к проверенным, качественным знаниям в области робототехники. Мы верим, что каждый ребёнок, независимо от места проживания, должен иметь шанс освоить инженерию и навыки будущего.
                        </p>

                        <div className="rounded-2xl border border-[#E5E7EB] bg-[#FFFBEB] px-6 py-4 max-w-sm">
                            <p className="italic text-sm text-[#92400E]">
                                &quot;Сотни школ с робототехникой не используют её в полную силу из-за нехватки контента и менторов.&quot;
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -z-10 bg-blue-100 rounded-3xl inset-0 translate-x-4 translate-y-4"></div>
                        <div className="rounded-3xl overflow-hidden shadow-lg bg-[#F3F4F6] aspect-square flex items-center justify-center">
                            <Image
                                src="/images/photo-girl.png"
                                alt="Студентка"
                                width={400}
                                height={480}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* "Проблема" Section */}
            <section className="bg-[#F9FAFB] px-8 py-20 pb-28">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="order-last md:order-first relative">
                        <div className="absolute -z-10 bg-orange-100 rounded-3xl inset-0 -translate-x-4 translate-y-4"></div>
                        <div className="rounded-3xl overflow-hidden shadow-lg bg-[#F3F4F6] aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/images/photo-boy.png"
                                alt="Студент"
                                width={400}
                                height={480}
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display text-4xl text-[#1A1A1A] mb-6">Проблема</h2>
                        <p className="text-base text-[#6B7280] leading-relaxed">
                            Одной из главных проблем является отсутствие системного подхода и единой базы знаний. Многие кружки опираются на энтузиазм отдельных учителей, в то время как большинство школ не имеют доступа к качественным методическим материалам, особенно на казахском языке.
                        </p>

                        <div className="rounded-2xl border border-[#E5E7EB] bg-[#EFF6FF] px-6 py-4 mt-6">
                            <p className="italic text-sm text-[#1E40AF]">
                                &quot;Более 60% школьников Казахстана учатся в сельских школах, где проблема нехватки квалифицированных тренеров стоит особенно остро.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

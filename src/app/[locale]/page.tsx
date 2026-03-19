"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <div className="min-h-screen bg-[#0f172a] font-sans text-[#f1f5f9]">
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
                {/* Subtle animated grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

                {/* Abstract geometric shapes (CSS/SVG) */}
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-8 mt-10">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
                        Робот жасауды үйрен — жарыста жең
                    </h1>
                    <p className="text-xl md:text-2xl text-[#94a3b8] max-w-3xl mx-auto mb-10">
                        FLL, FTC, FGC жарыстарына арналған казахстандық платформа
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/fll" className="bg-[#8B5CF6] hover:bg-purple-500 text-white font-semibold py-4 px-10 rounded-xl transition-all shadow-lg shadow-purple-500/30 w-full sm:w-auto text-lg text-center">
                            Тегін бастау
                        </Link>
                        <a href="#how-it-works" className="bg-transparent border border-[#475569] hover:bg-[#1e293b] text-white font-semibold py-4 px-10 rounded-xl transition-all w-full sm:w-auto text-lg text-center">
                            Бейнелерді көру
                        </a>
                    </div>
                </div>
            </section>

            {/* STATS BAR */}
            <section className="bg-[#1e293b] border-y border-[#334155] py-12 relative z-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#475569]">
                        <div className="flex flex-col items-center pt-4 md:pt-0">
                            <span className="text-4xl font-bold text-white mb-2">17</span>
                            <span className="text-[#94a3b8] font-medium uppercase tracking-wider text-sm">Сабақ</span>
                        </div>
                        <div className="flex flex-col items-center pt-4 md:pt-0">
                            <span className="text-4xl font-bold text-[#3B82F6] mb-2">3</span>
                            <span className="text-[#94a3b8] font-medium uppercase tracking-wider text-sm">Трек</span>
                        </div>
                        <div className="flex flex-col items-center pt-4 md:pt-0">
                            <span className="text-4xl font-bold text-[#22C55E] mb-2">100%</span>
                            <span className="text-[#94a3b8] font-medium uppercase tracking-wider text-sm">Тегін бастауыш</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRACKS SECTION */}
            <section className="py-24 relative z-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Оқу Тректері</h2>
                        <p className="text-[#94a3b8] text-lg">Үш түрлі бағыт бойынша дағдыларыңызды арттырыңыз</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Track 1 */}
                        <div className="bg-[#1e293b] rounded-[16px] border border-[#334155] overflow-hidden flex flex-col hover:border-[#3B82F6] transition-colors">
                            <div className="p-8 flex-grow">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#3B82F6]/20 text-[#3B82F6] mb-6">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                </div>
                                <div className="inline-block px-3 py-1 mb-4 rounded bg-[#0f172a] border border-[#334155] text-xs font-bold text-white tracking-widest">FLL</div>
                                <h3 className="text-2xl font-bold mb-3">Робот Дизайны</h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">Робот құрастыру, механика негіздері, және бағдарламалау алгоритмдері.</p>
                                <span className="text-[#94a3b8] text-sm font-medium">8 сабақ</span>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link href="/fll/robot-design" className="block w-full text-center bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#3B82F6] font-bold py-3 rounded-xl transition-colors">
                                    Бастау
                                </Link>
                            </div>
                        </div>

                        {/* Track 2 */}
                        <div className="bg-[#1e293b] rounded-[16px] border border-[#334155] overflow-hidden flex flex-col hover:border-[#F97316] transition-colors">
                            <div className="p-8 flex-grow">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#F97316]/20 text-[#F97316] mb-6">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                </div>
                                <div className="inline-block px-3 py-1 mb-4 rounded bg-[#0f172a] border border-[#334155] text-xs font-bold text-white tracking-widest">FLL</div>
                                <h3 className="text-2xl font-bold mb-3">Инновациялық Жоба</h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">Мәселені анықтау, шешім табу, прототип жасау және көпшілікпен бөлісу.</p>
                                <span className="text-[#94a3b8] text-sm font-medium">5 сабақ</span>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link href="/fll/innovation-project" className="block w-full text-center bg-[#F97316]/10 hover:bg-[#F97316]/20 text-[#F97316] font-bold py-3 rounded-xl transition-colors">
                                    Бастау
                                </Link>
                            </div>
                        </div>

                        {/* Track 3 */}
                        <div className="bg-[#1e293b] rounded-[16px] border border-[#334155] overflow-hidden flex flex-col hover:border-[#22C55E] transition-colors">
                            <div className="p-8 flex-grow">
                                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#22C55E]/20 text-[#22C55E] mb-6">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                </div>
                                <div className="inline-block px-3 py-1 mb-4 rounded bg-[#0f172a] border border-[#334155] text-xs font-bold text-white tracking-widest">FLL</div>
                                <h3 className="text-2xl font-bold mb-3">Негізгі Құндылықтар</h3>
                                <p className="text-[#94a3b8] text-sm leading-relaxed mb-6">Командалық жұмыс, сыпайы кәсіпқойлық, жаңалық ашу және көңіл көтеру.</p>
                                <span className="text-[#94a3b8] text-sm font-medium">4 сабақ</span>
                            </div>
                            <div className="p-6 pt-0 mt-auto">
                                <Link href="/fll/core-values" className="block w-full text-center bg-[#22C55E]/10 hover:bg-[#22C55E]/20 text-[#22C55E] font-bold py-3 rounded-xl transition-colors">
                                    Бастау
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-24 bg-[#1e293b] border-y border-[#334155]">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Бұл қалай жұмыс істейді?</h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        <div className="flex flex-col items-center text-center max-w-[250px]">
                            <div className="w-20 h-20 rounded-full bg-[#3B82F6] flex items-center justify-center text-3xl font-bold mb-6 text-white shadow-lg shadow-blue-500/30">1</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Деңгейді таңда</h3>
                        </div>
                        <div className="hidden md:block w-32 h-[2px] bg-[#475569]"></div>
                        <div className="flex flex-col items-center text-center max-w-[250px]">
                            <div className="w-20 h-20 rounded-full bg-[#F97316] flex items-center justify-center text-3xl font-bold mb-6 text-white shadow-lg shadow-orange-500/30">2</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Сабақтарды қара</h3>
                        </div>
                        <div className="hidden md:block w-32 h-[2px] bg-[#475569]"></div>
                        <div className="flex flex-col items-center text-center max-w-[250px]">
                            <div className="w-20 h-20 rounded-full bg-[#22C55E] flex items-center justify-center text-3xl font-bold mb-6 text-white shadow-lg shadow-green-500/30">3</div>
                            <h3 className="text-xl font-bold mb-3 text-white">Тәжірибеде қолдан</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPETITION SELECTOR */}
            <section className="py-24 relative z-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12">Жарыстарды таңдаңыз</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* FLL Active */}
                        <div className="bg-[#1e293b] border border-[#3B82F6] rounded-2xl p-8 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.15)] group">
                            <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2 z-10 relative">FIRST LEGO League</h3>
                            <p className="text-[#94a3b8] mb-6 z-10 relative">9-16 жасқа арналған негізгі жарыс</p>
                            <Link href="/fll" className="inline-block bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-colors z-10 relative">Игеру</Link>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-2xl group-hover:bg-[#3B82F6]/20 transition-colors"></div>
                        </div>
                        {/* FTC Inactive */}
                        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 opacity-60">
                            <span className="inline-block mb-4 px-3 py-1 bg-[#334155] text-xs font-bold text-[#f1f5f9] tracking-wider rounded">ЖАҚЫНДА</span>
                            <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2">FIRST Tech Challenge</h3>
                            <p className="text-[#94a3b8] mb-6">12-18 жасқа арналған жетілдірілген жарыс</p>
                            <span className="inline-block bg-[#334155] text-[#94a3b8] font-semibold py-3 px-8 rounded-xl cursor-not-allowed">Дайындалуда</span>
                        </div>
                        {/* FGC Inactive */}
                        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 opacity-60">
                            <span className="inline-block mb-4 px-3 py-1 bg-[#334155] text-xs font-bold text-[#f1f5f9] tracking-wider rounded">ЖАҚЫНДА</span>
                            <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2">FIRST Global</h3>
                            <p className="text-[#94a3b8] mb-6">Ұлттық құрамалардың әлемдік чемпионаты</p>
                            <span className="inline-block bg-[#334155] text-[#94a3b8] font-semibold py-3 px-8 rounded-xl cursor-not-allowed">Дайындалуда</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

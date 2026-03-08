"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function HomePage() {
    const t = useTranslations("home");
    const tCommon = useTranslations("common");
    const [filterLevel, setFilterLevel] = useState<string>("all");

    const allCourses = [
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Знакомство со средой SPIKE Prime / EV3. Интерфейс, блоки, подключение хаба. Первая программа 'Привет, мир!'", img: "/images/course-coding.png", level: "beginner", levelText: tCommon("beginner") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Ветвление и циклы. Блоки 'Если/Иначе' по датчику касания или цвета. Простой цикл 'Повторять'.", img: "/images/course-coding.png", level: "beginner", levelText: tCommon("beginner") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Первый выход на миссию. Создание программы для выполнения одной простой миссии на поле. Тестирование и корректировка.", img: "/images/course-coding.png", level: "beginner", levelText: tCommon("beginner") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Работа с датчиками. Цветовой датчик: следование по линии (П-регулятор). Гироскоп: повороты.", img: "/images/course-coding.png", level: "intermediate", levelText: tCommon("intermediate") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Структурирование кода. Создание своих блоков (My Blocks) для часто используемых действий.", img: "/images/course-coding.png", level: "intermediate", levelText: tCommon("intermediate") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Стратегия и отладка. Планирование маршрута на поле. Анализ, почему робот не приехал в нужную точку.", img: "/images/course-coding.png", level: "intermediate", levelText: tCommon("intermediate") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Программирование для стабильности. Учет трения, неровностей поля. Добавление 'подстраховок'.", img: "/images/course-coding.png", level: "advanced", levelText: tCommon("advanced") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Сложные алгоритмы. Следование по линии с перекрестками. ПИД-регулятор для движения.", img: "/images/course-coding.png", level: "advanced", levelText: tCommon("advanced") },
        { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", desc: "Оптимизация и тайм-менеджмент. Расчет времени на выполнение миссий.", img: "/images/course-coding.png", level: "advanced", levelText: tCommon("advanced") },
    ];

    const displayedCourses = filterLevel === "all" ? allCourses : allCourses.filter(c => c.level === filterLevel);

    return (
        <div className="min-h-screen bg-bg-white font-sans text-text-gray">

            {/* 📌 2. Главный экран (Hero Section) */}
            <section className="relative min-h-screen pt-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-blue-400 to-blue-main text-white -mt-20">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="absolute w-[200%] h-auto top-[20%] left-[-50%] animate-pulse-slow" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,224L48,229.3C96,235,192,245,288,218.7C384,192,480,128,576,128C672,128,768,192,864,224C960,256,1056,256,1152,229.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    <svg className="absolute w-[200%] h-auto top-[40%] left-[-20%] opacity-50" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="#ffffff" fillOpacity="1" d="M0,64L80,90.7C160,117,320,171,480,170.7C640,171,800,117,960,112C1120,107,1280,149,1360,170.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-8 mt-10">
                    <h1 className="text-[100px] md:text-[140px] font-caveat leading-none drop-shadow-lg tracking-wide">
                        Taǵylym
                    </h1>
                    <p className="mt-8 text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md pb-10 whitespace-pre-wrap">
                        {t('heroSubtitleExtended')}
                    </p>
                </div>

                <div className="absolute left-0 bottom-[-20px] w-64 md:w-[450px] pointer-events-none opacity-90 z-10">
                    <Image src="/images/image 13.png" alt="Robot Claw" width={500} height={500} className="w-full h-auto drop-shadow-2xl" />
                </div>
                <div className="absolute right-[-40px] bottom-[-40px] w-64 md:w-[400px] pointer-events-none opacity-90 z-10">
                    <Image src="/images/image 10.png" alt="Robot Chassis" width={500} height={500} className="w-full h-auto drop-shadow-2xl" />
                </div>

                <div className="absolute bottom-0 w-full overflow-hidden leading-none z-20">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,120.34,196.8,110.15,240.23,103.4,283.47,81.33,321.39,56.44Z" className="fill-bg-white"></path>
                    </svg>
                </div>
            </section>

            {/* 📌 3. Секция "О проекте" (About Section) */}
            <section className="bg-bg-white py-24 relative z-20">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                <span className="text-text-dark">{t('aboutTitle')} </span>
                                <span className="text-blue-main">Taǵylym</span>
                            </h2>
                            <p className="text-lg leading-relaxed text-text-gray mb-8">
                                {t('aboutText')}
                            </p>
                        </div>
                        <div className="order-1 md:order-2 w-full flex justify-center md:justify-end">
                            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-[30px] overflow-hidden bg-gradient-to-tr from-blue-300 to-blue-500 shadow-xl">
                                <Image src="/images/image 12 (1).png" alt="Девочка показывает" fill className="object-cover object-center scale-110 translate-y-4" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex justify-center">
                        <div className="w-[90%] md:w-[80%] bg-yellow-bg border-2 border-yellow-border rounded-full py-5 px-8 shadow-sm">
                            <p className="text-center text-yellow-text font-medium text-base md:text-lg">
                                {t('aboutCallout')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 📌 4. Секция "Проблема" (Problem Section) */}
            <section className="bg-bg-white py-24 border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="w-full flex justify-center md:justify-start">
                            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-[30px] overflow-hidden bg-gradient-to-bl from-blue-200 to-cyan-400 shadow-xl">
                                <Image src="/images/image 12.png" alt="Счастливый мальчик" fill className="object-cover object-top scale-105 translate-y-6" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-dark text-left md:text-right">
                                {t('problemTitle')}
                            </h2>
                            <p className="text-lg leading-relaxed text-text-gray mb-10 text-left md:text-right">
                                {t('problemText')}
                            </p>
                            <div className="flex justify-start md:justify-end">
                                <div className="bg-yellow-bg border-2 border-yellow-border rounded-full py-4 px-6 shadow-sm inline-block max-w-[500px]">
                                    <p className="text-yellow-text font-medium text-sm md:text-base text-center md:text-left">
                                        {t('problemCallout')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 📌 5. Секция "Курсы" (Courses Section) */}
            <section className="bg-bg-white py-32 border-t border-gray-100">
                <div className="max-w-[1200px] mx-auto px-4 sm:px-8">

                    {/* Header: Курсы + Pill buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 md:mb-0">{t('coursesTitle')}</h2>

                        <div className="flex items-center flex-wrap gap-3">
                            <span className="text-text-light-gray text-sm mr-2 font-medium">{t('levelsCount')}</span>
                            <button onClick={() => setFilterLevel("all")} className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${filterLevel === 'all' ? 'bg-blue-50 border-blue-200 text-blue-main' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>All</button>
                            <button onClick={() => setFilterLevel("beginner")} className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${filterLevel === 'beginner' ? 'bg-blue-50 border-blue-200 text-blue-main' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{tCommon('beginner')}</button>
                            <button onClick={() => setFilterLevel("intermediate")} className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${filterLevel === 'intermediate' ? 'bg-blue-50 border-blue-200 text-blue-main' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{tCommon('intermediate')}</button>
                            <button onClick={() => setFilterLevel("advanced")} className={`px-5 py-2 rounded-full border text-sm font-medium transition-colors ${filterLevel === 'advanced' ? 'bg-blue-50 border-blue-200 text-blue-main' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>{tCommon('advanced')}</button>
                        </div>
                    </div>

                    {/* 🔥 Карточка трека (FLL Robotics Engineering & Inspire Track) */}
                    <div className="w-full bg-white border-2 border-blue-100/50 rounded-2xl p-8 mb-16 shadow-md flex flex-col lg:flex-row gap-10">
                        {/* Левая половина Карточки трека */}
                        <div className="w-full lg:w-2/5 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-6 pt-2">
                                    <div className="relative h-[25px] w-[80px]">
                                        <Image src="/images/Group 2.png" alt="FIRST Logo" fill className="object-contain object-left" />
                                    </div>
                                    <div className="relative h-[25px] w-[80px]">
                                        <Image src="/images/tagylym.png" alt="Tagylym Logo" fill className="object-contain object-left" />
                                    </div>
                                    <span className="text-xs font-bold text-text-light-gray -ml-2 hidden xl:inline-block">x</span>
                                    <span className="text-xl font-black italic tracking-tight text-blue-main hidden xl:inline-block">FIRST LEGO League</span>
                                </div>
                                <h3 className="text-2xl font-bold text-text-dark mb-4 leading-snug">
                                    FLL Robotics Engineering <br /> & Innovation Track
                                </h3>
                                <p className="text-xs text-text-light-gray leading-relaxed mb-8 pr-4">
                                    Robot Design (FLL), стратегия миссий, управление моторами и механизмами, работа с датчиками (цвет/гиро/дистанция), программирование автономок на SPIKE/EV3 (Blocks/Python), базовая документация/портфолио, подготовка к Judging (Robot Design, Innovation Project, Core Values).
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex text-blue-main">
                                        <span className="text-lg">★</span><span className="text-lg">★</span><span className="text-lg text-gray-300">★</span>
                                    </div>
                                    <span className="text-xs font-semibold text-text-dark">{tCommon('beginner')} - {tCommon('intermediate')}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-xs text-text-light-gray">4 {t('months')}</span>
                                </div>
                                <Link href="/fll" className="inline-flex items-center justify-center gap-2 bg-blue-main text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                    {t('startLearning')}
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </Link>
                            </div>
                        </div>

                        {/* Правая половина Карточки трека (4 блока курсов внутри) */}
                        <div className="w-full lg:w-3/5 grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
                            {[
                                { title: "FLL CHALLENGE: ТРЕК CODING (Программирование)", img: "/images/course-coding.png" },
                                { title: "FLL CHALLENGE: ТРЕК Building / Design (Конструирование)", img: "/images/course-build.png" },
                                { title: "FLL CHALLENGE: ТРЕК Innovation Project", img: "/images/course-coding.png" },
                                { title: "FLL CHALLENGE: ТРЕК Core Values & Strategy", img: "/images/course-coding.png" }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col text-left group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 p-2 hover:shadow-md transition-all">
                                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 relative bg-gray-50 border border-gray-200/50 group-hover:border-blue-200/50">
                                        <Image src={step.img} alt={step.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="font-bold text-[10px] sm:text-[11px] text-text-dark mb-1 leading-snug line-clamp-3">{step.title}</div>
                                    <div className="text-[10px] text-text-light-gray mt-auto pt-2">{t('courseOf', { current: idx + 1, total: 4 })}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 🧱 Сетка курсов (Модули) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 mb-12 lg:grid-cols-3 gap-8">
                        {displayedCourses.map((mod, idx) => (
                            <div key={idx} className="bg-white border border-gray-200 group rounded-[20px] overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col h-full cursor-pointer hover:-translate-y-1">
                                {/* Шапка карточки */}
                                <div className="h-[200px] relative w-full border-b border-gray-100 overflow-hidden bg-gray-50">
                                    <Image src={mod.img} alt={mod.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-text-dark text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-[0_2px_10px_rgba(0,0,0,0.05)] border border-gray-100">
                                        {t('preview')}
                                    </div>
                                </div>
                                {/* Тело карточки */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <span className="text-blue-main text-xs font-semibold tracking-wide mb-3">{t('freeCourse')}</span>
                                    <h4 className="font-bold text-lg text-text-dark leading-snug mb-3">
                                        {mod.title}
                                    </h4>
                                    <p className="text-sm text-text-light-gray line-clamp-3 mb-6 flex-grow leading-relaxed">
                                        {mod.desc}
                                    </p>

                                    {/* Футер карточки */}
                                    <div className="border-t border-gray-100 pt-5 mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-blue-main text-sm">★</span>
                                            <span className="font-bold text-sm text-text-dark">{mod.levelText}</span>
                                        </div>
                                        <div className="text-[13px] font-medium text-text-light-gray bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                                            {t('weeks')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>
        </div>
    );
}

"use client";

import { useState } from "react";
import Link from "next/link";

// FTC Course tracks based on Figma design
const ftcTracks = [
    {
        id: 1,
        title: "FTC: ТРЕК CODING",
        subtitle: "(Программирование)",
        image: "coding",
    },
    {
        id: 2,
        title: "FTC: ТРЕК CADing",
        subtitle: "(Проектирование)",
        image: "cad",
    },
    {
        id: 3,
        title: "FTC: ТРЕК Building",
        subtitle: "",
        image: "building",
    },
    {
        id: 4,
        title: "FTC: ТРЕК Inspire",
        subtitle: "",
        image: "inspire",
    },
];

// Course cards data
const courses = [
    {
        id: "ftc-coding",
        title: "FTC: TPEK CODING (Программирование)",
        description: "Введение в экосистему FTC. Android Studio, SDK, структура проекта. OpMode: TeleOp vs Autonomous. Базовый шаблон.",
        level: "Beginner",
        duration: "1 - 4 Недели",
        image: "/images/course-coding.png",
        isFree: true,
    },
    {
        id: "ftc-cading",
        title: "FTC: TPEK CADing (Проектирование)",
        description: "Моделирование стандартных деталей FTC. Создание моделий уголков, пластин, валов. Работа с библиотекой компонентов REV/GoBilda.",
        level: "Beginner",
        duration: "1 - 4 Недели",
        image: "/images/course-cad.png",
        isFree: true,
    },
    {
        id: "ftc-building",
        title: "FTC: TPEK Building",
        description: "Механизмы сезона: от идеи к железу. Анализ игровой задачи, выбор концепции механизма (аккумуляция, доставка, размещение).",
        level: "Intermediate",
        duration: "1 - 4 Недели",
        image: "/images/course-build.png",
        isFree: true,
    },
];

const levels = ["3 Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesSection() {
    const [activeLevel, setActiveLevel] = useState("3 Levels");

    return (
        <section id="courses" className="py-16 md:py-24 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A2E]">
                        Курсы
                    </h2>

                    {/* Level filters */}
                    <div className="flex flex-wrap gap-2">
                        {levels.map((level) => (
                            <button
                                key={level}
                                onClick={() => setActiveLevel(level)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeLevel === level
                                    ? "bg-[#2563EB] text-white"
                                    : "bg-white text-[#4A5568] border border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Course Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                                {/* Preview Badge */}
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A1A2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                    Preview
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <p className="text-sm text-[#5B7CFA] font-medium mb-2">Свободный курс</p>
                                <h4 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#2563EB] transition-colors leading-tight">
                                    {course.title}
                                </h4>
                                <p className="text-sm text-[#718096] mb-6 line-clamp-3 leading-relaxed flex-1">
                                    {course.description}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2">
                                        <div className="flex text-[#1A1A2E]">
                                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-bold text-[#1A1A2E]">{course.level}</span>
                                    </div>
                                    <span className="text-sm text-[#718096] font-medium">{course.duration}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Load more */}
                <div className="text-center mt-10">
                    <Link
                        href="/courses"
                        className="inline-flex items-center gap-2 text-[#2563EB] font-medium hover:underline"
                    >
                        Смотреть все курсы
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

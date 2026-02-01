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
        id: "ftc-coding-1",
        title: "FTC: ТРЕК CODING (Программирование)",
        description: "Введение в экосистему FTC, Android Studio, SDK, структура проекта, OpMode: TeleOp vs Autonomous, Базовый шаблон.",
        level: "Beginner",
        duration: "1 - 4 Недели",
        isFree: true,
    },
    {
        id: "ftc-coding-2",
        title: "FTC: ТРЕК CODING (Программирование)",
        description: "Управление моторами и сервоприводами. Классы DcMotor и Servo. Настройка конфигурации на Control Hub. Простое движение по джойстику.",
        level: "Beginner",
        duration: "1 - 4 Недели",
        isFree: true,
    },
    {
        id: "ftc-coding-3",
        title: "FTC: ТРЕК CODING (Программирование)",
        description: "Введение в экосистему FTC, Android Studio, SDK, структура проекта, OpMode: TeleOp vs Autonomous, Базовый шаблон.",
        level: "Beginner",
        duration: "1 - 4 Недели",
        isFree: true,
    },
];

const levels = ["3 Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesSection() {
    const [activeLevel, setActiveLevel] = useState("3 Levels");

    return (
        <section id="courses" className="py-16 md:py-24 bg-white">
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
                                        : "bg-gray-100 text-[#4A5568] hover:bg-gray-200"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main FTC Course Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left - Course Info */}
                        <div>
                            {/* FIRST Tech Challenge Logo */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    <svg className="w-10 h-10 text-[#2563EB]" viewBox="0 0 40 40" fill="currentColor">
                                        <path d="M20 5L5 12l15 7 15-7-15-7zM5 28l15 7 15-7M5 20l15 7 15-7" />
                                    </svg>
                                    <div className="text-xs font-bold text-[#E53935] leading-tight">
                                        <div>FIRST</div>
                                        <div className="text-[#2563EB]">TECH</div>
                                        <div>CHALLENGE</div>
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-[#1A1A2E] mb-3">
                                FTC Robotics Engineering<br />
                                & Inspire Track
                            </h3>

                            <p className="text-xs text-[#718096] mb-4 leading-relaxed">
                                Robot Design, FTC Game Strategy, Motor & Servo Control, Sensor Integration,
                                Autonomous & TeleOp Programming (Blocks/Java), CAD Basics, Engineering
                                Notebook, Judging & Inspire/Connect Prep.
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex text-yellow-400">
                                    <span>★</span>
                                    <span>★</span>
                                    <span>★</span>
                                    <span className="text-gray-300">★</span>
                                    <span className="text-gray-300">★</span>
                                </div>
                                <span className="text-xs text-[#718096]">4 months · Earn degree credit</span>
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/courses/ftc-robotics"
                                className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1D4ED8] transition-colors"
                            >
                                Начни обучение
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Link>
                        </div>

                        {/* Right - Track Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {ftcTracks.map((track, index) => (
                                <div
                                    key={track.id}
                                    className="bg-gray-50 rounded-xl p-3 flex flex-col items-center text-center"
                                >
                                    {/* Placeholder image */}
                                    <div className="w-full h-20 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mb-2 flex items-center justify-center">
                                        <span className="text-2xl">
                                            {track.image === "coding" && "💻"}
                                            {track.image === "cad" && "📐"}
                                            {track.image === "building" && "🔧"}
                                            {track.image === "inspire" && "🏆"}
                                        </span>
                                    </div>
                                    <p className="text-xs font-medium text-[#1A1A2E] leading-tight">
                                        {track.title}
                                        {track.subtitle && (
                                            <span className="block text-[#718096]">{track.subtitle}</span>
                                        )}
                                    </p>
                                    <p className="text-[10px] text-[#718096] mt-1">Курс {index + 1} из 4</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                        >
                            {/* Image */}
                            <div className="relative h-40 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                <span className="text-4xl opacity-50">💻</span>
                                {/* Preview badge */}
                                <div className="absolute top-3 right-3 bg-white text-[#2563EB] text-xs font-medium px-2 py-1 rounded">
                                    Preview
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <p className="text-xs text-[#2563EB] font-medium mb-1">Свободный курс</p>
                                <h4 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#2563EB] transition-colors">
                                    {course.title}
                                </h4>
                                <p className="text-xs text-[#718096] mb-3 line-clamp-3">
                                    {course.description}
                                </p>

                                {/* Meta */}
                                <div className="flex items-center gap-2 text-xs text-[#718096]">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-medium">{course.level}</span>
                                </div>
                                <p className="text-xs text-[#718096] mt-1">{course.duration}</p>
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

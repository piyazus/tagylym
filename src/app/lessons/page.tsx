"use client";

import { useState } from "react";
import Link from "next/link";

// Lesson data based on the Figma design (Kazakh language lessons)
const lessons = [
    {
        id: "1",
        title: "1-дәріс. Кіріспе",
        description: "Курсқа кіріспе және робототехникаға танысу",
        completed: true,
    },
    {
        id: "2",
        title: "2-дәріс. Ұстаздықтың мәні, мақсаты және мағынасы",
        description: "Ұстаздық мамандығының негіздері",
        completed: true,
    },
    {
        id: "3",
        title: "3-дәріс. Білім алу процесі",
        description: "Білім алу әдістері мен тәсілдері",
        completed: false,
    },
    {
        id: "4",
        title: "4-дәріс. Үйрену мен оқыту",
        description: "Оқыту және үйрену процесінің ерекшеліктері",
        completed: false,
    },
    {
        id: "5",
        title: "5-дәріс. Жаратылыс пен тәрбие",
        description: "Тәрбие берудің табиғи әдістері",
        completed: false,
    },
    {
        id: "6",
        title: "6-дәріс. Тілді білім беру мен оқытудың негізгі қағидаттары",
        description: "Тіл үйретудің негізгі принциптері",
        completed: false,
    },
    {
        id: "7",
        title: "7-дәріс. Оқытуға жағдай жасау, әлеуметтік қоршаған орта",
        description: "Оқыту ортасын ұйымдастыру",
        completed: false,
    },
    {
        id: "8",
        title: "8-дәріс. Ұстаздар мен оқушылар арасындағы қарым-қатынас",
        description: "Педагогикалық қарым-қатынас негіздері",
        completed: false,
    },
];

export default function LessonsPage() {
    const [activeLesson, setActiveLesson] = useState<string | null>("3");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
                <div className="flex items-center justify-between h-full px-4 lg:px-6">
                    {/* Left - Back button and title */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-[#1A1A2E] hover:bg-gray-100 rounded-lg"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-[#1A1A2E] hover:text-[#1E5AFF] transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            <span className="hidden sm:inline font-medium">
                                Начало обучения
                            </span>
                        </Link>
                    </div>

                    {/* Center - Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1E5AFF] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">T</span>
                        </div>
                        <span className="text-xl font-bold text-[#1E5AFF]">Tagylym</span>
                    </Link>

                    {/* Right - Close button */}
                    <Link
                        href="/"
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Link>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        } pt-16 lg:pt-0`}
                >
                    <div className="h-full overflow-y-auto">
                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-[#E2E8F0]">
                            <h2 className="text-xl font-bold text-[#1A1A2E]">Уроки</h2>
                            <p className="text-sm text-[#4A5568] mt-1">
                                {lessons.filter((l) => l.completed).length} из {lessons.length}{" "}
                                завершено
                            </p>
                            {/* Progress bar */}
                            <div className="mt-3 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#1E5AFF] rounded-full transition-all"
                                    style={{
                                        width: `${(lessons.filter((l) => l.completed).length /
                                                lessons.length) *
                                            100
                                            }%`,
                                    }}
                                ></div>
                            </div>
                        </div>

                        {/* Lessons List */}
                        <div className="p-4">
                            <ul className="space-y-2">
                                {lessons.map((lesson) => (
                                    <li key={lesson.id}>
                                        <button
                                            onClick={() => {
                                                setActiveLesson(lesson.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-3 ${activeLesson === lesson.id
                                                    ? "bg-[#E8F0FE] border-l-4 border-[#1E5AFF]"
                                                    : "hover:bg-[#F5F7FA]"
                                                }`}
                                        >
                                            {/* Status icon */}
                                            <div
                                                className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-gray-100 text-gray-400"
                                                    }`}
                                            >
                                                {lesson.completed ? (
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                                )}
                                            </div>
                                            {/* Lesson info */}
                                            <div className="flex-1 min-w-0">
                                                <p
                                                    className={`font-medium text-sm ${activeLesson === lesson.id
                                                            ? "text-[#1E5AFF]"
                                                            : "text-[#1A1A2E]"
                                                        }`}
                                                >
                                                    {lesson.title}
                                                </p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-4xl mx-auto">
                        {activeLesson ? (
                            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10">
                                <div className="mb-8">
                                    <span className="text-[#1E5AFF] text-sm font-medium">
                                        Урок {activeLesson}
                                    </span>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A2E] mt-2">
                                        {lessons.find((l) => l.id === activeLesson)?.title}
                                    </h1>
                                    <p className="text-[#4A5568] mt-2">
                                        {lessons.find((l) => l.id === activeLesson)?.description}
                                    </p>
                                </div>

                                {/* Video placeholder */}
                                <div className="aspect-video bg-[#1A1A2E] rounded-xl flex items-center justify-center mb-8">
                                    <div className="text-center text-white">
                                        <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                                            <svg
                                                className="w-10 h-10"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                        <p className="text-white/80">Видео урок</p>
                                    </div>
                                </div>

                                {/* Lesson content placeholder */}
                                <div className="prose prose-lg max-w-none">
                                    <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">
                                        Содержание урока
                                    </h2>
                                    <p className="text-[#4A5568]">
                                        Здесь будет размещено содержание урока с текстовыми
                                        материалами, примерами кода и практическими заданиями.
                                    </p>
                                </div>

                                {/* Navigation buttons */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-[#E2E8F0]">
                                    <button
                                        className="btn-secondary flex items-center gap-2"
                                        disabled={activeLesson === "1"}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                        Предыдущий урок
                                    </button>
                                    <button className="btn-primary flex items-center gap-2">
                                        Следующий урок
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-[#4A5568]">Выберите урок из списка слева</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

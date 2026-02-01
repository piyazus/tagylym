import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Course data - in real app this would come from a database
const coursesData: Record<string, {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    level: string;
    duration: string;
    lessonsCount: number;
    modules: { title: string; lessons: string[] }[];
}> = {
    "ftc-robotics-engineering": {
        id: "ftc-robotics-engineering",
        title: "FTC Robotics Engineering & Inspire Track",
        description: "Изучите основы робототехники и инженерии для соревнований FIRST Tech Challenge",
        longDescription: "Этот курс предназначен для тех, кто хочет начать свой путь в робототехнике. Вы изучите основы механики, электроники и программирования роботов для соревнований FTC. Курс охватывает все аспекты: от проектирования до программирования автономного движения.",
        level: "Начинающий",
        duration: "12 недель",
        lessonsCount: 24,
        modules: [
            {
                title: "Введение в FTC",
                lessons: ["Что такое FTC?", "Правила соревнований", "Обзор платформы"],
            },
            {
                title: "Механика робота",
                lessons: ["Основы механики", "Типы приводов", "Сборка шасси"],
            },
            {
                title: "Электроника",
                lessons: ["Контроллеры", "Моторы и сервоприводы", "Датчики"],
            },
            {
                title: "Программирование",
                lessons: ["Настройка среды", "Базовое управление", "Автономный режим"],
            },
        ],
    },
    "ftc-first-coding-1": {
        id: "ftc-first-coding-1",
        title: "FTC FIRST CODING - Модуль 1",
        description: "Основы программирования роботов на Java для платформы FTC",
        longDescription: "Первый модуль серии курсов по программированию FTC роботов. Вы изучите основы Java, настройку Android Studio и написание первых программ для управления роботом.",
        level: "Начинающий",
        duration: "8 недель",
        lessonsCount: 16,
        modules: [
            {
                title: "Основы Java",
                lessons: ["Переменные и типы данных", "Условные операторы", "Циклы", "Массивы"],
            },
            {
                title: "Android Studio",
                lessons: ["Установка и настройка", "Структура проекта FTC", "Подключение к роботу"],
            },
            {
                title: "OpMode",
                lessons: ["LinearOpMode", "Телеуправление", "Работа с моторами"],
            },
        ],
    },
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CoursePage({ params }: PageProps) {
    const { id } = await params;
    const course = coursesData[id];

    if (!course) {
        return (
            <>
                <Header />
                <main className="pt-20 min-h-screen bg-[#F5F7FA] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#1A1A2E] mb-4">
                            Курс не найден
                        </h1>
                        <p className="text-[#4A5568] mb-8">
                            Возможно, этот курс ещё в разработке
                        </p>
                        <Link href="/courses" className="btn-primary">
                            Вернуться к курсам
                        </Link>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="pt-20 min-h-screen bg-[#F5F7FA]">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#1E5AFF] to-[#0D47A1] py-16 md:py-24">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                                {course.level}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {course.title}
                            </h1>
                            <p className="text-white/80 text-lg mb-8">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span>{course.lessonsCount} уроков</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{course.duration}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Content */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                {/* About */}
                                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
                                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">
                                        О курсе
                                    </h2>
                                    <p className="text-[#4A5568] leading-relaxed">
                                        {course.longDescription}
                                    </p>
                                </div>

                                {/* Modules */}
                                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">
                                        Программа курса
                                    </h2>
                                    <div className="space-y-4">
                                        {course.modules.map((module, index) => (
                                            <div
                                                key={index}
                                                className="border border-[#E2E8F0] rounded-xl overflow-hidden"
                                            >
                                                <div className="bg-[#F5F7FA] px-5 py-4 flex items-center justify-between">
                                                    <h3 className="font-semibold text-[#1A1A2E]">
                                                        Модуль {index + 1}: {module.title}
                                                    </h3>
                                                    <span className="text-sm text-[#718096]">
                                                        {module.lessons.length} уроков
                                                    </span>
                                                </div>
                                                <ul className="divide-y divide-[#E2E8F0]">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li
                                                            key={lessonIndex}
                                                            className="px-5 py-3 flex items-center gap-3 text-[#4A5568] hover:bg-[#F5F7FA] transition-colors"
                                                        >
                                                            <span className="w-6 h-6 bg-[#E8F0FE] text-[#1E5AFF] rounded-full flex items-center justify-center text-xs font-medium">
                                                                {lessonIndex + 1}
                                                            </span>
                                                            <span>{lesson}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div>
                                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                    <div className="aspect-video bg-gradient-to-br from-[#1E5AFF] to-[#0D47A1] rounded-xl flex items-center justify-center mb-6">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <Link
                                        href="/lessons"
                                        className="btn-primary w-full py-4 text-center block mb-4"
                                    >
                                        Начать обучение
                                    </Link>
                                    <p className="text-center text-[#718096] text-sm">
                                        Бесплатно • Без регистрации
                                    </p>

                                    <div className="border-t border-[#E2E8F0] mt-6 pt-6">
                                        <h4 className="font-semibold text-[#1A1A2E] mb-4">
                                            Что вы получите:
                                        </h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-center gap-3 text-[#4A5568] text-sm">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Видеоуроки
                                            </li>
                                            <li className="flex items-center gap-3 text-[#4A5568] text-sm">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Практические задания
                                            </li>
                                            <li className="flex items-center gap-3 text-[#4A5568] text-sm">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Поддержка сообщества
                                            </li>
                                            <li className="flex items-center gap-3 text-[#4A5568] text-sm">
                                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Сертификат
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ftcCodingCourse = {
    id: 'ftc-coding',
    title: 'FTC CODING: Программирование роботов',
    description: 'Полный курс по программированию роботов FTC на Java - от основ до продвинутых техник',
    longDescription: 'Этот курс охватывает все аспекты программирования роботов для соревнований FIRST Tech Challenge. Вы изучите основы Java, работу с Android Studio и FTC SDK, управление моторами и датчиками, создание автономных программ, компьютерное зрение и продвинутые алгоритмы навигации.',
    level: 'Все уровни',
    duration: '12 уроков',
    lessonsCount: 12,
    modules: [
        {
            title: 'Основы (Beginner)',
            lessons: [
                'Введение в экосистему FTC',
                'Управление моторами и сервоприводами',
                'Работа с датчиками',
                'Автономные программы и таймеры'
            ]
        },
        {
            title: 'Средний уровень (Intermediate)',
            lessons: [
                'Точное движение с энкодерами',
                'Гироскоп и навигация',
                'Конечные автоматы (State Machines)',
                'Компьютерное зрение (AprilTags)'
            ]
        },
        {
            title: 'Продвинутый уровень (Advanced)',
            lessons: [
                'Продвинутая навигация с Road Runner',
                'Продвинутые архитектурные паттерны',
                'Искусственный интеллект и компьютерное зрение',
                'Профессиональная разработка и соревнования'
            ]
        }
    ]
};

export default function FtcCodingCoursePage() {
    return (
        <>
            <Header />
            <main className="pt-20 min-h-screen bg-[#F5F7FA]">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#1E5AFF] to-[#0D47A1] py-16 md:py-24">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                                {ftcCodingCourse.level}
                            </span>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {ftcCodingCourse.title}
                            </h1>
                            <p className="text-white/80 text-lg mb-8">
                                {ftcCodingCourse.description}
                            </p>
                            <div className="flex flex-wrap gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span>{ftcCodingCourse.lessonsCount} уроков</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Квизы и задания</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                    <span>Примеры кода</span>
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
                                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8">
                                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-4">О курсе</h2>
                                    <p className="text-[#4A5568] leading-relaxed">{ftcCodingCourse.longDescription}</p>
                                </div>

                                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                                    <h2 className="text-2xl font-bold text-[#1A1A2E] mb-6">Программа курса</h2>
                                    <div className="space-y-4">
                                        {ftcCodingCourse.modules.map((module, index) => (
                                            <div key={index} className="border border-[#E2E8F0] rounded-xl overflow-hidden">
                                                <div className="bg-[#F5F7FA] px-5 py-4 flex items-center justify-between">
                                                    <h3 className="font-semibold text-[#1A1A2E]">
                                                        Модуль {index + 1}: {module.title}
                                                    </h3>
                                                    <span className="text-sm text-[#718096]">{module.lessons.length} уроков</span>
                                                </div>
                                                <ul className="divide-y divide-[#E2E8F0]">
                                                    {module.lessons.map((lesson, lessonIndex) => (
                                                        <li key={lessonIndex} className="px-5 py-3 flex items-center gap-3 text-[#4A5568] hover:bg-[#F5F7FA] transition-colors">
                                                            <span className="w-6 h-6 bg-[#E8F0FE] text-[#1E5AFF] rounded-full flex items-center justify-center text-xs font-medium">
                                                                {index * 4 + lessonIndex + 1}
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
                                        <div className="text-center text-white">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </div>
                                            <p className="text-sm opacity-80">Java / FTC SDK</p>
                                        </div>
                                    </div>
                                    <Link href="/courses/ftc-coding/lessons" className="btn-primary w-full py-4 text-center block mb-4">
                                        Начать обучение
                                    </Link>
                                    <p className="text-center text-[#718096] text-sm">Бесплатно • Интерактивные уроки</p>

                                    <div className="border-t border-[#E2E8F0] mt-6 pt-6">
                                        <h4 className="font-semibold text-[#1A1A2E] mb-4">Что вы изучите:</h4>
                                        <ul className="space-y-3">
                                            {['Основы Java для FTC', 'Управление моторами и датчиками', 'Автономные программы', 'Компьютерное зрение', 'Road Runner навигация', 'Подготовка к соревнованиям'].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[#4A5568] text-sm">
                                                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
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

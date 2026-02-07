'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allLegoRoboticsLessons } from '@/data';
import { CodeBlock, Quiz, TaskCard, NoteBlock } from '@/components/lessons';

export default function LegoRoboticsLessonsPage() {
    const [activeLesson, setActiveLesson] = useState<string>('lego-lesson-1');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('lego-robotics-progress');
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        localStorage.setItem('lego-robotics-progress', JSON.stringify(completedLessons));
    }, [completedLessons]);

    const currentLesson = allLegoRoboticsLessons.find(l => l.id === activeLesson);
    const currentIndex = allLegoRoboticsLessons.findIndex(l => l.id === activeLesson);
    const prevLesson = currentIndex > 0 ? allLegoRoboticsLessons[currentIndex - 1] : null;
    const nextLesson = currentIndex < allLegoRoboticsLessons.length - 1 ? allLegoRoboticsLessons[currentIndex + 1] : null;

    const toggleLessonComplete = (lessonId: string) => {
        setCompletedLessons(prev =>
            prev.includes(lessonId)
                ? prev.filter(id => id !== lessonId)
                : [...prev, lessonId]
        );
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getLevelText = (level: string) => {
        switch (level) {
            case 'beginner': return 'Начинающий';
            case 'intermediate': return 'Продвинутый';
            case 'advanced': return 'Эксперт';
            default: return level;
        }
    };

    const progress = Math.round((completedLessons.length / allLegoRoboticsLessons.length) * 100);

    return (
        <div className="min-h-screen bg-[#0A0A0F] flex">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-[#0D0D12] border-r border-white/10 transition-all duration-300 overflow-hidden flex-shrink-0`}>
                <div className="p-4 border-b border-white/10">
                    <Link href="/courses/lego-robotics" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        К обзору курса
                    </Link>
                    <h2 className="text-lg font-bold text-white">LEGO Robotics</h2>
                    <p className="text-sm text-white/50">FLL Challenge</p>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-white/50 mb-1">
                            <span>Прогресс</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Lessons list */}
                <nav className="p-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                    {/* Module 1: Beginner */}
                    <div className="mb-4">
                        <div className="px-3 py-2 text-xs font-semibold text-orange-400 uppercase tracking-wider">
                            Модуль 1: Beginner
                        </div>
                        {allLegoRoboticsLessons.slice(0, 4).map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson.id)}
                                className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-start gap-3 transition-all ${activeLesson === lesson.id
                                        ? 'bg-orange-500/20 border border-orange-500/30'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${completedLessons.includes(lesson.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white/10 text-white/70'
                                    }`}>
                                    {completedLessons.includes(lesson.id) ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{lesson.number}</span>
                                    )}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${activeLesson === lesson.id ? 'text-white' : 'text-white/70'}`}>
                                        {lesson.title}
                                    </div>
                                    <div className="text-xs text-white/40 mt-0.5">{lesson.duration}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Module 2: Intermediate */}
                    <div className="mb-4">
                        <div className="px-3 py-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider">
                            Модуль 2: Intermediate
                        </div>
                        {allLegoRoboticsLessons.slice(4, 8).map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson.id)}
                                className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-start gap-3 transition-all ${activeLesson === lesson.id
                                        ? 'bg-yellow-500/20 border border-yellow-500/30'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${completedLessons.includes(lesson.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white/10 text-white/70'
                                    }`}>
                                    {completedLessons.includes(lesson.id) ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{lesson.number}</span>
                                    )}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${activeLesson === lesson.id ? 'text-white' : 'text-white/70'}`}>
                                        {lesson.title}
                                    </div>
                                    <div className="text-xs text-white/40 mt-0.5">{lesson.duration}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Module 3: Advanced */}
                    <div className="mb-4">
                        <div className="px-3 py-2 text-xs font-semibold text-red-400 uppercase tracking-wider">
                            Модуль 3: Advanced
                        </div>
                        {allLegoRoboticsLessons.slice(8, 12).map(lesson => (
                            <button
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson.id)}
                                className={`w-full text-left px-3 py-3 rounded-lg mb-1 flex items-start gap-3 transition-all ${activeLesson === lesson.id
                                        ? 'bg-red-500/20 border border-red-500/30'
                                        : 'hover:bg-white/5'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${completedLessons.includes(lesson.id)
                                        ? 'bg-green-500 text-white'
                                        : 'bg-white/10 text-white/70'
                                    }`}>
                                    {completedLessons.includes(lesson.id) ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{lesson.number}</span>
                                    )}
                                </div>
                                <div>
                                    <div className={`text-sm font-medium ${activeLesson === lesson.id ? 'text-white' : 'text-white/70'}`}>
                                        {lesson.title}
                                    </div>
                                    <div className="text-xs text-white/40 mt-0.5">{lesson.duration}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </nav>
            </aside>

            {/* Toggle sidebar button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-[#1A1A2E] text-white/70 hover:text-white p-2 rounded-r-lg border border-l-0 border-white/10 transition-all"
                style={{ left: sidebarOpen ? '320px' : '0' }}
            >
                <svg className={`w-5 h-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                {currentLesson && (
                    <div className="max-w-4xl mx-auto px-6 py-12">
                        {/* Lesson header */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getLevelColor(currentLesson.level)}`}>
                                    {getLevelText(currentLesson.level)}
                                </span>
                                <span className="text-white/50 text-sm">
                                    Урок {currentLesson.number} из {allLegoRoboticsLessons.length}
                                </span>
                                <span className="text-white/50 text-sm">•</span>
                                <span className="text-white/50 text-sm">{currentLesson.duration}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {currentLesson.title}
                            </h1>

                            <p className="text-lg text-white/60">
                                {currentLesson.description}
                            </p>
                        </div>

                        {/* Lesson content */}
                        <div className="space-y-10 lesson-content">
                            {currentLesson.sections.map(section => (
                                <section key={section.id} className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        {section.title}
                                    </h2>

                                    <div className="space-y-4">
                                        {section.blocks.map((block, idx) => {
                                            switch (block.type) {
                                                case 'text':
                                                    return <p key={idx} className="text-[#A0AEC0] leading-relaxed">{block.content}</p>;
                                                case 'heading':
                                                    if (block.level === 2) return <h2 key={idx} className="text-xl font-bold text-white mt-6 mb-3">{block.content}</h2>;
                                                    if (block.level === 3) return <h3 key={idx} className="text-lg font-bold text-white mt-6 mb-3">{block.content}</h3>;
                                                    return <h4 key={idx} className="font-bold text-white mt-6 mb-3">{block.content}</h4>;
                                                case 'code':
                                                    return <CodeBlock key={idx} code={block.content} language={block.language} filename={block.filename} />;
                                                case 'list':
                                                    return block.ordered ? (
                                                        <ol key={idx} className="mb-4 pl-6 list-decimal text-[#A0AEC0] space-y-2">
                                                            {block.items.map((item, i) => <li key={i}>{item}</li>)}
                                                        </ol>
                                                    ) : (
                                                        <ul key={idx} className="mb-4 pl-6 list-disc text-[#A0AEC0] space-y-2">
                                                            {block.items.map((item, i) => <li key={i}>{item}</li>)}
                                                        </ul>
                                                    );
                                                case 'note':
                                                    return <NoteBlock key={idx} variant={block.variant}>{block.content}</NoteBlock>;
                                                default:
                                                    return null;
                                            }
                                        })}
                                    </div>
                                </section>
                            ))}

                            {/* Practical tasks */}
                            {currentLesson.practicalTasks && currentLesson.practicalTasks.length > 0 && (
                                <section className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 md:p-8 border border-orange-500/20">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        </div>
                                        Практические задания
                                    </h2>

                                    <div className="space-y-4">
                                        {currentLesson.practicalTasks.map((task, idx) => (
                                            <TaskCard
                                                key={idx}
                                                title={task.title}
                                                description={task.description}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Quiz */}
                            {currentLesson.quiz && currentLesson.quiz.length > 0 && (
                                <section className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
                                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        Проверьте себя
                                    </h2>

                                    <Quiz questions={currentLesson.quiz} />
                                </section>
                            )}
                        </div>

                        {/* Mark as complete / Navigation */}
                        <div className="mt-12 pt-8 border-t border-white/10">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <button
                                    onClick={() => toggleLessonComplete(currentLesson.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${completedLessons.includes(currentLesson.id)
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {completedLessons.includes(currentLesson.id) ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Урок пройден
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Отметить как пройденный
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center gap-3">
                                    {prevLesson && (
                                        <button
                                            onClick={() => setActiveLesson(prevLesson.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white/70 hover:text-white rounded-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Назад
                                        </button>
                                    )}

                                    {nextLesson && (
                                        <button
                                            onClick={() => setActiveLesson(nextLesson.id)}
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                                        >
                                            Следующий урок
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

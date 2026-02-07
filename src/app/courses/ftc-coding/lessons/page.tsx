'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { allFtcCodingLessons } from '@/data';
import { CodeBlock, Quiz, TaskCard, NoteBlock } from '@/components/lessons';

export default function FtcCodingLessonsPage() {
    const [activeLesson, setActiveLesson] = useState<string>('lesson-1');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('ftc-coding-progress');
        if (saved) {
            setCompletedLessons(JSON.parse(saved));
        }
    }, []);

    // Save progress
    const markComplete = (lessonId: string) => {
        const updated = [...completedLessons, lessonId];
        setCompletedLessons(updated);
        localStorage.setItem('ftc-coding-progress', JSON.stringify(updated));
    };

    const currentLesson = allFtcCodingLessons.find(l => l.id === activeLesson);
    const currentIndex = allFtcCodingLessons.findIndex(l => l.id === activeLesson);

    const goToNext = () => {
        if (currentIndex < allFtcCodingLessons.length - 1) {
            setActiveLesson(allFtcCodingLessons[currentIndex + 1].id);
            window.scrollTo(0, 0);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setActiveLesson(allFtcCodingLessons[currentIndex - 1].id);
            window.scrollTo(0, 0);
        }
    };

    const getLevelBadge = (level: string) => {
        const colors = {
            beginner: 'bg-green-100 text-green-700',
            intermediate: 'bg-yellow-100 text-yellow-700',
            advanced: 'bg-red-100 text-red-700'
        };
        const labels = {
            beginner: 'Начинающий',
            intermediate: 'Средний',
            advanced: 'Продвинутый'
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[level as keyof typeof colors]}`}>
                {labels[level as keyof typeof labels]}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-16">
                <div className="flex items-center justify-between h-full px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="lg:hidden p-2 text-[#1A1A2E] hover:bg-gray-100 rounded-lg"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <Link href="/courses/ftc-coding" className="flex items-center gap-2 text-[#1A1A2E] hover:text-[#1E5AFF] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="hidden sm:inline font-medium">К курсу</span>
                        </Link>
                    </div>

                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#1E5AFF] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">T</span>
                        </div>
                        <span className="text-xl font-bold text-[#1E5AFF]">Tagylym</span>
                    </Link>

                    <Link href="/" className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Link>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white shadow-lg transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} pt-16 lg:pt-0`}>
                    <div className="h-full overflow-y-auto">
                        <div className="p-6 border-b border-[#E2E8F0]">
                            <h2 className="text-xl font-bold text-[#1A1A2E]">FTC Coding</h2>
                            <p className="text-sm text-[#4A5568] mt-1">
                                {completedLessons.length} из {allFtcCodingLessons.length} завершено
                            </p>
                            <div className="mt-3 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#1E5AFF] rounded-full transition-all"
                                    style={{ width: `${(completedLessons.length / allFtcCodingLessons.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-4">
                            <ul className="space-y-2">
                                {allFtcCodingLessons.map((lesson) => (
                                    <li key={lesson.id}>
                                        <button
                                            onClick={() => {
                                                setActiveLesson(lesson.id);
                                                setSidebarOpen(false);
                                            }}
                                            className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-3 ${activeLesson === lesson.id ? 'bg-[#E8F0FE] border-l-4 border-[#1E5AFF]' : 'hover:bg-[#F5F7FA]'}`}
                                        >
                                            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${completedLessons.includes(lesson.id) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                {completedLessons.includes(lesson.id) ? (
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span className="text-xs font-medium">{lesson.number}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`font-medium text-sm ${activeLesson === lesson.id ? 'text-[#1E5AFF]' : 'text-[#1A1A2E]'}`}>
                                                    Урок {lesson.number}
                                                </p>
                                                <p className="text-xs text-[#718096] truncate">{lesson.title}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 lg:p-10">
                    <div className="max-w-4xl mx-auto">
                        {currentLesson && (
                            <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-10">
                                {/* Header */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[#1E5AFF] text-sm font-medium">Урок {currentLesson.number}</span>
                                        {getLevelBadge(currentLesson.level)}
                                        <span className="text-[#718096] text-sm">{currentLesson.duration}</span>
                                    </div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-[#1A1A2E] mt-2">{currentLesson.title}</h1>
                                    <p className="text-[#4A5568] mt-2">{currentLesson.description}</p>
                                </div>

                                {/* Sections */}
                                {currentLesson.sections.map((section) => (
                                    <div key={section.id} className="mb-10">
                                        <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 pb-2 border-b border-[#E2E8F0]">{section.title}</h2>
                                        {section.blocks.map((block, idx) => {
                                            switch (block.type) {
                                                case 'text':
                                                    return <p key={idx} className="text-[#4A5568] mb-4 leading-relaxed">{block.content}</p>;
                                                case 'heading':
                                                    if (block.level === 2) return <h2 key={idx} className="text-xl font-bold text-[#1A1A2E] mt-6 mb-3">{block.content}</h2>;
                                                    if (block.level === 3) return <h3 key={idx} className="text-lg font-bold text-[#1A1A2E] mt-6 mb-3">{block.content}</h3>;
                                                    return <h4 key={idx} className="font-bold text-[#1A1A2E] mt-6 mb-3">{block.content}</h4>;
                                                case 'code':
                                                    return <CodeBlock key={idx} code={block.content} language={block.language} filename={block.filename} />;
                                                case 'list':
                                                    return block.ordered ? (
                                                        <ol key={idx} className="mb-4 pl-6 list-decimal text-[#4A5568] space-y-1">
                                                            {block.items.map((item, i) => <li key={i}>{item}</li>)}
                                                        </ol>
                                                    ) : (
                                                        <ul key={idx} className="mb-4 pl-6 list-disc text-[#4A5568] space-y-1">
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
                                ))}

                                {/* Practical Tasks */}
                                {currentLesson.practicalTasks.length > 0 && (
                                    <div className="mb-10">
                                        <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 pb-2 border-b border-[#E2E8F0]">Практические задания</h2>
                                        {currentLesson.practicalTasks.map((task, idx) => (
                                            <TaskCard key={idx} title={task.title} description={task.description} subtasks={task.subtasks} hints={task.hints} />
                                        ))}
                                    </div>
                                )}

                                {/* Quiz */}
                                {currentLesson.quiz.length > 0 && (
                                    <div className="mb-10">
                                        <h2 className="text-xl font-bold text-[#1A1A2E] mb-4 pb-2 border-b border-[#E2E8F0]">Проверка знаний</h2>
                                        <Quiz questions={currentLesson.quiz} onComplete={(score, total) => {
                                            if (score >= total * 0.5) {
                                                markComplete(currentLesson.id);
                                            }
                                        }} />
                                    </div>
                                )}

                                {/* Navigation */}
                                <div className="flex justify-between mt-10 pt-6 border-t border-[#E2E8F0]">
                                    <button onClick={goToPrev} disabled={currentIndex === 0} className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Предыдущий
                                    </button>
                                    <button onClick={goToNext} disabled={currentIndex === allFtcCodingLessons.length - 1} className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                        Следующий
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

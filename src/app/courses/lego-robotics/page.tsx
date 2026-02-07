import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const legoRoboticsCourse = {
    id: 'lego-robotics',
    title: 'LEGO ROBOTICS: FLL Challenge',
    description: 'Полный курс программирования роботов LEGO SPIKE Prime и EV3 для соревнований FIRST LEGO League',
    longDescription: 'Освойте программирование роботов от базовых команд движения до сложных алгоритмов PID-регулятора и автономной навигации. Курс подготовлен специально для участников FLL Challenge и научит создавать стабильные, быстрые и эффективные программы для выполнения миссий.',
    level: 'Beginner → Advanced',
    duration: '12 уроков',
    lessonsCount: 12,
    image: '/courses/lego-robotics.jpg',
    color: 'from-orange-500 to-red-600',
    modules: [
        {
            title: 'Модуль 1: BEGINNER',
            description: 'Основы программирования LEGO роботов',
            lessons: [
                { number: 1, title: 'Знакомство со средой. «Привет, мир!»', description: 'Установка ПО, подключение робота, первая программа' },
                { number: 2, title: 'Точное движение. Контроль расстояния', description: 'Градусы, обороты и «золотые числа»' },
                { number: 3, title: 'Ветвление и циклы', description: 'Датчики, условия и автономное поведение' },
                { number: 4, title: 'Первый заход на миссию', description: 'Декомпозиция, планирование и отладка' }
            ]
        },
        {
            title: 'Модуль 2: INTERMEDIATE',
            description: 'Продвинутая навигация и структуры',
            lessons: [
                { number: 5, title: 'Работа с датчиками', description: 'Следование по линии и P-регулятор' },
                { number: 6, title: 'My Blocks', description: 'Создание переиспользуемых блоков' },
                { number: 7, title: 'Стратегия и отладка', description: 'Планирование заезда и анализ ошибок' },
                { number: 8, title: 'Программирование для стабильности', description: 'Обратная связь и выравнивание' }
            ]
        },
        {
            title: 'Модуль 3: ADVANCED',
            description: 'Экспертные техники и Python',
            lessons: [
                { number: 9, title: 'Сложные алгоритмы', description: 'PID, перекрёстки и массивы' },
                { number: 10, title: 'Оптимизация и тайм-менеджмент', description: 'Сокращение времени и планирование' },
                { number: 11, title: 'PyBricks (Python)', description: 'Текстовое программирование' },
                { number: 12, title: 'Код как Robot Design', description: 'Документация и объяснение судьям' }
            ]
        }
    ],
    features: [
        'Совместимо с SPIKE Prime и EV3',
        'Подготовка к FLL Challenge',
        'Практические задания на поле',
        'Пошаговые инструкции',
        'Интерактивные квизы',
        'От блоков до Python'
    ]
};

export default function LegoRoboticsCoursePage() {
    return (
        <div className="min-h-screen bg-[#0A0A0F]">
            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20" />
                <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium border border-orange-500/30">
                                FLL Challenge
                            </span>
                            <span className="px-4 py-2 bg-white/10 text-white/70 rounded-full text-sm">
                                {legoRoboticsCourse.duration}
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            LEGO <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">ROBOTICS</span>
                        </h1>

                        <p className="text-xl text-white/70 mb-8 leading-relaxed">
                            {legoRoboticsCourse.longDescription}
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            {legoRoboticsCourse.features.map((feature, idx) => (
                                <span key={idx} className="flex items-center gap-2 text-white/60">
                                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {feature}
                                </span>
                            ))}
                        </div>

                        <Link
                            href="/courses/lego-robotics/lessons"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
                        >
                            Начать обучение
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Modules Section */}
            <section className="py-20 bg-[#0D0D12]">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        Программа курса
                    </h2>

                    <div className="space-y-8 max-w-4xl mx-auto">
                        {legoRoboticsCourse.modules.map((module, moduleIdx) => (
                            <div key={moduleIdx} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                                <div className="p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-b border-white/10">
                                    <h3 className="text-xl font-bold text-white">{module.title}</h3>
                                    <p className="text-white/60 mt-1">{module.description}</p>
                                </div>

                                <div className="divide-y divide-white/5">
                                    {module.lessons.map((lesson, lessonIdx) => (
                                        <div key={lessonIdx} className="p-5 hover:bg-white/5 transition-colors">
                                            <div className="flex items-start gap-4">
                                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">
                                                    {lesson.number}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-semibold">{lesson.title}</h4>
                                                    <p className="text-white/50 text-sm mt-1">{lesson.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/courses/lego-robotics/lessons"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                        >
                            Начать с Урока 1
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* What You'll Learn */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">
                        Чему вы научитесь
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Точное движение</h3>
                            <p className="text-white/60">Градусы, обороты, калибровка и «золотые числа» для повторяемых результатов</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Сенсорная навигация</h3>
                            <p className="text-white/60">Следование по линии, гироскоп, P/PID-регуляторы и выравнивание</p>
                        </div>

                        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Стратегия FLL</h3>
                            <p className="text-white/60">Планирование заездов, оптимизация времени и подготовка к судьям</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

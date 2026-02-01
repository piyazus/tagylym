import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";

const allCourses = [
    {
        id: "ftc-robotics-engineering",
        title: "FTC Robotics Engineering & Inspire Track",
        description:
            "Изучите основы робототехники и инженерии для соревнований FIRST Tech Challenge",
        image: "/courses/ftc-robotics.jpg",
        level: "Начинающий",
        duration: "12 недель",
        lessonsCount: 24,
        category: "FTC",
    },
    {
        id: "ftc-first-coding-1",
        title: "FTC FIRST CODING - Модуль 1",
        description: "Основы программирования роботов на Java для платформы FTC",
        image: "/courses/ftc-coding-1.jpg",
        level: "Начинающий",
        duration: "8 недель",
        lessonsCount: 16,
        category: "FTC",
    },
    {
        id: "ftc-first-coding-2",
        title: "FTC FIRST CODING - Модуль 2",
        description: "Продвинутые алгоритмы и автономное управление роботом",
        image: "/courses/ftc-coding-2.jpg",
        level: "Средний",
        duration: "8 недель",
        lessonsCount: 16,
        category: "FTC",
    },
    {
        id: "ftc-first-coding-3",
        title: "FTC FIRST CODING - Модуль 3",
        description: "Компьютерное зрение и машинное обучение в робототехнике",
        image: "/courses/ftc-coding-3.jpg",
        level: "Продвинутый",
        duration: "10 недель",
        lessonsCount: 20,
        category: "FTC",
    },
    {
        id: "ftc-first-coding-4",
        title: "FTC FIRST CODING - Модуль 4",
        description: "Подготовка к соревнованиям и командная работа",
        image: "/courses/ftc-coding-4.jpg",
        level: "Продвинутый",
        duration: "6 недель",
        lessonsCount: 12,
        category: "FTC",
    },
    {
        id: "ftc-first-coding-5",
        title: "FTC FIRST CODING - Мастер-класс",
        description: "Практические проекты и реальные кейсы с соревнований",
        image: "/courses/ftc-coding-5.jpg",
        level: "Эксперт",
        duration: "8 недель",
        lessonsCount: 16,
        category: "FTC",
    },
    {
        id: "python-basics",
        title: "Основы Python",
        description: "Изучите основы программирования на Python с нуля",
        image: "/courses/python.jpg",
        level: "Начинающий",
        duration: "6 недель",
        lessonsCount: 12,
        category: "Программирование",
    },
    {
        id: "arduino-intro",
        title: "Введение в Arduino",
        description: "Создавайте электронные проекты с Arduino",
        image: "/courses/arduino.jpg",
        level: "Начинающий",
        duration: "8 недель",
        lessonsCount: 16,
        category: "Электроника",
    },
];

export default function CoursesPage() {
    return (
        <>
            <Header />
            <main className="pt-20 min-h-screen bg-[#F5F7FA]">
                {/* Page Header */}
                <section className="bg-gradient-to-r from-[#1E5AFF] to-[#0D47A1] py-16 md:py-24">
                    <div className="container-custom text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Все курсы
                        </h1>
                        <p className="text-white/80 text-lg max-w-2xl mx-auto">
                            Выберите курс и начните изучать робототехнику и программирование.
                            Все курсы абсолютно бесплатны!
                        </p>
                    </div>
                </section>

                {/* Courses Grid */}
                <section className="section">
                    <div className="container-custom">
                        {/* Filter (optional enhancement) */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            <button className="px-5 py-2 bg-[#1E5AFF] text-white rounded-full font-medium">
                                Все
                            </button>
                            <button className="px-5 py-2 bg-white text-[#4A5568] rounded-full font-medium hover:bg-[#E8F0FE] transition-colors">
                                FTC
                            </button>
                            <button className="px-5 py-2 bg-white text-[#4A5568] rounded-full font-medium hover:bg-[#E8F0FE] transition-colors">
                                Программирование
                            </button>
                            <button className="px-5 py-2 bg-white text-[#4A5568] rounded-full font-medium hover:bg-[#E8F0FE] transition-colors">
                                Электроника
                            </button>
                        </div>

                        {/* Courses */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {allCourses.map((course) => (
                                <CourseCard key={course.id} {...course} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

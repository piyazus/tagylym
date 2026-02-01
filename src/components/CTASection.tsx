import Link from "next/link";

export default function CTASection() {
    return (
        <section className="section bg-gradient-to-r from-[#1E5AFF] to-[#0D47A1] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Готовы начать обучение?
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-8">
                        Присоединяйтесь к тысячам учеников, которые уже изучают робототехнику
                        и программирование на нашей платформе. Это абсолютно бесплатно!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="bg-white text-[#1E5AFF] font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-105 text-center"
                        >
                            Создать аккаунт
                        </Link>
                        <Link
                            href="/#courses"
                            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all text-center"
                        >
                            Смотреть курсы
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

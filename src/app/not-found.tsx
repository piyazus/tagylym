import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1E5AFF] to-[#0D47A1] flex items-center justify-center p-4">
            <div className="text-center">
                {/* 404 Number */}
                <h1 className="text-[150px] md:text-[200px] font-bold text-white/20 leading-none">
                    404
                </h1>

                {/* Message */}
                <div className="relative -mt-16 md:-mt-24">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Страница не найдена
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                        К сожалению, страница, которую вы ищете, не существует или была перемещена.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="bg-white text-[#1E5AFF] font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all hover:scale-105"
                        >
                            На главную
                        </Link>
                        <Link
                            href="/courses"
                            className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
                        >
                            Смотреть курсы
                        </Link>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
            </div>
        </div>
    );
}

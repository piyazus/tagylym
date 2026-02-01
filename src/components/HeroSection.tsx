import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#2563EB] overflow-hidden">
            {/* Wave background */}
            <div className="absolute inset-0">
                {/* Top wave layer */}
                <svg
                    className="absolute top-0 left-0 w-full h-full"
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMid slice"
                    fill="none"
                >
                    <defs>
                        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#2563EB" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heroGradient)" />
                    {/* Wave patterns */}
                    <path
                        d="M0 300 Q 360 200 720 300 T 1440 300 L 1440 0 L 0 0 Z"
                        fill="rgba(255,255,255,0.05)"
                    />
                    <path
                        d="M0 400 Q 360 300 720 400 T 1440 400 L 1440 0 L 0 0 Z"
                        fill="rgba(255,255,255,0.03)"
                    />
                    <path
                        d="M0 500 Q 360 400 720 500 T 1440 500 L 1440 0 L 0 0 Z"
                        fill="rgba(255,255,255,0.02)"
                    />
                </svg>
            </div>

            {/* Robot images decoration */}
            <div className="absolute top-20 left-10 w-48 h-48 opacity-90 hidden lg:block">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl transform -rotate-12 shadow-2xl flex items-center justify-center">
                        <span className="text-6xl">🤖</span>
                    </div>
                </div>
            </div>

            <div className="absolute top-32 right-16 w-56 h-40 opacity-90 hidden lg:block">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl transform rotate-6 shadow-2xl flex items-center justify-center">
                        <span className="text-5xl">⚙️</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-48 left-20 w-40 h-40 opacity-90 hidden lg:block">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-2xl flex items-center justify-center">
                        <span className="text-4xl">🎾</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-32 right-10 w-52 h-44 opacity-90 hidden lg:block">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl transform -rotate-3 shadow-2xl flex items-center justify-center">
                        <span className="text-5xl">🔧</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 container-custom flex flex-col items-center justify-center min-h-screen pt-20 pb-32">
                {/* Main title */}
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold text-white mb-8 text-center tracking-tight">
                    <span className="inline-block" style={{ fontFamily: "'Caveat', cursive" }}>
                        Tagylym
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-white/90 text-center text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
                    Бесплатный доступ к системному обучению робототехнике и
                    инженерии для школьников и менторов.
                    <br className="hidden sm:block" />
                    Проект выстроен по ценностям и целям FIRST, чтобы готовить сильные
                    команды и будущих инженеров.
                </p>
            </div>

            {/* Bottom wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg
                    viewBox="0 0 1440 120"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 120 L0 60 Q 360 0 720 60 T 1440 60 L 1440 120 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
        </section>
    );
}

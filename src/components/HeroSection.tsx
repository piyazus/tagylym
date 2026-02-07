import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen bg-[#2563EB] overflow-hidden flex flex-col items-center justify-center">
            {/* Wave background and gradients */}
            <div className="absolute inset-0 z-0">
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
                    {/* Subtle wave patterns */}
                    <path
                        d="M0 300 Q 360 200 720 300 T 1440 300 L 1440 0 L 0 0 Z"
                        fill="rgba(255,255,255,0.05)"
                    />
                    <path
                        d="M0 400 Q 360 300 720 400 T 1440 400 L 1440 0 L 0 0 Z"
                        fill="rgba(255,255,255,0.03)"
                    />
                </svg>
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center">

                {/* Main Composition */}
                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-12 w-full mb-8">

                    {/* Robot 1 (Left Inner) */}
                    <div className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 relative transform -rotate-12 transition-transform hover:rotate-0">
                        <Image
                            src="/images/robot1.png"
                            alt="Robot 1"
                            fill
                            className="object-contain drop-shadow-xl"
                        />
                    </div>

                    {/* Tagylym Logo (Center) */}
                    <div className="w-64 h-32 md:w-80 md:h-40 lg:w-96 lg:h-48 relative">
                        <Image
                            src="/images/tagylym.png"
                            alt="Tagylym"
                            fill
                            className="object-contain filter drop-shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Robot 2 (Right Inner) */}
                    <div className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 relative transform rotate-12 transition-transform hover:rotate-0">
                        <Image
                            src="/images/robot2.png"
                            alt="Robot 2"
                            fill
                            className="object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Subtitle */}
                <p className="text-white/90 text-center text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4 font-medium backdrop-blur-sm bg-white/10 p-6 rounded-xl border border-white/10 shadow-lg">
                    Бесплатный доступ к системному обучению робототехнике и
                    инженерии для школьников и менторов.
                    <br className="hidden sm:block mt-2" />
                    Проект выстроен по ценностям и целям FIRST, чтобы готовить сильные
                    команды и будущих инженеров.
                </p>

            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
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

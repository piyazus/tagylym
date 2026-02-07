import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Text Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                            <span className="text-[#1A1A2E]">О проекте </span>
                            <span className="text-[#2563EB]">Tagylym</span>
                        </h2>

                        <p className="text-[#4A5568] text-base md:text-lg leading-relaxed">
                            Tagylym – это открытая онлайн-платформа, которая
                            даёт школьникам и менторам из любых регионов
                            Казахстана бесплатный доступ к структурированным
                            курсам по робототехнике, программированию и
                            инженерии. Все треки выстроены по ценностям и
                            критериям FIRST, чтобы не просто учить собирать
                            робота, а помогать командам расти до уровня сильных
                            участников, менторов и будущих инженеров.
                        </p>
                    </div>

                    {/* Right - Image */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            {/* Girl image */}
                            <div className="w-72 h-96 md:w-80 md:h-[420px] relative rounded-3xl overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200">
                                <Image
                                    src="/images/girl.png"
                                    alt="Student Girl"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#2563EB]/10 rounded-full"></div>
                            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#F59E0B]/20 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Yellow callout box */}
                <div className="mt-12 md:mt-16">
                    <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl px-6 py-4 max-w-3xl mx-auto text-center">
                        <p className="text-[#92400E] text-sm md:text-base font-medium">
                            Сотни школ с робототехникой не используют её в
                            полную силу из-за нехватки контента и менторов.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

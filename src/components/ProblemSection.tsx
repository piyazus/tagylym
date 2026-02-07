import Image from "next/image";

export default function ProblemSection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left - Image */}
                    <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative">
                            {/* Boy image */}
                            <div className="w-72 h-96 md:w-80 md:h-[420px] relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
                                <Image
                                    src="/images/boy.png"
                                    alt="Student Boy"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#2563EB]/10 rounded-full"></div>
                            <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-[#F59E0B]/20 rounded-full"></div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="order-1 lg:order-2">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A1A2E] mb-6">
                            Проблема
                        </h2>

                        <p className="text-[#4A5568] text-base md:text-lg leading-relaxed mb-8">
                            Сегодня доступ к качественному STEM-образованию
                            и робототехнике сильно зависит от города, школы и
                            дохода семьи: в крупных центрах есть НИШ,
                            специализированные лицеи и кружки, а в сельских
                            школах даже при появлении кабинетов
                            робототехники часто не хватает контента, методик и
                            наставников. В результате тысячи детей с интересом
                            к технике не получают системного обучения, не
                            знают про FIRST и теряют шанс выстроить свой
                            инженерный путь.
                        </p>

                        {/* Yellow callout box */}
                        <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-2xl px-6 py-4">
                            <p className="text-[#92400E] text-sm md:text-base font-medium">
                                Более 60% школьников Казахстана учатся в сельских школах и малых
                                городах, где доступ к устойчивым STEM-программам ограничен.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import Link from "next/link";

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    level: string;
    duration: string;
    lessonsCount: number;
}

export default function CourseCard({
    id,
    title,
    description,
    level,
    duration,
    lessonsCount,
}: CourseCardProps) {
    // Determine image based on ID or use placeholder
    const getImage = (id: string) => {
        if (id.includes("coding")) return "/images/course-coding.png";
        if (id.includes("cad")) return "/images/course-cad.png";
        if (id.includes("build")) return "/images/course-build.png";
        return "/images/course-coding.png"; // Default
    };

    return (
        <Link href={`/courses/${id}`} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 sm:h-56 bg-gray-200 overflow-hidden">
                <img
                    src={getImage(id)}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Preview Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A1A2E] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                    Preview
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <p className="text-sm text-[#5B7CFA] font-medium mb-2">Свободный курс</p>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3 group-hover:text-[#2563EB] transition-colors leading-tight">
                    {title}
                </h3>
                <p className="text-sm text-[#718096] mb-6 line-clamp-3 leading-relaxed flex-1">{description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="flex text-[#1A1A2E]">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-[#1A1A2E]">{level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#718096] font-medium">
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

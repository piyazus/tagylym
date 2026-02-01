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
    return (
        <Link href={`/courses/${id}`} className="card group block">
            {/* Image Container with gradient placeholder */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1E5AFF] to-[#0D47A1]">
                {/* Placeholder content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="w-20 h-20 text-white/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                        />
                    </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-3 left-3">
                    <span className="bg-white text-[#1E5AFF] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        {level}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2 line-clamp-2 group-hover:text-[#1E5AFF] transition-colors">
                    {title}
                </h3>
                <p className="text-[#4A5568] text-sm mb-4 line-clamp-2">{description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-[#718096]">
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        <span>{lessonsCount} уроков</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

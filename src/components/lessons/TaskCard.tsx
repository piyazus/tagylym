interface TaskCardProps {
    title: string;
    description: string;
    subtasks?: string[];
    hints?: string[];
    difficulty?: 'easy' | 'medium' | 'hard';
}

export default function TaskCard({
    title,
    description,
    subtasks,
    hints,
    difficulty = 'medium'
}: TaskCardProps) {
    const difficultyColors = {
        easy: 'bg-green-100 text-green-700 border-green-200',
        medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        hard: 'bg-red-100 text-red-700 border-red-200'
    };

    const difficultyLabels = {
        easy: 'Легко',
        medium: 'Средне',
        hard: 'Сложно'
    };

    return (
        <div className="bg-gradient-to-br from-[#F5F7FA] to-white rounded-2xl border border-[#E2E8F0] overflow-hidden my-6">
            {/* Header */}
            <div className="bg-[#1E5AFF] px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <h4 className="text-white font-semibold">Практическое задание</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors[difficulty]}`}>
                        {difficultyLabels[difficulty]}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h5 className="text-lg font-bold text-[#1A1A2E] mb-3">{title}</h5>
                <p className="text-[#4A5568] mb-4">{description}</p>

                {/* Subtasks */}
                {subtasks && subtasks.length > 0 && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-[#1A1A2E] mb-2">Подзадачи:</p>
                        <ul className="space-y-2">
                            {subtasks.map((task, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <span className="w-5 h-5 bg-[#E8F0FE] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <span className="text-xs text-[#1E5AFF] font-medium">{index + 1}</span>
                                    </span>
                                    <span className="text-sm text-[#4A5568]">{task}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Hints */}
                {hints && hints.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span className="text-sm font-medium text-yellow-800">Подсказки</span>
                        </div>
                        <ul className="space-y-1">
                            {hints.map((hint, index) => (
                                <li key={index} className="text-sm text-yellow-700 flex items-start gap-2">
                                    <span>•</span>
                                    <span>{hint}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

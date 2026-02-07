'use client';

import { useState } from 'react';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

interface QuizProps {
    questions: QuizQuestion[];
    onComplete?: (score: number, total: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
        new Array(questions.length).fill(null)
    );
    const [showResults, setShowResults] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const current = questions[currentQuestion];
    const selectedAnswer = selectedAnswers[currentQuestion];
    const isAnswered = selectedAnswer !== null;
    const isCorrect = selectedAnswer === current.correctAnswer;

    const handleSelectAnswer = (index: number) => {
        if (isAnswered) return;

        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = index;
        setSelectedAnswers(newAnswers);
        setShowExplanation(true);
    };

    const handleNext = () => {
        setShowExplanation(false);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
            const score = selectedAnswers.filter(
                (answer, idx) => answer === questions[idx].correctAnswer
            ).length;
            onComplete?.(score, questions.length);
        }
    };

    const handlePrevious = () => {
        setShowExplanation(false);
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(new Array(questions.length).fill(null));
        setShowResults(false);
        setShowExplanation(false);
    };

    const score = selectedAnswers.filter(
        (answer, idx) => answer === questions[idx].correctAnswer
    ).length;

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 my-8">
                <div className="text-center">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                        <span className={`text-3xl font-bold ${percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                            {percentage}%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1A1A2E] mb-2">
                        {percentage >= 70 ? 'Отлично!' : percentage >= 50 ? 'Хороший результат!' : 'Попробуйте ещё раз'}
                    </h3>
                    <p className="text-[#4A5568] mb-6">
                        Вы ответили правильно на {score} из {questions.length} вопросов
                    </p>
                    <button
                        onClick={handleRestart}
                        className="btn-secondary"
                    >
                        Пройти ещё раз
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden my-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1E5AFF] to-[#0D47A1] px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Проверка знаний</h3>
                    <span className="text-white/80 text-sm">
                        Вопрос {currentQuestion + 1} из {questions.length}
                    </span>
                </div>
                {/* Progress */}
                <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="p-6">
                <p className="text-lg font-medium text-[#1A1A2E] mb-6">
                    {current.question}
                </p>

                {/* Options */}
                <div className="space-y-3">
                    {current.options.map((option, index) => {
                        const isSelected = selectedAnswer === index;
                        const isCorrectOption = index === current.correctAnswer;

                        let optionClass = 'border-[#E2E8F0] hover:border-[#1E5AFF] hover:bg-[#F5F7FA]';

                        if (isAnswered) {
                            if (isCorrectOption) {
                                optionClass = 'border-green-500 bg-green-50';
                            } else if (isSelected && !isCorrect) {
                                optionClass = 'border-red-500 bg-red-50';
                            } else {
                                optionClass = 'border-[#E2E8F0] opacity-50';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectAnswer(index)}
                                disabled={isAnswered}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${optionClass}`}
                            >
                                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium ${isAnswered && isCorrectOption
                                        ? 'bg-green-500 text-white'
                                        : isAnswered && isSelected && !isCorrect
                                            ? 'bg-red-500 text-white'
                                            : 'bg-[#E8F0FE] text-[#1E5AFF]'
                                    }`}>
                                    {String.fromCharCode(65 + index)}
                                </span>
                                <span className="text-[#1A1A2E]">{option}</span>
                                {isAnswered && isCorrectOption && (
                                    <svg className="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                                {isAnswered && isSelected && !isCorrect && (
                                    <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Explanation */}
                {showExplanation && isAnswered && (
                    <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                        <div className="flex items-start gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isCorrect ? 'bg-green-500' : 'bg-blue-500'}`}>
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className={`font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                                    {isCorrect ? 'Правильно!' : 'Объяснение'}
                                </p>
                                <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-blue-700'}`}>
                                    {current.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-[#E2E8F0]">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Назад
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее →'}
                    </button>
                </div>
            </div>
        </div>
    );
}

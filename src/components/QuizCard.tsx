"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { QuizCardProps } from "@/types";

export default function QuizCard({ quiz }: QuizCardProps) {
    const t = useTranslations("quiz");
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleSubmit = () => {
        if (!selectedOption) return;
        setIsSubmitted(true);
    };

    const isCorrect = selectedOption === quiz.correct_answer;

    const resetQuiz = () => {
        setSelectedOption(null);
        setIsSubmitted(false);
        setShowAnswer(false);
    };

    return (
        <div className="glass-card p-6 space-y-4">
            {/* Question */}
            <p className="font-semibold text-white leading-relaxed">{quiz.question}</p>

            {quiz.type === "mcq" ? (
                <>
                    {/* MCQ Options */}
                    <div className="space-y-2">
                        {quiz.options?.map((option, idx) => {
                            let optionClass = "border-surface-lighter/50 hover:border-accent/50 hover:bg-surface-lighter/30";

                            if (isSubmitted) {
                                if (option === quiz.correct_answer) {
                                    optionClass = "border-success/50 bg-success/10 text-success";
                                } else if (option === selectedOption && !isCorrect) {
                                    optionClass = "border-error/50 bg-error/10 text-error";
                                } else {
                                    optionClass = "border-surface-lighter/30 opacity-50";
                                }
                            } else if (option === selectedOption) {
                                optionClass = "border-accent bg-accent/10 text-accent";
                            }

                            return (
                                <label
                                    key={idx}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${optionClass}`}
                                >
                                    <input
                                        type="radio"
                                        name={`quiz-${quiz.id}`}
                                        value={option}
                                        checked={selectedOption === option}
                                        onChange={() => !isSubmitted && setSelectedOption(option)}
                                        disabled={isSubmitted}
                                        className="accent-accent"
                                    />
                                    <span className="text-sm">{option}</span>
                                </label>
                            );
                        })}
                    </div>

                    {/* Submit / Result */}
                    {!isSubmitted ? (
                        <button
                            onClick={handleSubmit}
                            disabled={!selectedOption}
                            className="w-full py-2.5 rounded-lg font-medium text-sm gradient-brand text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
                        >
                            {t("submit")}
                        </button>
                    ) : (
                        <div className="space-y-3">
                            <div
                                className={`flex items-center gap-2 p-3 rounded-lg ${isCorrect ? "bg-success/10 text-success" : "bg-error/10 text-error"
                                    }`}
                            >
                                <span className="text-lg">{isCorrect ? "🎉" : "❌"}</span>
                                <span className="font-medium text-sm">
                                    {isCorrect ? t("correct") : t("incorrect")}
                                </span>
                            </div>

                            {/* Tip */}
                            {quiz.tip && (
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-tip-bg/50 border border-tip/20">
                                    <span className="text-lg mt-0.5">💡</span>
                                    <div>
                                        <span className="font-semibold text-tip text-xs uppercase tracking-wider">
                                            {t("tip")}
                                        </span>
                                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{quiz.tip}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={resetQuiz}
                                className="text-sm text-[#8B5CF6] hover:text-purple-400 transition-colors mt-2"
                            >
                                ↻ Қайтадан байқап көру
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* Open-ended */
                <>
                    {!showAnswer ? (
                        <button
                            onClick={() => setShowAnswer(true)}
                            className="w-full py-2.5 rounded-lg font-medium text-sm bg-[#8B5CF6] hover:bg-purple-500 text-white transition-opacity"
                        >
                            {t("showAnswer")}
                        </button>
                    ) : (
                        <div className="space-y-3 animate-fade-in-up">
                            <div className="p-4 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                                <span className="font-semibold text-[#8B5CF6] text-xs uppercase tracking-wider block mb-2">
                                    {t("modelAnswer")}
                                </span>
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    {quiz.correct_answer}
                                </p>
                            </div>

                            {quiz.tip && (
                                <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                    <span className="text-lg mt-0.5">💡</span>
                                    <div>
                                        <span className="font-semibold text-yellow-500 text-xs uppercase tracking-wider">
                                            {t("tip")}
                                        </span>
                                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">{quiz.tip}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={resetQuiz}
                                className="text-sm text-[#8B5CF6] hover:text-purple-400 transition-colors mt-2"
                            >
                                ↻ Жасыру
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

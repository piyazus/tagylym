"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
            <div className="container-custom">
                <nav className="flex items-center justify-between h-16 md:h-20">
                    {/* Left - Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
                            <span className="text-white font-bold text-sm">📚</span>
                        </div>
                        <span className="text-lg font-semibold text-white">
                            Tagylym
                        </span>
                    </Link>

                    {/* Center - FIRST Logo */}
                    <div className="hidden md:flex items-center">
                        <div className="flex items-center gap-1 text-white">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span className="font-bold text-sm tracking-wider">FIRST</span>
                        </div>
                    </div>

                    {/* Right - Powered by */}
                    <div className="hidden md:flex items-center gap-2 text-white/80 text-sm">
                        <span>Powered by</span>
                        <div className="w-8 h-8 relative bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                                src="/images/logo-horse.png"
                                alt="Horse Logo"
                                className="w-full h-full object-contain p-1"
                            />
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 bg-white/10 backdrop-blur-md rounded-xl mt-2">
                        <div className="flex flex-col gap-4 px-4">
                            <Link
                                href="/#about"
                                className="text-white hover:text-white/80 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                О проекте
                            </Link>
                            <Link
                                href="/#courses"
                                className="text-white hover:text-white/80 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Курсы
                            </Link>
                            <Link
                                href="/lessons"
                                className="text-white hover:text-white/80 transition-colors font-medium py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Уроки
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

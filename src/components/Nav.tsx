"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";

export default function Nav() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ email?: string } | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    // Check if on the home page (where header should be transparent and absolute)
    const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user: u } }) => {
            setUser(u ? { email: u.email ?? undefined } : null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ? { email: session.user.email ?? undefined } : null);
            }
        );

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            subscription.unsubscribe();
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    const otherLocale = locale === "ru" ? "en" : "ru";
    const useLightText = isHome && !isScrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useLightText
                ? "h-20 bg-transparent text-white"
                : "h-16 glass bg-white/95 backdrop-blur-md border-b border-surface-lighter/20 text-text-dark"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
                {/* Left Side: Logo + Tagylym */}
                <Link href={"/" as "/"} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center border border-white/20 overflow-hidden">
                        {/* Abstract symbol replacing the hieroglyph */}
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 6V4h16v2H4zm8 14V8h-2v12h2z" />
                        </svg>
                    </div>
                    <span className={`text-lg font-semibold tracking-wide ${useLightText ? "text-white" : "text-text-dark"}`}>
                        Taǵylym
                    </span>
                </Link>

                {/* Center: FIRST Logo */}
                {isHome && (
                    <div className="hidden md:flex items-center gap-2">
                        <div className={`flex gap-0.5 ${useLightText ? "text-white" : "text-blue-main"}`}>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="3,3 21,3 12,21" />
                            </svg>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="9" />
                            </svg>
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="3" width="18" height="18" />
                            </svg>
                        </div>
                        <span className={`font-bold italic tracking-wider ${useLightText ? "text-white" : "text-text-dark"}`}>FIRST</span>
                    </div>
                )}

                {/* Right Side: Powered by + Auth */}
                <div className="flex items-center gap-4">
                    {/* Powered By (Hidden on mobile) */}
                    <div className={`hidden md:flex items-center gap-2 ${useLightText ? "text-white" : "text-text-dark"}`}>
                        <span className="text-sm font-medium">Powered by</span>
                        {/* Centaur Robot Icon placeholder */}
                        <svg className="w-6 h-6 text-blue-300" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8 2 6 5 6 5v4h12V5s-2-3-6-3zm-2 5h4v2h-4V7zm-4 4v7h2v-5h8v5h2v-7H6zm3 9v2h6v-2H9z" />
                        </svg>
                    </div>

                    {/* Locale Switcher */}
                    <Link
                        href={"/" as "/"}
                        locale={otherLocale}
                        className={`text-xs px-2 py-1 rounded transition-colors ${useLightText ? "text-white/80 hover:text-white bg-white/10" : "text-text-gray hover:text-text-dark bg-gray-100"
                            }`}
                    >
                        {otherLocale.toUpperCase()}
                    </Link>

                    {/* Auth Status */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href={"/dashboard" as "/"}
                                className={`text-sm transition-colors ${useLightText ? "text-white/80 hover:text-white" : "text-text-gray hover:text-blue-main"}`}
                            >
                                {t("dashboard")}
                            </Link>
                            <button
                                onClick={handleLogout}
                                className={`text-xs px-3 py-1.5 rounded-md transition-colors ${useLightText
                                    ? "bg-white/10 text-white hover:bg-white/20"
                                    : "bg-error/10 text-error hover:bg-error/20"
                                    }`}
                            >
                                {t("logout")}
                            </button>
                        </div>
                    ) : (
                        <Link
                            href={"/auth/login" as "/"}
                            className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                        >
                            {t("login")}
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className={`md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1 ${useLightText ? "bg-white/10" : "bg-gray-100"}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <span className={`block w-5 h-0.5 transition-transform ${useLightText ? "bg-white" : "bg-black"} ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                        <span className={`block w-5 h-0.5 transition-opacity ${useLightText ? "bg-white" : "bg-black"} ${isOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 transition-transform ${useLightText ? "bg-white" : "bg-black"} ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute top-20 left-0 right-0 bg-surface border-t border-surface-lighter/50 p-6 space-y-4">
                    <Link
                        href={"/courses" as "/"}
                        className="block text-sm text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        Курсы
                    </Link>
                    {user ? (
                        <>
                            <Link
                                href={"/dashboard" as "/"}
                                className="block text-sm text-accent"
                                onClick={() => setIsOpen(false)}
                            >
                                {t("dashboard")}
                            </Link>
                            <button
                                onClick={() => { handleLogout(); setIsOpen(false); }}
                                className="text-sm text-error"
                            >
                                {t("logout")}
                            </button>
                        </>
                    ) : (
                        <Link
                            href={"/auth/login" as "/"}
                            className="block text-sm text-accent"
                            onClick={() => setIsOpen(false)}
                        >
                            {t("login")}
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}

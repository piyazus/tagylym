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

    const navLinks = [
        { href: "/", label: "Үй" },
        { href: "/fll", label: "FLL" },
        { href: "/ftc", label: "FTC*" },
        { href: "/fgc", label: "FGC*" },
        { href: "/quiz", label: "Quiz" },
        { href: "/resources", label: "Ресурстар" },
    ];

    const useLightText = isHome && !isScrolled;
    const locales = ["kz", "ru", "en"];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useLightText
                ? "h-20 bg-transparent text-white"
                : "h-16 glass bg-[#0f172a]/95 backdrop-blur-md border-b border-[#334155]/50 text-[#f1f5f9]"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-full flex items-center justify-between">
                {/* Left Side: Logo + Tagylym */}
                <Link href={"/" as "/"} className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-[#8B5CF6] flex items-center justify-center border border-white/20 overflow-hidden shadow-lg shadow-purple-500/20">
                        {/* Robot Icon */}
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                    </div>
                    <span className={`text-lg font-bold tracking-wide ${useLightText ? "text-white" : "text-[#f1f5f9]"}`}>
                        TAGYLYM
                    </span>
                </Link>

                {/* Center: Desktop Links */}
                <div className={`hidden md:flex items-center gap-6 ${useLightText ? "text-white/90" : "text-[#cbd5e1]"}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href as any}
                            className="text-sm font-medium hover:text-[#8B5CF6] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Right Side: Auth + Locale Switcher */}
                <div className="flex items-center gap-4">
                    {/* Locale Switcher */}
                    <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        {locales.map((l) => (
                            <Link
                                key={l}
                                href={"/" as "/"}
                                locale={l as any}
                                className={`text-[10px] font-bold px-2 py-1 rounded transition-colors uppercase ${locale === l
                                    ? "bg-[#8B5CF6] text-white"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Status */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-sm text-slate-300 font-medium">
                                {user.email?.split("@")[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-xs font-semibold px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                            >
                                Шығу
                            </button>
                        </div>
                    ) : (
                        <Link
                            href={"/auth/login" as "/"}
                            className="hidden md:inline-flex text-sm px-5 py-2 rounded-lg bg-[#8B5CF6] text-white font-medium hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20"
                        >
                            Кіру
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className={`md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5 ${useLightText ? "bg-white/10" : "bg-[#1e293b]"}`}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <span className={`block w-5 h-[2px] rounded-full transition-transform ${useLightText ? "bg-white" : "bg-[#f1f5f9]"} ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-opacity ${useLightText ? "bg-white" : "bg-[#f1f5f9]"} ${isOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-[2px] rounded-full transition-transform ${useLightText ? "bg-white" : "bg-[#f1f5f9]"} ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f172a] border-t border-[#334155] p-6 shadow-2xl space-y-4 shadow-black/50">
                    <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10 w-fit mb-6">
                        {locales.map((l) => (
                            <Link
                                key={l}
                                href={"/" as "/"}
                                locale={l as any}
                                onClick={() => setIsOpen(false)}
                                className={`text-xs font-bold px-3 py-1.5 rounded transition-colors uppercase ${locale === l
                                    ? "bg-[#8B5CF6] text-white"
                                    : "text-slate-400 hover:text-white"
                                    }`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href as any}
                            className="block text-lg font-medium text-slate-300 hover:text-white transition-colors py-2 border-b border-[#334155]/50"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-4">
                        {user ? (
                            <>
                                <p className="text-sm text-slate-400 mb-4 font-medium">Кірген аккаунт: {user.email}</p>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="w-full text-center py-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-semibold"
                                >
                                    Шығу
                                </button>
                            </>
                        ) : (
                            <Link
                                href={"/auth/login" as "/"}
                                className="block w-full text-center py-3 rounded-xl bg-[#8B5CF6] text-white font-semibold shadow-lg shadow-purple-500/20"
                                onClick={() => setIsOpen(false)}
                            >
                                Кіру
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

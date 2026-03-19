"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Nav() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const tNav = useTranslations("nav");
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<{ email?: string } | null>(null);

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user: u } }) => {
            setUser(u ? { email: u.email ?? undefined } : null);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ? { email: session.user.email ?? undefined } : null);
            }
        );
        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
    };

    const locales = [
        { code: 'kk', label: 'ҚАЗ' },
        { code: 'ru', label: 'РУС' },
        { code: 'en', label: 'ENG' },
    ];

    const switchLocale = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.push(segments.join('/'));
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] h-12">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* LEFT: Logo + wordmark */}
                <Link href={"/" as "/"} className="flex items-center gap-2">
                    <Image
                        src="/images/logo-tagylym.png"
                        alt="Tagylym"
                        width={28}
                        height={28}
                        className="h-7 w-7"
                        style={{ filter: 'invert(1)' }}
                        priority
                    />
                    <span className="text-sm font-semibold text-[#1A1A1A]">Tagylym</span>
                </Link>

                {/* CENTER: FIRST logo */}
                <div className="hidden sm:flex items-center">
                    <Image
                        src="/images/logo-first.png"
                        alt="FIRST"
                        width={48}
                        height={24}
                        className="h-6 w-auto"
                    />
                </div>

                {/* RIGHT: Powered by + Lang switcher */}
                <div className="flex items-center gap-3">
                    <span className="hidden md:flex items-center gap-1.5 text-xs text-[#6B7280]">
                        Powered by
                        <Image
                            src="/images/logo-panheya.png"
                            alt="Panheya"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                        />
                        Panheya
                    </span>

                    {/* Locale Switcher */}
                    <div className="flex items-center border border-[#E5E7EB] rounded px-1 py-0.5 text-xs">
                        {locales.map((l, i) => (
                            <span key={l.code} className="flex items-center">
                                {i > 0 && <span className="text-[#D1D5DB] mx-0.5">|</span>}
                                <button
                                    onClick={() => switchLocale(l.code)}
                                    className={`px-1 py-0.5 rounded transition-colors ${locale === l.code
                                        ? "text-[#1A1A1A] font-medium"
                                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                                        }`}
                                >
                                    {l.label}
                                </button>
                            </span>
                        ))}
                    </div>

                    {/* Auth (desktop) */}
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="hidden md:inline text-xs text-red-500 hover:text-red-600 font-medium"
                        >
                            {tNav("logout")}
                        </button>
                    ) : (
                        <Link
                            href={"/auth/login" as "/"}
                            className="hidden md:inline text-xs px-3 py-1 rounded bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
                        >
                            {tNav("login")}
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className="sm:hidden p-1 text-[#1A1A1A]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E5E7EB] p-4 shadow-md space-y-3">
                    <div className="flex items-center gap-1 border border-[#E5E7EB] rounded px-1 py-0.5 text-xs w-fit">
                        {locales.map((l, i) => (
                            <span key={l.code} className="flex items-center">
                                {i > 0 && <span className="text-[#D1D5DB] mx-0.5">|</span>}
                                <button
                                    onClick={() => { switchLocale(l.code); setIsOpen(false); }}
                                    className={`px-1.5 py-0.5 rounded ${locale === l.code ? "text-[#1A1A1A] font-medium" : "text-[#6B7280]"}`}
                                >
                                    {l.label}
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="pt-3 border-t border-[#E5E7EB]">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#6B7280]">{user.email}</span>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="text-sm text-red-500 font-medium"
                                >
                                    {tNav("logout")}
                                </button>
                            </div>
                        ) : (
                            <Link
                                href={"/auth/login" as "/"}
                                className="block w-full text-center py-2 rounded-lg bg-[#2563EB] text-white text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {tNav("login")}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

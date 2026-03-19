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

    // Is active check
    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";
        }
        return pathname.includes(href);
    };

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

    const navLinks = [
        { href: "/", label: "Үй" },
        { href: "/fll", label: "FLL" },
        { href: "/ftc", label: "FTC*" },
        { href: "/fgc", label: "FGC*" },
        { href: "/quiz", label: "Quiz" },
        { href: "/resources", label: "Ресурстар" },
    ];

    const locales = ["kz", "ru", "en"];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB] h-14">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                {/* LEFT: Logo */}
                <Link href={"/" as "/"} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#1A1A1A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="font-display text-xl text-[#1A1A1A]">
                        Tagylym
                    </span>
                </Link>

                {/* CENTER: Navigation links */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href as any}
                                className={`text-sm transition-colors ${active
                                        ? "text-[#2563EB] font-medium"
                                        : "text-[#6B7280] hover:text-[#1A1A1A]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* RIGHT: Lang switcher + Auth */}
                <div className="flex items-center gap-4">
                    {/* Locale Switcher */}
                    <div className="hidden sm:flex items-center gap-1 border border-[#E5E7EB] rounded-md px-1.5 py-1 font-mono text-xs">
                        {locales.map((l) => (
                            <Link
                                key={l}
                                href={"/" as "/"}
                                locale={l as any}
                                className={`px-1.5 py-0.5 rounded transition-colors uppercase ${locale === l
                                        ? "bg-[#2563EB] text-white"
                                        : "text-[#6B7280] hover:bg-gray-100 hover:text-[#1A1A1A]"
                                    }`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Status */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-xs text-[#6B7280]">
                                {user.email?.split("@")[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
                            >
                                Шығу
                            </button>
                        </div>
                    ) : (
                        <Link
                            href={"/auth/login" as "/"}
                            className="hidden md:inline-flex text-sm px-4 py-1.5 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors"
                        >
                            Кіру
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden p-2 text-[#1A1A1A]"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E5E7EB] p-4 shadow-lg space-y-4">
                    <div className="flex items-center gap-2 border border-[#E5E7EB] rounded-md px-1.5 py-1 font-mono text-xs w-fit">
                        {locales.map((l) => (
                            <Link
                                key={l}
                                href={"/" as "/"}
                                locale={l as any}
                                onClick={() => setIsOpen(false)}
                                className={`px-2 py-1 rounded transition-colors uppercase ${locale === l
                                        ? "bg-[#2563EB] text-white"
                                        : "text-[#6B7280]"
                                    }`}
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href as any}
                                className={`text-base py-1 ${isActive(link.href) ? "text-[#2563EB] font-medium" : "text-[#6B7280]"
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB]">
                        {user ? (
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-[#6B7280]">{user.email}</span>
                                <button
                                    onClick={() => { handleLogout(); setIsOpen(false); }}
                                    className="text-sm text-red-500 font-medium"
                                >
                                    Шығу
                                </button>
                            </div>
                        ) : (
                            <Link
                                href={"/auth/login" as "/"}
                                className="block w-full text-center py-2 rounded-lg bg-[#2563EB] text-white font-medium"
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

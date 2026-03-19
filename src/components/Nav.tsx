"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
                <Link href={"/" as "/"} className="flex items-center gap-3">
                    <Image
                        src="/images/logo-tagylym.png"
                        alt="Tagylym"
                        width={120}
                        height={32}
                        className="h-7 w-auto"
                        style={{ filter: 'invert(1)' }}
                        priority
                    />
                    <span className="hidden sm:inline-block w-px h-5 bg-[#E5E7EB]"></span>
                    <Image
                        src="/images/logo-first.png"
                        alt="FIRST"
                        width={36}
                        height={32}
                        className="hidden sm:block h-6 w-auto"
                    />
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

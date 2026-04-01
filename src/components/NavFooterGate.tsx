"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

export default function NavFooterGate({
    locale,
    children,
}: {
    locale: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLanding = pathname === `/${locale}`;

    return (
        <>
            {!isLanding && <Nav />}

            <main className={isLanding ? "" : "pt-16"}>{children}</main>

            {!isLanding && (
                <footer className="border-t border-surface-lighter/30 mt-20">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <h3 className="text-xl font-bold bg-gradient-to-r from-accent to-beginner bg-clip-text text-transparent">
                                    Tagylym
                                </h3>
                                <p className="mt-3 text-muted text-sm leading-relaxed">
                                    Robotics Education Platform for FIRST teams
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 text-slate-300">
                                    Competitions
                                </h4>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li>FIRST LEGO League (FLL)</li>
                                    <li>FIRST Tech Challenge (FTC)</li>
                                    <li>FIRST Global Challenge (FGC)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 text-slate-300">
                                    Resources
                                </h4>
                                <ul className="space-y-2 text-sm text-muted">
                                    <li>Video Lessons</li>
                                    <li>Quizzes</li>
                                    <li>Checklists</li>
                                    <li>Downloads</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10 pt-6 border-t border-surface-lighter/20 text-center text-xs text-muted">
                            © 2026 Tagylym. All rights reserved.
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
}


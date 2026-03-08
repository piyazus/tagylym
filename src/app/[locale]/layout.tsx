import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Nav from "@/components/Nav";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "ru" | "en")) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            <body className="min-h-screen bg-surface text-slate-200 antialiased">
                <NextIntlClientProvider messages={messages}>
                    <Nav />
                    <main className="pt-16">{children}</main>
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
                                    <h4 className="font-semibold mb-3 text-slate-300">Competitions</h4>
                                    <ul className="space-y-2 text-sm text-muted">
                                        <li>FIRST LEGO League (FLL)</li>
                                        <li>FIRST Tech Challenge (FTC)</li>
                                        <li>FIRST Global Challenge (FGC)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-3 text-slate-300">Resources</h4>
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
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

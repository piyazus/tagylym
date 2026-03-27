"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const t = useTranslations("nav");
    const tAuth = useTranslations("auth");
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            if (isSignUp) {
                const { error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    }
                });
                if (signUpError) {
                    setError(signUpError.message);
                } else {
                    setSuccess(tAuth("successMsg"));
                }
            } else {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (signInError) {
                    setError(signInError.message);
                } else {
                    router.push("/dashboard");
                }
            }
        } catch {
            setError(tAuth("errorDefault"));
        }

        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-6 relative overflow-hidden bg-background">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent-secondary/20 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-8">
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white shadow-xl shadow-accent/20"
                    >
                        T
                    </motion.div>
                    <h1 className="text-4xl font-calistoga text-foreground mb-3">
                        {isSignUp ? tAuth("createAccount") : tAuth("login_title") || t("login")}
                    </h1>
                    <p className="text-muted-foreground max-w-xs mx-auto text-sm leading-relaxed">
                        {isSignUp ? tAuth("register_subtitle") : tAuth("subtitle")}
                    </p>
                </div>

                <div className="glass-card overflow-hidden border border-border bg-card shadow-xl">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
                                    >
                                        {error}
                                    </motion.div>
                                )}
                                {success && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium transition-all"
                                    >
                                        {success}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                                        {tAuth("email")}
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-background text-foreground text-sm rounded-xl px-4 py-3.5 border border-border group-hover:border-border/80 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-muted-foreground/50"
                                            placeholder={tAuth("email_placeholder")}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 ml-1">
                                        {tAuth("password")}
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            minLength={6}
                                            className="w-full bg-background text-foreground text-sm rounded-xl px-4 py-3.5 border border-border group-hover:border-border/80 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all placeholder:text-muted-foreground/50"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary text-white font-bold text-sm shadow-md shadow-accent/25 hover:shadow-accent/40 hover:brightness-110 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {isSignUp ? tAuth("register") : t("login")}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSignUp(!isSignUp);
                                        setError("");
                                        setSuccess("");
                                    }}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {isSignUp ? tAuth("alreadyHaveAccount") : tAuth("noAccount")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-10"
                >
                    <Link href="/" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {tAuth("backToHome")}
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}

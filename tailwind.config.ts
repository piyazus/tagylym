import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                card: '#FFFFFF',
                'star-beginner': '#0052FF',
                'star-intermediate': '#F97316',
                'star-advanced': '#16A34A',
                // Minimalist Modern Tokens
                background: '#FAFAFA',
                foreground: '#0F172A',
                muted: '#F1F5F9',
                'muted-foreground': '#64748B',
                accent: '#0052FF',
                'accent-secondary': '#4D7CFF',
                border: '#E2E8F0',
                ring: '#0052FF',
            },
            fontFamily: {
                calistoga: ['"Calistoga"', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
                inter: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'accent': '0 4px 14px rgba(0, 82, 255, 0.25)',
                'accent-lg': '0 8px 24px rgba(0, 82, 255, 0.35)',
            }
        },
    },
    plugins: [],
};
export default config;

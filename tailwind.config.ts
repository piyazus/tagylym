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
                page: '#F5F5F5',
                card: '#FFFFFF',
                'text-main': '#1A1A1A',
                'text-muted': '#6B7280',
                'text-light': '#9CA3AF',
                blue: '#2563EB',
                'blue-light': '#EFF6FF',
                'border-card': '#E5E7EB',
                'border-selected': '#2563EB',
                'hero-from': '#1E3A8A',
                'hero-to': '#3B82F6',
                'star-beginner': '#2563EB',
                'star-intermediate': '#D97706',
                'star-advanced': '#16A34A',
            },
        },
    },
    plugins: [],
};
export default config;

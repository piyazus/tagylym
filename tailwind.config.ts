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
                'bg-page': '#F5F5F5',
                'bg-card': '#FFFFFF',
                'bg-hero': '#1A237E',
                'text-primary': '#1A1A1A',
                'text-secondary': '#6B7280',
                'text-hero': '#FFFFFF',
                'accent': '#2563EB',
                'accent-hover': '#1D4ED8',
                'level-beginner': '#2563EB',
                'level-intermediate': '#D97706',
                'level-advanced': '#16A34A',
                'border-card': '#E5E7EB',
                'border-selected': '#2563EB',
                'badge-free': '#F3F4F6',
            },
        },
    },
    plugins: [],
};
export default config;

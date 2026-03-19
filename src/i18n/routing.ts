import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
    locales: ["kz", "ru", "en"],
    defaultLocale: "kz",
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);

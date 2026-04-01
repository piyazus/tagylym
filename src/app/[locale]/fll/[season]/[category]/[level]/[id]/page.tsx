import { redirect } from "next/navigation";
import { toSlug } from "@/lib/utils";

export default async function LegacyLevelIdRedirect({
    params,
}: {
    params: Promise<{
        locale: string;
        season: string;
        category: string;
        level: string;
        id: string;
    }>;
}) {
    const { locale, season, category, level } = await params;
    redirect(`/${locale}/fll/${toSlug(season)}/${category}/${level}`);
}


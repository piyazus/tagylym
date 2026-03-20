import HomeContent from "@/components/HomeContent";
import { getActiveSeasonByCompetition, getAllCoursesForSeason } from "@/lib/queries";

export default async function HomePage() {
    const season = await getActiveSeasonByCompetition("fll");
    const allCourses = season ? await getAllCoursesForSeason(season.id) : [];
    const seasonSlug = season ? season.name.toLowerCase().replace(/\s+/g, "-") : "current";

    return <HomeContent courses={allCourses} seasonSlug={seasonSlug} />;
}


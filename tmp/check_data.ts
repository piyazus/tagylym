import { getCompetitions, getActiveSeasonByCompetition, getAllCoursesForSeason } from "./src/lib/queries";

async function checkData() {
    try {
        const competitions = await getCompetitions();
        console.log("Competitions:", competitions.map(c => c.slug));

        for (const comp of competitions) {
            const season = await getActiveSeasonByCompetition(comp.slug);
            if (season) {
                const courses = await getAllCoursesForSeason(season.id);
                console.log(`Competition: ${comp.slug}, Season: ${season.name}, Courses: ${courses.length}`);
            } else {
                console.log(`Competition: ${comp.slug}, No active season.`);
            }
        }
    } catch (e) {
        console.error("Error fetching data:", e);
    }
}

checkData();

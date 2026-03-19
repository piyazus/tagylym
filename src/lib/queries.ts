import { supabase } from "./supabase";
import type {
    Competition,
    Season,
    Category,
    Level,
    Course,
    Lesson,
    Quiz,
    Artifact,
    ChecklistItem,
    Progress,
    ChecklistProgress,
} from "@/types";

// ─── Competitions ────────────────────────────────────────

export async function getCompetitions(): Promise<Competition[]> {
    const { data, error } = await supabase
        .from("competitions")
        .select("*");
    if (error) throw error;
    return data ?? [];
}

// ─── Seasons ─────────────────────────────────────────────

export async function getActiveSeasonByCompetition(
    competitionSlug: string
): Promise<(Season & { competition: Competition }) | null> {
    const { data, error } = await supabase
        .from("seasons")
        .select("*, competition:competitions!inner(*)")
        .eq("competitions.slug", competitionSlug)
        .eq("is_active", true)
        .single();
    if (error) return null;
    return data;
}

export async function getSeasonBySlug(
    competitionSlug: string,
    seasonSlug: string
): Promise<Season | null> {
    // seasonSlug format: "submerged-2025-26" → name: "SUBMERGED 2025-26"
    const { data: comp } = await supabase
        .from("competitions")
        .select("id")
        .eq("slug", competitionSlug)
        .single();
    if (!comp) return null;

    const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("competition_id", comp.id)
        .eq("is_active", true)
        .single();
    if (error) return null;
    return data;
}

// ─── Categories ──────────────────────────────────────────

export async function getCategoriesBySeason(
    seasonId: string
): Promise<Category[]> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("season_id", seasonId)
        .order("order", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function getCategoryBySlug(
    seasonId: string,
    slug: string
): Promise<Category | null> {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("season_id", seasonId)
        .eq("slug", slug)
        .single();
    if (error) return null;
    return data;
}

// ─── Levels ──────────────────────────────────────────────

export async function getLevelsByCategory(
    categoryId: string
): Promise<Level[]> {
    const { data, error } = await supabase
        .from("levels")
        .select("*")
        .eq("category_id", categoryId)
        .order("order", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function getLevelByCategoryAndName(
    categoryId: string,
    levelName: string
): Promise<Level | null> {
    // levelName from URL: "beginner" → DB name: "Начинающий"
    const nameMap: Record<string, string> = {
        beginner: "Начинающий",
        intermediate: "Средний",
        advanced: "Продвинутый",
    };
    const dbName = nameMap[levelName.toLowerCase()] || levelName;

    const { data, error } = await supabase
        .from("levels")
        .select("*")
        .eq("category_id", categoryId)
        .eq("name", dbName)
        .single();
    if (error) return null;
    return data;
}

// ─── Courses ─────────────────────────────────────────────

export async function getCoursesByLevel(
    levelId: string
): Promise<Course[]> {
    const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("level_id", levelId)
        .order("order", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

// ─── Lessons ─────────────────────────────────────────────

export async function getLessonsByCourse(
    courseId: string
): Promise<Lesson[]> {
    const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("order", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function getLessonById(
    lessonId: string
): Promise<Lesson | null> {
    const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .single();
    if (error) return null;
    return data;
}

export async function getLessonCountByLevel(
    levelId: string
): Promise<number> {
    const { count, error } = await supabase
        .from("lessons")
        .select("id, course:courses!inner(level_id)", { count: "exact", head: true })
        .eq("courses.level_id", levelId);
    if (error) return 0;
    return count ?? 0;
}

// ─── Checklist Items ─────────────────────────────────────

export async function getChecklistItems(
    levelId: string
): Promise<ChecklistItem[]> {
    const { data, error } = await supabase
        .from("checklist_items")
        .select("*")
        .eq("level_id", levelId)
        .order("order", { ascending: true });
    if (error) throw error;
    return data ?? [];
}

export async function getChecklistItemCount(
    levelId: string
): Promise<number> {
    const { count, error } = await supabase
        .from("checklist_items")
        .select("id", { count: "exact", head: true })
        .eq("level_id", levelId);
    if (error) return 0;
    return count ?? 0;
}

// ─── Artifacts ───────────────────────────────────────────

export async function getArtifactsByLevel(
    levelId: string
): Promise<Artifact[]> {
    const { data, error } = await supabase
        .from("artifacts")
        .select("*")
        .eq("level_id", levelId);
    if (error) throw error;
    return data ?? [];
}

// ─── Quizzes ─────────────────────────────────────────────

export async function getQuizzes(filters?: {
    category?: string;
    level?: string;
}): Promise<Quiz[]> {
    let query = supabase.from("quizzes").select("*");

    if (filters?.category) {
        query = query.eq("category", filters.category);
    }
    if (filters?.level) {
        query = query.eq("level", filters.level);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data ?? [];
}

export async function getQuizzesByLesson(
    lessonId: string
): Promise<Quiz[]> {
    const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("lesson_id", lessonId);
    if (error) throw error;
    return data ?? [];
}

// ─── User Progress ───────────────────────────────────────

export async function getUserProgress(
    userId: string
): Promise<Progress[]> {
    const { data, error } = await supabase
        .from("progress")
        .select("*")
        .eq("user_id", userId);
    if (error) throw error;
    return data ?? [];
}

export async function markLessonComplete(
    userId: string,
    lessonId: string
): Promise<void> {
    await supabase.from("progress").upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed_at: new Date().toISOString(),
    });
}

// ─── Checklist Progress ──────────────────────────────────

export async function getChecklistProgress(
    userId: string,
    levelId: string
): Promise<ChecklistProgress[]> {
    const { data, error } = await supabase
        .from("checklist_progress")
        .select("*, item:checklist_items!inner(*)")
        .eq("user_id", userId)
        .eq("checklist_items.level_id", levelId);
    if (error) return [];
    return data ?? [];
}

export async function toggleChecklistItem(
    userId: string,
    itemId: string,
    checked: boolean
): Promise<void> {
    await supabase.from("checklist_progress").upsert({
        user_id: userId,
        item_id: itemId,
        checked,
    });
}

// ─── Aggregate helpers ───────────────────────────────────

export async function getLevelsWithCounts(
    categoryId: string
): Promise<(Level & { lessonCount: number; checklistCount: number })[]> {
    const levels = await getLevelsByCategory(categoryId);

    const enriched = await Promise.all(
        levels.map(async (level) => {
            const [lessonCount, checklistCount] = await Promise.all([
                getLessonCountByLevel(level.id),
                getChecklistItemCount(level.id),
            ]);
            return { ...level, lessonCount, checklistCount };
        })
    );

    return enriched;
}

// ─── All courses for a season (flat grid) ────────────────

export interface EnrichedCourse extends Course {
    categoryName: string;
    categorySlug: string;
    levelName: string;
    levelSlug: string;
    levelColor: string;
}

const levelSlugMap: Record<string, string> = {
    "Начинающий": "beginner",
    "Средний": "intermediate",
    "Продвинутый": "advanced",
};

export async function getAllCoursesForSeason(
    seasonId: string
): Promise<EnrichedCourse[]> {
    const categories = await getCategoriesBySeason(seasonId);
    const allCourses: EnrichedCourse[] = [];

    for (const cat of categories) {
        const levels = await getLevelsByCategory(cat.id);
        for (const level of levels) {
            const courses = await getCoursesByLevel(level.id);
            for (const course of courses) {
                allCourses.push({
                    ...course,
                    categoryName: cat.name,
                    categorySlug: cat.slug,
                    levelName: level.name,
                    levelSlug: levelSlugMap[level.name] || "beginner",
                    levelColor: level.color,
                });
            }
        }
    }

    return allCourses;
}


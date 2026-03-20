# Tagylym Project Log

---

## Session: 2026-03-20 — Phase 1 Audit + Fixes + Agent B KK Locale

### What was done

**Full platform audit across 8 areas, followed by all bug fixes and KK locale work.**

---

### AUDIT FINDINGS

| Area | Status | Notes |
|------|--------|-------|
| Lesson delivery (1.1–1.8) | WORKING | All null guards in place |
| Progress tracking (2.1–2.5) | WORKING | NaN% protection already in ProgressBar |
| Quiz system (3.1–3.9) | WORKING | Combined filter uses AND logic correctly |
| Checklist (4.1–4.5) | WORKING | RLS policies exist in schema.sql |
| Auth (5.1–5.9) | WORKING | Trigger + middleware all present |
| Routing — /resources | **BROKEN** | 10 missing i18n keys crashed the page |
| Routing — breadcrumb | MISSING | No breadcrumb on lesson page |
| ROI time=0 | PARTIAL | Showed 0.00 instead of "—" |
| getSeasonBySlug | **BROKEN** | Queried non-existent `slug` column on seasons table → all FLL category/level pages returned null |
| kk.json courses.of | PARTIAL | Had Russian text "из" |
| Nav locale switcher | PARTIAL | Wrong labels (ҚАЗ/РУС/ENG), no active bg color, no localStorage |
| Homepage CTA + tagline | MISSING | No hero CTA button, no hero_tagline key |

---

### FIXES APPLIED

#### P1 — CRITICAL: `getSeasonBySlug` broken
**File:** `src/lib/queries.ts`
**Problem:** The function queried `.eq("slug", seasonSlug)` but the `seasons` table has no `slug` column. All FLL category and level pages silently returned null → "not found".
**Fix:** Changed to query by `is_active = true` for the given competition. Since there's always exactly one active season, this is safe and robust.

#### P2 — BROKEN: `/resources` page crash
**Files:** `messages/ru.json`, `messages/en.json`, `messages/kk.json`
**Problem:** `resources/page.tsx` used 10 i18n keys (`subtitle`, `useful_links`, and 8 link title/desc keys) that didn't exist in any locale file. Server render crashed.
**Fix:** Added all 10 missing keys to all three locale files.

#### P5 — ROI division by zero display
**File:** `src/components/ROICalculator.tsx`
**Fix:** When `time = 0`, ROI now displays "—" instead of "0.00" in both the table and CSV export.

#### P7 — Missing i18n keys
**Files:** `messages/ru.json`, `messages/en.json`, `messages/kk.json`
- Added `home.hero_tagline` and `home.hero_cta` to all 3 locale files
- Fixed `kk.json` `courses.of` from Russian "из" to "/"

#### P8 — Breadcrumb navigation on lesson page
**File:** `src/app/[locale]/lessons/[slug]/page.tsx`
**Fix:** Added breadcrumb `Home / FLL / [Lesson Title]` at top of lesson content using `lesson.breadcrumb_home` translation key.

---

### AGENT B — KK Locale Work

#### KK as default locale
Already configured: `routing.ts` has `defaultLocale: "kk"`, middleware handles `kk|ru|en`. No changes needed.

#### kk.json completeness
- Was already complete (all ru.json keys present in kk.json)
- Fixed `courses.of = "из"` → `"/"`
- Added `home.hero_tagline = "Біз болашақ инженерлерді тәрбиелейміз"`
- Added `home.hero_cta = "Тегін бастау"`
- Added 10 missing resources keys in Kazakh

#### Nav locale switcher
**File:** `src/components/Nav.tsx`
**Changes:**
- Labels updated: ҚАЗ→KK, ENG→EN, РУС→RU
- Order: KK | EN (primary, equal weight) | divider | RU (secondary, smaller)
- Active locale: solid `#8B5CF6` background (per design system CTA color)
- Inactive: border + muted text
- Added `localStorage.setItem('tagylym_locale', newLocale)` on switch
- Mobile hamburger menu updated to match

#### Homepage hero
**File:** `src/app/[locale]/page.tsx`
**Changes:**
- Added tagline `{t("hero_tagline")}` ("Біз болашақ инженерлерді тәрбиелейміз" in KK) as h2 between the brand name and subtitles
- Added CTA button `{t("hero_cta")}` → links to `/lessons/zhestkoe-osnovanie` (first free lesson, no auth required)
- CTA styled with `#8B5CF6` (CTA accent color per design system)

#### Seed data i18n (OPTION A — i18n key mapping)
Category and level names are stored as Russian strings in Supabase (`"Конструирование"`, `"Начинающий"`, etc.). The frontend maps them to i18n keys via `fll.categories[slug]` and `courses.beginner/intermediate/advanced`. No DB changes needed — KK translations already exist in `fll.categories.*` and `courses.*` in `kk.json`.

---

### Files Changed
- `messages/ru.json`
- `messages/en.json`
- `messages/kk.json`
- `src/lib/queries.ts`
- `src/components/ROICalculator.tsx`
- `src/components/Nav.tsx`
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/lessons/[slug]/page.tsx`

---

### Verification
- `npx tsc --noEmit` → 0 errors
- `npx next build` → success, 36 pages generated

---

## SQL TO RUN

### Priority 1 — Fix banned emojis in category icons (Rule 3)
The seed data inserted banned emojis into category icons. Run in Supabase SQL Editor:

```sql
UPDATE public.categories SET icon = '🔧' WHERE slug = 'robot-design';
UPDATE public.categories SET icon = '💡' WHERE slug = 'innovation';
UPDATE public.categories SET icon = '📋' WHERE slug = 'coding';
UPDATE public.categories SET icon = '🎯' WHERE slug = 'robot-game';
```

### Priority 2 — Verify RLS INSERT policies exist
If progress saving is broken for users, run:

```sql
-- Verify policies exist
SELECT policyname, cmd FROM pg_policies WHERE tablename IN ('progress', 'checklist_progress');

-- If missing, create them:
CREATE POLICY "progress insert own"
  ON public.progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "checklist_progress insert own"
  ON public.checklist_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Priority 3 — Verify handle_new_user trigger
After registration, a row must appear in `public.users`. Verify the trigger exists:

```sql
SELECT trigger_name FROM information_schema.triggers
WHERE event_object_table = 'users' AND trigger_schema = 'auth';
```
If missing, run the trigger block from `schema.sql` lines 178–191.

---

### Additional fixes (2026-03-20 — URL stability + content UI)
- Fixed season slug en-dash leakage by adding `toSlug()` in `src/lib/utils.ts` and using it in `src/app/[locale]/page.tsx` and `src/app/[locale]/fll/page.tsx`.
- Fixed legacy “UUID-in-level-URL” 404s by adding `src/app/[locale]/fll/[season]/[category]/[level]/[id]/page.tsx` redirect route to the canonical level page.
- Removed UUID URL segment from link generation:
  - `src/components/CourseCard.tsx` now links to the canonical level page (no trailing UUID).
  - `src/app/[locale]/fll/[season]/[category]/[level]/LevelPageContent.tsx` renders course cards pointing back to the level page.
- Added `src/components/CoreValuesCallout.tsx` and updated the category page to use it.
- Added per-level “What you’ll learn” section and upgraded the level course grid layout (2-column desktop + dashed placeholder + course progress bar + CTA).

## NEEDS REVIEW

1. **Dashboard "Continue Learning" link** — The link uses `p.lesson_id` (Supabase UUID) as the URL slug for `/lessons/{id}`. But the lesson page loads from Sanity by slug, so navigating to a UUID returns "not found". Fix requires either: (a) storing the Sanity slug in the `progress` table, or (b) fetching lesson titles from Supabase and resolving slugs. Needs a design decision.

2. **Season slug column** — The seasons table has no `slug` column. `getSeasonBySlug` now falls back to `is_active = true`. If you ever add multiple seasons simultaneously (past + future), you should add a `slug TEXT` column to the seasons table and update the seed accordingly.

3. **Hardcoded "Деңгей" string** in `lessons/[slug]/page.tsx:211` — uses Kazakh hardcoded in template literal. Should use an i18n key if full i18n is needed.

4. **FLL course card heading** — `src/app/[locale]/fll/page.tsx:169` has `FLL CHALLENGE: ТРЕК ${course.categoryName}` hardcoded Russian "ТРЕК". Should use `t("quiz.filter_track")` or a dedicated key.

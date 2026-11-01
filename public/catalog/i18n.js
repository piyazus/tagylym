"use strict";
const englishModules = [
  "Team, Robot and Working Safely",
  "Competition Robot Mechanics",
  "Programming Movement",
  "Sensors and Autonomous Navigation",
  "Competition Engineering",
  "Project, Team and Practice Tournament",
];
const englishLessons = [
  "Trial lesson: Meet the Robot",
  "LEGO Parts and Strong Construction",
  "Hub, Motors, Sensors and Ports",
  "Your First Moving Model",
  "Wheels, Distance and Measurement",
  "Turns and the Support Wheel",
  "Gears, Speed and Force",
  "A Rigid, Symmetrical Frame",
  "Passive Mechanisms",
  "Motorised Attachments",
  "Algorithms and Sequences",
  "Repetition and Loops",
  "Conditions and Choices",
  "Variables and Data",
  "Custom Blocks and Functions",
  "Finding Errors",
  "Driving Straight Accurately",
  "Colour Sensor and Calibration",
  "Stopping at a Line",
  "Following a Line",
  "Gyroscope and Precise Turns",
  "Touch, Force and Distance",
  "Two Signals in One Task",
  "The Test Track",
  "Rules, Field, Points and Season Theme",
  "Accurate Starts and Alignment",
  "Interchangeable Attachments",
  "One Mission from Start to Finish",
  "A Route with Several Missions",
  "Reviewing the Journal and Planning the Project",
  "An Unexpected Change",
  "Reliability and Practice Runs",
  "Research, Prototype and Feedback",
  "Improving the Project and Telling the Team’s Story",
  "FLL Practice Tournament",
  "WRO Practice Tournament and Wrap-up",
];
const enDescriptions = [
  "Meet the parts, learn to work safely and build your first moving models.",
  "Explore wheels, gears and frames. See how design affects a robot’s movement.",
  "Build algorithms, use loops and conditions, find errors and control movement.",
  "Read sensor data and use it for movement and navigation.",
  "Explore competition challenges, plan missions and test the reliability of solutions.",
  "Prepare a team project, explain your decisions and run a practice tournament.",
];
const translations = {
  из: "of",
  "0 из 36": "0 of 36",
  "Перейти к занятиям": "Skip to lessons",
  "Tagylym, главная": "Tagylym, home",
  Навигация: "Navigation",
  Курс: "Course",
  "Без робота": "Without a robot",
  Менторам: "For mentors",
  "Написать нам": "Contact us",
  "Робототехника.": "Robotics.",
  "Своими руками.": "Hands-on.",
  "Бесплатный курс для 3–4 классов (8–11 лет) и менторов.":
    "A free robotics course for grades 3–4 (ages 8–11) and their mentors.",
  "36 занятий": "36 lessons",
  "в шести модулях": "in six modules",
  "8–11 лет": "Ages 8–11",
  "SPIKE Prime и EV3": "SPIKE Prime and EV3",
  Бесплатно: "Free",
  "без аккаунта Tagylym": "no Tagylym account needed",
  Программа: "Course outline",
  "Модули курса": "Course modules",
  "Загружаем модули…": "Loading modules…",
  "Перейти к модулю": "Go to module",
  "Выбрать модуль": "Choose a module",
  Пройдено: "Completed",
  "Только в этом браузере.": "Only in this browser.",
  "Все файлы курса": "All course files",
  "Материалы для ученика или ментора": "Materials for learners or mentors",
  Ученик: "Learner",
  Ментор: "Mentor",
  "Найти тему или занятие": "Search topics or lessons",
  "Сбросить поиск": "Clear search",
  "Открой занятие и выбери презентацию. После практики отметь, что прошёл.":
    "Open a lesson and choose a presentation. Mark it complete after practising.",
  "Загружаем программу курса…": "Loading the course…",
  "Начать можно": "You can start",
  "без робота.": "without a robot.",
  "Задания на бумаге и в Scratch. Обычно 15–25 минут; что понадобится, указано внутри.":
    "Activities on paper and in Scratch. Most take 15–25 minutes; each explains what you need.",
  "Открыть 12 карточек PDF": "Open 12 activity cards (PDF)",
  "Начни с заданий 1, 5 и 9. Они рассчитаны на детей 8–10 лет. Для заданий с физической моделью понадобится подходящий набор.":
    "Start with activities 1, 5 and 9, designed for ages 8–10. Activities involving a physical model need a suitable robotics kit.",
  Подготовиться: "Prepare",
  "к занятию.": "your lesson.",
  "Для ментора: структура курса, презентации и план каждого модуля. Выбери режим «Ментор» в программе, чтобы увидеть материалы для подготовки.":
    "For mentors: find the course structure, presentations and plans for each module. Choose “Mentor” in the course to see preparation materials.",
  "Открыть материалы ментора": "Explore mentor resources",
  "Силлабус курса": "Course syllabus",
  "36 занятий, 72 академических часа": "36 lessons, 72 academic hours",
  "Вводная презентация": "Course introduction",
  "Обзор всего курса в PDF": "Full course overview in PDF",
  "Обратная связь": "Feedback",
  "Расскажите, чего не хватает вашим ученикам":
    "Tell us what your learners need",
  "Что нужно знать перед стартом": "Before you start",
  "Какое оборудование нужно?": "What equipment do I need?",
  "Практическая часть курса рассчитана на LEGO SPIKE Prime или EV3 и устройство с подходящим приложением. Уточняйте требования к конкретному занятию вместе с ментором. Часть самостоятельных заданий можно выполнить без робота.":
    "The hands-on course uses LEGO SPIKE Prime or EV3 and a device with a compatible app. Check each lesson’s requirements with your mentor. Some independent activities can be done without a robot.",
  "Как пользоваться материалами?": "How do I use the materials?",
  "Откройте модуль и занятие. PDF подходит для просмотра, PPTX — для подготовки и проведения урока. Файлы открываются в Google Drive; их доступность зависит от настроек исходного файла.":
    "Open a module and lesson. Use the PDF to view the material and PPTX to prepare or teach. Files open in Google Drive; availability depends on the original file’s sharing settings.",
  "Это официальный курс FIRST или LEGO?":
    "Is this an official FIRST or LEGO course?",
  "Tagylym — самостоятельный образовательный проект. Курс помогает освоить основы и типовые задачи робототехники. Возрастные требования и действующие правила конкретного турнира проверяйте отдельно.":
    "Tagylym is an independent educational project. The course covers robotics fundamentals and common challenges. Check age eligibility and current rules with the organiser of each competition.",
  "Что происходит с отметками о прохождении?": "What happens to my progress?",
  "Вы ставите отметки сами после практики. Они хранятся только в текущем браузере и не синхронизируются с другими устройствами. После очистки данных браузера отметки могут исчезнуть.":
    "You mark lessons complete yourself after practising. Progress is stored only in this browser and does not sync between devices. It may be lost if browser data is cleared.",
  "Методология и продукт — Арнур Кемербек":
    "Methodology and product: Arnur Kemerbek",
  "Текущие материалы бесплатные": "Current materials are free",
  "Исходные PDF и презентации на Google Drive доступны на русском языке.":
    "The original PDFs and presentations on Google Drive are in Russian.",
  "Память браузера недоступна. Отметки сохранятся только до закрытия страницы.":
    "Browser storage is unavailable. Progress will last only until this page is closed.",
  "Занятие отмечено как пройденное.": "Lesson marked complete.",
  "Отметка о прохождении снята.": "Completion mark removed.",
  "Отметить занятие как пройденное": "Mark lesson complete",
  "Пройдено: ": "Completed: ",
  "Открыть PDF: ": "Open PDF: ",
  "Открыть PPTX: ": "Open PPTX: ",
  "Откройте PDF для просмотра или PPTX для подготовки занятия. Практическую часть адаптируйте под оборудование и опыт вашей команды.":
    "Open the PDF to view or the PPTX to prepare your lesson. Adapt hands-on activities to your team’s equipment and experience.",
  "Открой презентацию, обсуди задание с ментором и попробуй выполнить его на модели. После практики можно отметить занятие как пройденное.":
    "Open the presentation, discuss the activity with your mentor and try it on a model. You can mark the lesson complete after practising.",
  "Открыть PDF": "Open PDF",
  "Открыть PPTX": "Open PPTX",
  "Все файлы занятия": "All lesson files",
  "Файлы откроются в Google Drive. Отметка о прохождении сохранится в этом браузере.":
    "Files open in Google Drive and are in Russian. Your completion mark is saved in this browser.",
  "Занятия ": "Lessons ",
  " · Найдено: ": " · Found: ",
  "Для подготовки": "For preparation",
  "План модуля": "Module plan",
  "Вводная PDF": "Introduction PDF",
  "Вводная PPTX": "Introduction PPTX",
  "По этому запросу занятий нет. Попробуй «датчик», «колёса» или номер занятия.":
    "No lessons found. Try “sensor”, “wheels” or a lesson number.",
  "Показать весь курс": "Show the full course",
  "Найдено занятий: ": "Lessons found: ",
  "Откройте план модуля и презентации для подготовки. В каждом занятии есть PDF и PPTX.":
    "Open the module plan and presentations to prepare. Every lesson includes a PDF and PPTX.",
  "Не удалось загрузить программу.": "Could not load the course outline.",
  "Не удалось загрузить занятия. Обновите страницу или откройте исходную папку.":
    "Could not load the lessons. Refresh the page or open the original course folder.",
  "Открыть папку курса": "Open the course folder",
  "Для поиска и просмотра программы включите JavaScript или":
    "Enable JavaScript to browse and search the course, or",
  "откройте папку курса": "open the course folder",
};
let language = "ru";
try {
  const stored = localStorage.getItem("tagylym.language");
  if (stored === "en" || stored === "ru") language = stored;
} catch {}
const routeLanguage = location.pathname.match(/^\/(ru|en)\/?$/)?.[1];
const queryLanguage = new URLSearchParams(location.search).get("lang");
if (routeLanguage) language = routeLanguage;
else if (["ru", "en"].includes(queryLanguage)) language = queryLanguage;
document.cookie = `NEXT_LOCALE=${language};path=/;max-age=31536000;SameSite=Lax`;
function tr(text) {
  return language === "en" ? translations[text] || text : text;
}
let staticNodes = [],
  staticAttrs = [];
function initialiseTranslation() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode,
      raw = node.nodeValue,
      key = raw.trim();
    if (key && translations[key]) staticNodes.push({ node, raw, key });
  }
  for (const el of document.querySelectorAll(
    "[aria-label], [placeholder], [title]",
  ))
    for (const name of ["aria-label", "placeholder", "title"]) {
      const value = el.getAttribute(name);
      if (value && translations[value]) staticAttrs.push({ el, name, value });
    }
  applyTranslation();
}
function applyTranslation() {
  document.documentElement.lang = language;
  document.title =
    language === "en"
      ? "Tagylym — robotics course"
      : "Tagylym — курс робототехники";
  document.querySelector('meta[name="description"]').content =
    language === "en"
      ? "Free robotics lessons for grades 3–4 and their mentors: 36 lessons, presentations and independent activities."
      : "Бесплатные материалы по робототехнике для учеников 3–4 классов и их менторов: 36 занятий, презентации PDF и PPTX, самостоятельные задания.";
  for (const { node, raw, key } of staticNodes) {
    if (node.isConnected) node.nodeValue = raw.replace(key, tr(key));
  }
  for (const { el, name, value } of staticAttrs) {
    if (el.isConnected) el.setAttribute(name, tr(value));
  }
  document.querySelectorAll("[data-language]").forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

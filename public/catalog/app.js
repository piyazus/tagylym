"use strict";
const $ = (id) => document.getElementById(id);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const pad = (n) => String(n).padStart(2, "0");
const external =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M10 5H5v15h15v-6"/></svg>';
const chevron =
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const state = {
  data: null,
  originalData: null,
  englishTasks: [],
  role: "learner",
  query: "",
  completed: new Set(),
  storage: true,
  openedLessons: new Set(),
  openChapters: new Set([1]),
};
const descriptions = {
  1: "Знакомимся с деталями, работаем безопасно и собираем первые движущиеся модели.",
  2: "Изучаем колёса, шестерни и раму. Проверяем, как конструкция влияет на движение робота.",
  3: "Составляем алгоритмы, используем циклы и условия, ищем ошибки и настраиваем движение.",
  4: "Учимся считывать данные датчиков и использовать их для движения и навигации.",
  5: "Разбираем соревновательные задачи, планируем миссии и проверяем надёжность решений.",
  6: "Готовим командный проект, объясняем свои решения и проводим пробный турнир.",
};
try {
  const saved = JSON.parse(
    localStorage.getItem("tagylym.completed.v1") || "[]",
  );
  if (Array.isArray(saved))
    state.completed = new Set(saved.filter(Number.isInteger));
} catch {
  state.storage = false;
}
function status(message) {
  $("status-message").textContent = message;
  $("status-message").classList.add("visible");
  clearTimeout(status.timer);
  status.timer = setTimeout(
    () => $("status-message").classList.remove("visible"),
    2500,
  );
}
function updateProgress() {
  const total = state.data?.lessonCount || 36;
  $("progress-count").textContent =
    `${state.completed.size} ${tr("из")} ${total}`;
  $("course-progress").value = state.completed.size;
  $("course-progress").max = total;
  $("course-progress").textContent =
    `${state.completed.size} ${tr("из")} ${total}`;
  document.querySelector(".progress-area p").textContent = state.storage
    ? tr("Только в этом браузере.")
    : tr(
        "Память браузера недоступна. Отметки сохранятся только до закрытия страницы.",
      );
}
function setCompleted(number, done) {
  if (done) state.completed.add(number);
  else state.completed.delete(number);
  try {
    localStorage.setItem(
      "tagylym.completed.v1",
      JSON.stringify([...state.completed]),
    );
  } catch {
    state.storage = false;
  }
  updateProgress();
  document
    .querySelectorAll(`[data-complete="${number}"]`)
    .forEach((i) => (i.checked = done));
  status(
    tr(
      done
        ? "Занятие отмечено как пройденное."
        : "Отметка о прохождении снята.",
    ),
  );
}
function renderNav() {
  const data = state.data;
  if (!data) return;
  const selected = Number(
    document.querySelector(".chapter-link.active")?.dataset.chapter || 1,
  );
  $("chapter-nav").innerHTML = data.modules
    .map(
      (m) =>
        `<a class="chapter-link ${m.number === selected ? "active" : ""}" href="#chapter-${m.number}" data-chapter="${m.number}"><span>${pad(m.number)}</span><span>${esc(m.title)}</span></a>`,
    )
    .join("");
  $("chapter-select").innerHTML =
    `<option value="">${tr("Выбрать модуль")}</option>` +
    data.modules
      .map(
        (m) =>
          `<option value="${m.number}">${m.number}. ${esc(m.title)}</option>`,
      )
      .join("");
}
function lessonMarkup(l, module) {
  const id = `lesson-details-${l.number}`;
  const open = state.openedLessons.has(l.number);
  return `<article class="lesson"><div class="lesson-main"><span class="lesson-number">${pad(l.number)}</span><button class="lesson-control" data-lesson="${l.number}" aria-expanded="${open}" aria-controls="${id}"><span>${esc(l.title)}</span>${chevron}</button><label class="lesson-complete" title="${tr("Отметить занятие как пройденное")}"><input type="checkbox" data-complete="${l.number}" ${state.completed.has(l.number) ? "checked" : ""} aria-label="${tr("Пройдено: ")}${esc(l.title)}"></label><a class="lesson-file" href="${esc(l.pdf || l.folder)}" target="_blank" rel="noopener" aria-label="${tr("Открыть PDF: ")}${esc(l.title)}">PDF${external}</a>${state.role === "mentor" ? `<a class="lesson-file mentor-only" href="${esc(l.pptx || l.pdf)}" target="_blank" rel="noopener" aria-label="${tr("Открыть PPTX: ")}${esc(l.title)}">PPTX${external}</a>` : ""}</div><div class="lesson-details" id="${id}" ${open ? "" : "hidden"}><p>${tr(state.role === "mentor" ? "Откройте PDF для просмотра или PPTX для подготовки занятия. Практическую часть адаптируйте под оборудование и опыт вашей команды." : "Открой презентацию, обсуди задание с ментором и попробуй выполнить его на модели. После практики можно отметить занятие как пройденное.")}</p><div class="lesson-document-links"><a class="file-action" href="${esc(l.pdf || l.folder)}" target="_blank" rel="noopener">${tr("Открыть PDF")}${external}</a><a class="file-action secondary" href="${esc(l.pptx || l.pdf)}" target="_blank" rel="noopener">${tr("Открыть PPTX")}${external}</a><a class="source-action" href="${esc(l.folder || module.folder)}" target="_blank" rel="noopener">${tr("Все файлы занятия")}${external}</a></div><p class="completion-note">${tr("Файлы откроются в Google Drive. Отметка о прохождении сохранится в этом браузере.")}</p></div></article>`;
}
function renderChapters() {
  if (!state.data) return;
  const query = state.query.toLocaleLowerCase();
  let matches = 0;
  const chapters = state.data.modules
    .map((m) => {
      const lessons = m.lessons.filter(
        (l) =>
          !query ||
          `${l.title} ${l.ruTitle} ${l.enTitle} ${m.title} ${m.ruTitle} ${m.enTitle} ${l.number}`
            .toLocaleLowerCase()
            .includes(query),
      );
      matches += lessons.length;
      if (!lessons.length) return "";
      const opened = !!query || state.openChapters.has(m.number);
      return `<details class="chapter" id="chapter-${m.number}" data-chapter-section="${m.number}" ${opened ? "open" : ""}><summary class="chapter-title"><span class="chapter-number">${pad(m.number)}</span><div class="chapter-label"><h2>${esc(m.title)}</h2><p>${tr("Занятия ")}${m.range?.join("–") || ""}${query ? `${tr(" · Найдено: ")}${lessons.length}` : ""}</p></div><span class="chapter-toggle">${chevron}</span></summary><div class="chapter-lessons"><p class="chapter-description">${esc(language === "en" ? enDescriptions[m.number - 1] : descriptions[m.number] || "")}</p>${state.role === "mentor" ? `<div class="module-docs"><span>${tr("Для подготовки")}</span><a href="${esc(m.syllabus || m.folder)}" target="_blank" rel="noopener">${tr("План модуля")}${external}</a><a href="${esc(m.introPdf || m.folder)}" target="_blank" rel="noopener">${tr("Вводная PDF")}${external}</a><a href="${esc(m.introPptx || m.folder)}" target="_blank" rel="noopener">${tr("Вводная PPTX")}${external}</a></div>` : ""}${lessons.map((l) => lessonMarkup(l, m)).join("")}</div></details>`;
    })
    .join("");
  $("chapter-list").innerHTML =
    chapters ||
    `<div class="load-state"><p>${tr("По этому запросу занятий нет. Попробуй «датчик», «колёса» или номер занятия.")}</p><button data-reset>${tr("Показать весь курс")}</button></div>`;
  $("search-state").hidden = !state.query;
  $("search-message").textContent = `${tr("Найдено занятий: ")}${matches}`;
  document.querySelectorAll("[data-chapter-section]").forEach((el) =>
    el.addEventListener("toggle", () => {
      if (state.query) return;
      const n = Number(el.dataset.chapterSection);
      if (el.open) state.openChapters.add(n);
      else state.openChapters.delete(n);
    }),
  );
}
function markdown(text) {
  const lines = String(text || "").split("\n");
  let out = "",
    inList = false;
  const inline = (s) =>
    esc(s)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>',
      );
  for (const line of lines) {
    const match = line.match(/^\d+\.\s+(.*)/);
    if (match) {
      if (!inList) {
        out += "<ol>";
        inList = true;
      }
      out += `<li>${inline(match[1])}</li>`;
    } else {
      if (inList) {
        out += "</ol>";
        inList = false;
      }
      if (line.trim()) out += `<p>${inline(line)}</p>`;
    }
  }
  if (inList) out += "</ol>";
  return out;
}
function renderPractice() {
  if (!state.data) return;
  const original = state.data.selfStudy?.tasks || [];
  const tasks = language === "en" ? state.englishTasks : original;
  if (language === "en" && !tasks.length) {
    $("practice-list").innerHTML =
      '<p class="load-state">English activities could not be loaded. Please refresh the page.</p>';
    return;
  }
  $("practice-list").innerHTML = tasks
    .map((t) => {
      const body = String(t.content || "").replace(/^\d+\.\s+[^\n]+\n+/, "");
      return `<details class="practice-task"><summary><span>${pad(t.number)}</span><strong>${esc(t.title)}</strong>${chevron}</summary><div class="task-content">${markdown(body)}</div></details>`;
    })
    .join("");
}
function openChapter(number) {
  if (state.query) {
    state.query = "";
    $("lesson-search").value = "";
    renderChapters();
  }
  state.openChapters.add(number);
  const chapter = $(`chapter-${number}`);
  if (chapter) {
    chapter.open = true;
    chapter.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    document
      .querySelectorAll(".chapter-link")
      .forEach((a) =>
        a.classList.toggle("active", Number(a.dataset.chapter) === number),
      );
  }
}
function changeRole(role) {
  state.role = role;
  document.querySelectorAll("[data-role]").forEach((b) => {
    const active = b.dataset.role === role;
    b.classList.toggle("active", active);
    b.setAttribute("aria-pressed", String(active));
  });
  $("reading-note").querySelector("p").textContent = tr(
    role === "mentor"
      ? "Откройте план модуля и презентации для подготовки. В каждом занятии есть PDF и PPTX."
      : "Открой занятие и выбери презентацию. После практики отметь, что прошёл.",
  );
  renderChapters();
}
function resetSearch() {
  state.query = "";
  $("lesson-search").value = "";
  renderChapters();
}
document.addEventListener("click", (event) => {
  const lang = event.target.closest("[data-language]");
  if (lang) {
    setLanguage(lang.dataset.language);
    return;
  }
  const role = event.target.closest("[data-role]");
  if (role) {
    changeRole(role.dataset.role);
    return;
  }
  const nav = event.target.closest("[data-chapter]");
  if (nav) {
    event.preventDefault();
    openChapter(Number(nav.dataset.chapter));
    return;
  }
  const lesson = event.target.closest("[data-lesson]");
  if (lesson) {
    const n = Number(lesson.dataset.lesson);
    const open = !state.openedLessons.has(n);
    if (open) state.openedLessons.add(n);
    else state.openedLessons.delete(n);
    lesson.setAttribute("aria-expanded", String(open));
    $(`lesson-details-${n}`).hidden = !open;
    return;
  }
  if (event.target.closest("[data-reset]")) resetSearch();
});
document.addEventListener("change", (event) => {
  if (event.target.matches("[data-complete]"))
    setCompleted(Number(event.target.dataset.complete), event.target.checked);
});
$("lesson-search").addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  renderChapters();
});
$("reset-search").addEventListener("click", () => {
  resetSearch();
  $("lesson-search").focus();
});
$("chapter-select").addEventListener("change", (event) => {
  if (event.target.value) openChapter(Number(event.target.value));
});
$("mentor-mode").addEventListener("click", () => {
  changeRole("mentor");
  $("course").scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
  document.querySelector('[data-role="mentor"]').focus({ preventScroll: true });
});
function localizeData() {
  if (!state.originalData) return;
  state.data = {
    ...state.originalData,
    modules: state.originalData.modules.map((m) => ({
      ...m,
      ruTitle: m.title,
      enTitle: englishModules[m.number - 1],
      title: language === "en" ? englishModules[m.number - 1] : m.title,
      lessons: m.lessons.map((l) => ({
        ...l,
        ruTitle: l.title,
        enTitle: englishLessons[l.number - 1],
        title: language === "en" ? englishLessons[l.number - 1] : l.title,
      })),
    })),
  };
}
function setLanguage(next) {
  if (!["ru", "en"].includes(next)) return;
  language = next;
  document.cookie = `NEXT_LOCALE=${language};path=/;max-age=31536000;SameSite=Lax`;
  const address = new URL(location.href);
  address.pathname = "/" + language;
  address.searchParams.delete("lang");
  history.replaceState(
    null,
    "",
    address.pathname + address.search + address.hash,
  );
  try {
    localStorage.setItem("tagylym.language", language);
  } catch {}
  applyTranslation();
  localizeData();
  renderNav();
  renderChapters();
  renderPractice();
  updateProgress();
  $("reading-note").querySelector("p").textContent = tr(
    state.role === "mentor"
      ? "Откройте план модуля и презентации для подготовки. В каждом занятии есть PDF и PPTX."
      : "Открой занятие и выбери презентацию. После практики отметь, что прошёл.",
  );
}
initialiseTranslation();
async function loadCourse() {
  try {
    const response = await fetch("/catalog/curriculum.json");
    if (!response.ok) throw new Error();
    const data = await response.json();
    if (!data.modules?.length) throw new Error();
    state.originalData = data;
    try {
      const english = await fetch("/catalog/tasks-en.json");
      if (english.ok) {
        const tasks = await english.json();
        if (Array.isArray(tasks)) state.englishTasks = tasks;
      }
    } catch {}
    localizeData();
    const valid = new Set(
      data.modules.flatMap((m) => m.lessons.map((l) => l.number)),
    );
    state.completed = new Set([...state.completed].filter((n) => valid.has(n)));
    renderNav();
    renderChapters();
    renderPractice();
    updateProgress();
    if (data.syllabus) $("syllabus-link").href = data.syllabus;
    if (data.introPdf) $("overview-link").href = data.introPdf;
    const pdf = data.selfStudy?.files?.find(
      (f) => f.mimeType === "application/pdf",
    );
    if (pdf) $("practice-pdf").href = pdf.url;
  } catch {
    $("chapter-nav").innerHTML =
      `<p class="nav-loading">${tr("Не удалось загрузить программу.")}</p>`;
    $("chapter-list").innerHTML =
      `<div class="load-state"><p>${tr("Не удалось загрузить занятия. Обновите страницу или откройте исходную папку.")}</p><a href="https://drive.google.com/drive/folders/1RbuA-boTM_OCuYcIMMUtJlN-sfW0Lm5Z" target="_blank" rel="noopener">${tr("Открыть папку курса")}</a></div>`;
  }
}
loadCourse();

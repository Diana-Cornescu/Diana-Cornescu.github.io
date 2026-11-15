/* =============================================================================
   app.js — does three small jobs. It does NOT build pages; the pages are
   real HTML you can edit. This script only:
     1. Fills your personal details from config.js into the HTML
        (anything marked data-field="..." or data-list="...").
     2. Renders your résumé lists (experience / education / skills) from config.
     3. Runs the dark/light toggle and the collapsible sidebar.
   ========================================================================== */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var profile = cfg.profile || {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---- 1. Fill simple text + links from config.profile ------------------- */
  // Any element like  <span data-field="email"></span>  gets profile.email.
  function fillFields() {
    document.querySelectorAll("[data-field]").forEach(function (el) {
      var key = el.getAttribute("data-field");
      var val = key === "resumeFile" ? profile.resumeFile : profile[key];
      if (val == null) return;
      el.textContent = val;
      // Turn certain fields into working links automatically:
      var as = el.getAttribute("data-href");
      if (as === "mailto") el.setAttribute("href", "mailto:" + val);
      else if (as === "tel") el.setAttribute("href", "tel:" + String(val).replace(/[^+\d]/g, ""));
    });
    // Links that point at files/URLs from config (résumé button, socials):
    document.querySelectorAll('[data-link="resume"]').forEach(function (el) {
      if (profile.resumeFile) el.setAttribute("href", profile.resumeFile);
    });
    document.querySelectorAll('[data-link="email"]').forEach(function (el) {
      if (profile.email) el.setAttribute("href", "mailto:" + profile.email);
    });
    var s = profile.social || {};
    document.querySelectorAll('[data-link="github"]').forEach(function (el) {
      if (s.github) el.setAttribute("href", s.github); else el.remove();
    });
    document.querySelectorAll('[data-link="linkedin"]').forEach(function (el) {
      if (s.linkedin) el.setAttribute("href", s.linkedin); else el.remove();
    });
  }

  /* ---- 2. Render the résumé lists from config ---------------------------- */
  function renderLists() {
    var stats = document.querySelector('[data-list="stats"]');
    if (stats) stats.innerHTML = (profile.stats || []).map(function (s) {
      return '<div class="stat"><div class="stat-value">' + esc(s.value) + '</div>' +
        '<div class="stat-label">' + esc(s.label) + '</div></div>';
    }).join("");

    var exp = document.querySelector('[data-list="experience"]');
    if (exp) exp.innerHTML = (cfg.experience || []).map(function (e) {
      var bullets = (e.bullets || []).map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("");
      return '<div class="exp">' +
        '<div class="exp-head"><span class="exp-role">' + esc(e.title) + '</span>' +
        '<span class="exp-when">' + esc(e.start) + " — " + esc(e.end) + '</span></div>' +
        '<div class="exp-org">' + esc(e.org) + '</div>' +
        (bullets ? '<ul class="bullets">' + bullets + '</ul>' : "") +
      '</div>';
    }).join("");

    var edu = document.querySelector('[data-list="education"]');
    if (edu) edu.innerHTML = (cfg.education || []).map(function (e) {
      return '<div class="exp">' +
        '<div class="exp-head"><span class="exp-role">' + esc(e.degree) + '</span>' +
        '<span class="exp-when">' + esc(e.start) + " — " + esc(e.end) + '</span></div>' +
        '<div class="exp-org">' + esc(e.org) + '</div>' +
        (e.note ? '<p class="exp-note">' + esc(e.note) + '</p>' : "") +
      '</div>';
    }).join("");

    var skills = document.querySelector('[data-list="skills"]');
    if (skills) skills.innerHTML = (cfg.skills || []).map(function (s) {
      return '<span class="skill">' + esc(s) + '</span>';
    }).join("");

    // Project cards (Projects page) — built from cfg.projects
    var ARROW = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var projects = document.querySelector('[data-list="projects"]');
    if (projects) projects.innerHTML = (cfg.projects || []).map(function (p) {
      var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
      return '<a class="card" href="' + esc(p.url || "#") + '">' +
        '<div class="card-head"><div>' +
          '<div class="card-title">' + esc(p.title) + '</div>' +
          '<div class="card-type">' + esc(p.type || "") + '</div>' +
        '</div><span class="card-arrow">' + ARROW + '</span></div>' +
        '<p class="card-desc">' + esc(p.description || "") + '</p>' +
        '<div class="tags">' + tags + '</div>' +
      '</a>';
    }).join("");

    // Gallery tiles — auto-collected from every image across every project
    var gallery = document.querySelector('[data-list="gallery"]');
    if (gallery) {
      var tiles = [];
      (cfg.projects || []).forEach(function (p) {
        (p.images || []).forEach(function (img) {
          tiles.push(
            '<figure class="tile">' +
              '<img class="tile-img" src="' + esc(img.src) + '" alt="' + esc(img.caption || p.title) + '" loading="lazy">' +
              '<figcaption class="tile-meta">' +
                '<div class="tile-title">' + esc(img.caption || p.title) + '</div>' +
                '<div class="tile-sub">' + esc(p.title) + (img.kind ? " · " + esc(img.kind) : "") + '</div>' +
              '</figcaption>' +
            '</figure>'
          );
        });
      });
      gallery.innerHTML = tiles.join("");
    }
  }

  /* ---- 3a. Dark / light: system default, then remembered ----------------- */
  var THEME_KEY = "diana-theme";
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  function currentTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return mql.matches ? "dark" : "light";
  }
  function applyTheme(mode) { document.documentElement.setAttribute("data-theme", mode); }
  function paintThemeButton() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var dark = currentTheme() === "dark";
    var sun = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var moon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    btn.innerHTML = (dark ? sun : moon) + '<span class="label">' + (dark ? "Light mode" : "Dark mode") + "</span>";
  }
  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next); paintThemeButton();
  }
  mql.addEventListener("change", function () {
    if (!localStorage.getItem(THEME_KEY)) { applyTheme(currentTheme()); paintThemeButton(); }
  });

  /* ---- 3b. Collapsible sidebar: remembered ------------------------------- */
  var COLLAPSE_KEY = "diana-collapsed";
  function applyCollapsed() {
    document.body.classList.toggle("collapsed", localStorage.getItem(COLLAPSE_KEY) === "1");
  }
  function toggleCollapsed() {
    var now = document.body.classList.toggle("collapsed");
    localStorage.setItem(COLLAPSE_KEY, now ? "1" : "0");
  }

  /* ---- boot -------------------------------------------------------------- */
  function boot() {
    fillFields();
    renderLists();
    var ct = document.getElementById("collapseToggle");
    if (ct) ct.addEventListener("click", toggleCollapsed);
    var tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", toggleTheme);
    paintThemeButton();
  }

  applyTheme(currentTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyCollapsed(); boot(); });
  } else {
    applyCollapsed(); boot();
  }
})();

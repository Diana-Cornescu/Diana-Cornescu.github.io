/* =============================================================================
   app.js — fills pages from config.js, renders the résumé/projects lists, runs
   dark/light + collapsible sidebar, and powers the Design page.

   The DESIGN PAGE (design.html, linked in the sidebar) lets you tune the colors
   and font. Your choices are saved in this browser and applied across EVERY page
   automatically. To publish them as the default everyone sees, use the "Copy CSS"
   box on the Design page and paste it into assets/theme.css (or send it to Claude).
   ========================================================================== */
(function () {
  "use strict";
  var cfg = window.SITE_CONFIG || {};
  var profile = cfg.profile || {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Stable URL slug for a project (used by its detail page, cards, gallery).
  function slugify(s) {
    return String(s == null ? "" : s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }
  function projSlug(p) { return slugify(p.slug || p.title); }
  function projHref(p) { return "project.html?p=" + encodeURIComponent(projSlug(p)); }

  /* ---- 1. Fill text + links from config.profile -------------------------- */
  function fillFields() {
    document.querySelectorAll("[data-field]").forEach(function (el) {
      var key = el.getAttribute("data-field");
      var val = key === "resumeFile" ? profile.resumeFile : profile[key];
      if (val == null) return;
      el.textContent = val;
      var as = el.getAttribute("data-href");
      if (as === "mailto") el.setAttribute("href", "mailto:" + val);
      else if (as === "tel") el.setAttribute("href", "tel:" + String(val).replace(/[^+\d]/g, ""));
    });
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
    // Show a cleaned handle for social links (e.g. "github.com/Diana-Cornescu")
    ["github", "linkedin"].forEach(function (net) {
      var url = s[net];
      document.querySelectorAll('[data-social-text="' + net + '"]').forEach(function (el) {
        if (url) el.textContent = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      });
    });
    // Hide optional contact rows whose profile value is empty (e.g. phone)
    document.querySelectorAll("[data-optional-field]").forEach(function (el) {
      var k = el.getAttribute("data-optional-field");
      var v = profile[k];
      if (v == null || String(v).trim() === "") el.style.display = "none";
    });
  }

  /* ---- 2. Render list sections from config ------------------------------- */
  function renderLists() {
    var stats = document.querySelector('[data-list="stats"]');
    if (stats) stats.innerHTML = (profile.stats || []).map(function (s) {
      return '<div class="stat"><div class="stat-value">' + esc(s.value) + '</div>' +
        '<div class="stat-label">' + esc(s.label) + '</div></div>';
    }).join("");

    var exp = document.querySelector('[data-list="experience"]');
    if (exp) exp.innerHTML = (cfg.experience || []).map(function (e) {
      var bullets = (e.bullets || []).map(function (b) {
        var text = (b && typeof b === "object") ? (b.text || "") : b;
        var cats = (b && typeof b === "object" && b.cats) ? b.cats : [];
        var dc = cats.map(function (c) { return String(c).toLowerCase(); }).join("|");
        return '<li data-cats="' + esc(dc) + '">' + esc(text) + '</li>';
      }).join("");
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

    var skcat = document.querySelector('[data-list="skill-categories"]');
    if (skcat) skcat.innerHTML = (cfg.skillCategories || []).map(function (g) {
      var items = (g.items || []).map(function (i) { return esc(i); }).join(", ");
      return '<div class="skillcat">' +
        '<span class="skillcat-label">' + esc(g.category) + ':</span> ' +
        '<span class="skillcat-items">' + items + '</span>' +
      '</div>';
    }).join("");

    var ARROW = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var projects = document.querySelector('[data-list="projects"]');
    if (projects) projects.innerHTML = (cfg.projects || []).map(function (p) {
      var tagList = p.tags || [];
      var tags = tagList.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
      var dataTags = tagList.map(function (t) { return String(t).toLowerCase(); }).join("|");
      return '<a class="card" href="' + projHref(p) + '" data-tags="' + esc(dataTags) + '">' +
        '<div class="card-head"><div>' +
          '<div class="card-title">' + esc(p.title) + '</div>' +
          '<div class="card-type">' + esc(p.type || "") + '</div>' +
        '</div><span class="card-arrow">' + ARROW + '</span></div>' +
        '<p class="card-desc">' + esc(p.description || "") + '</p>' +
        '<div class="tags">' + tags + '</div>' +
      '</a>';
    }).join("");

    var gallery = document.querySelector('[data-list="gallery"]');
    if (gallery) {
      var tiles = [];
      (cfg.projects || []).forEach(function (p) {
        (p.images || []).forEach(function (img) {
          tiles.push(
            '<a class="tile" href="' + projHref(p) + '">' +
              '<img class="tile-img" src="' + esc(img.src) + '" alt="' + esc(img.caption || p.title) + '" loading="lazy">' +
              '<div class="tile-meta">' +
                '<div class="tile-title">' + esc(img.caption || p.title) + '</div>' +
                '<div class="tile-sub">' + esc(p.title) + (img.kind ? " · " + esc(img.kind) : "") + '</div>' +
              '</div>' +
            '</a>'
          );
        });
      });
      gallery.innerHTML = tiles.join("");
    }
  }

  /* ---- 2b. Filter chips (projects by skill, experience by category) ------
     Both bars share the same chip behaviour: an "All" chip plus one chip per
     item. Click a chip to toggle it; multiple can be active (OR logic). When
     none are active, everything shows. `apply` decides what to show/hide. ---- */
  function wireChips(bar, apply, single) {
    var active = {};   // set of lowercased active filter keys
    function size() { return Object.keys(active).length; }
    bar.addEventListener("click", function (ev) {
      var chip = ev.target.closest(".filter-chip");
      if (!chip || !bar.contains(chip) || chip.classList.contains("is-dead")) return;
      var f = chip.getAttribute("data-filter");
      if (f === "__all") { active = {}; }
      else {
        var k = f.toLowerCase();
        if (single) {
          // single-select: clicking the active chip clears to "All";
          // clicking a different chip switches to only that one.
          if (active[k] && size() === 1) { active = {}; }
          else { active = {}; active[k] = true; }
        } else {
          if (active[k]) delete active[k]; else active[k] = true;
        }
      }
      bar.querySelectorAll(".filter-chip").forEach(function (c) {
        var cf = c.getAttribute("data-filter");
        if (cf === "__all") c.classList.toggle("is-active", size() === 0);
        else c.classList.toggle("is-active", !!active[cf.toLowerCase()]);
      });
      apply(active, size());
    });
  }

  function setupProjectFilters() {
    var bar = document.querySelector('[data-list="project-filters"]');
    if (!bar) return;
    // Toolkit chips are derived straight from the project tags — distinct, in
    // first-seen order. Add a project with a new tag and a new chip appears
    // automatically; remove the last project using a tag and its chip is gone.
    var seen = {}, order = [];
    (cfg.projects || []).forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        var lk = String(t).toLowerCase();
        if (!seen[lk]) { seen[lk] = true; order.push(String(t)); }
      });
    });
    var html = '<button class="filter-chip is-active" data-filter="__all">All</button>';
    html += order.map(function (t) {
      return '<button class="filter-chip" data-filter="' + esc(t) + '">' + esc(t) + '</button>';
    }).join("");
    bar.innerHTML = html;
    wireChips(bar, function (active, n) {
      document.querySelectorAll('[data-list="projects"] .card').forEach(function (el) {
        if (n === 0) { el.style.display = ""; return; }
        var tags = (el.getAttribute("data-tags") || "").split("|");
        el.style.display = tags.some(function (t) { return active[t]; }) ? "" : "none";
      });
    }, true);   // single-select: one skill at a time
  }

  function setupExperienceFilters() {
    var bar = document.querySelector('[data-list="exp-filters"]');
    if (!bar) return;
    var cats = cfg.experienceFilters || [];
    if (!cats.length) { bar.style.display = "none"; return; }
    var html = '<button class="filter-chip is-active" data-filter="__all">All</button>';
    html += cats.map(function (c) {
      return '<button class="filter-chip" data-filter="' + esc(c) + '">' + esc(c) + '</button>';
    }).join("");
    bar.innerHTML = html;
    wireChips(bar, function (active, n) {
      document.querySelectorAll('[data-list="experience"] .exp').forEach(function (job) {
        var anyShown = false;
        job.querySelectorAll(".bullets li").forEach(function (li) {
          if (n === 0) { li.style.display = ""; anyShown = true; return; }
          var lcats = (li.getAttribute("data-cats") || "").split("|");
          var show = lcats.some(function (c) { return active[c]; });
          li.style.display = show ? "" : "none";
          if (show) anyShown = true;
        });
        job.style.display = (n === 0 || anyShown) ? "" : "none";
      });
    }, true);   // single-select: one category at a time (matches Projects)
  }

  /* ---- 2c. Project detail page (project.html?p=<slug>) -------------------- */
  function renderProjectDetail() {
    var root = document.querySelector('[data-detail="project"]');
    if (!root) return;
    var want = (new URLSearchParams(location.search).get("p") || "").toLowerCase();
    var p = (cfg.projects || []).filter(function (x) { return projSlug(x) === want; })[0];
    if (!p) {
      document.title = "Diana Cornescu — Project";
      root.innerHTML = '<a class="back-link" href="projects.html">&larr; All projects</a>' +
        '<p class="detail-lead">Sorry, that project could not be found. ' +
        '<a class="inline-link" href="projects.html">Browse all projects</a>.</p>';
      return;
    }
    document.title = "Diana Cornescu — " + p.title;
    var d = p.details || {};
    var ICON_EXT = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>';
    var ICON_GH = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/></svg>';
    var links = "";
    if (p.website) links += '<a class="btn-primary" href="' + esc(p.website) + '" target="_blank" rel="noopener">' + ICON_EXT + ' Live demo</a>';
    if (p.github)  links += '<a class="btn-secondary" href="' + esc(p.github) + '" target="_blank" rel="noopener">' + ICON_GH + ' GitHub</a>';
    var tags = (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");

    function section(h, body) { return body ? '<h2 class="detail-h2">' + esc(h) + '</h2>' + body : ""; }
    function para(t) { return t ? '<p class="detail-p">' + esc(t) + '</p>' : ""; }
    function bullets(a) {
      if (!a) return "";
      if (!Array.isArray(a)) return para(a);
      return '<ul class="bullets detail-bullets">' + a.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join("") + '</ul>';
    }
    var figs = (p.images || []).map(function (img) {
      return '<figure class="detail-fig">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.caption || p.title) + '" loading="lazy">' +
        (img.caption ? '<figcaption>' + esc(img.caption) + (img.kind ? " &middot; " + esc(img.kind) : "") + '</figcaption>' : "") +
      '</figure>';
    }).join("");

    root.innerHTML =
      '<a class="back-link" href="projects.html">&larr; All projects</a>' +
      '<p class="hero-eyebrow">' + esc(p.type || "Project") + '</p>' +
      '<h1 class="detail-title">' + esc(p.title) + '</h1>' +
      (d.summary ? '<p class="detail-lead">' + esc(d.summary) + '</p>' : "") +
      (links ? '<div class="cta-row">' + links + '</div>' : "") +
      (tags ? '<div class="tags detail-tags">' + tags + '</div>' : "") +
      section("Why it matters", para(d.why)) +
      section("What I did", bullets(d.what)) +
      section("The result", para(d.result)) +
      (figs ? '<div class="detail-figs">' + figs + '</div>' : "");
  }

  /* ---- 3a. Dark / light -------------------------------------------------- */
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
  function setTheme(mode) {
    localStorage.setItem(THEME_KEY, mode);
    applyTheme(mode); paintThemeButton(); applyModeTokens(mode);
    if (window.__designRefresh) window.__designRefresh();
  }
  function toggleTheme() { setTheme(currentTheme() === "dark" ? "light" : "dark"); }
  mql.addEventListener("change", function () {
    if (!localStorage.getItem(THEME_KEY)) { applyTheme(currentTheme()); paintThemeButton(); applyModeTokens(currentTheme()); if (window.__designRefresh) window.__designRefresh(); }
  });

  /* ---- 3b. Collapsible sidebar ------------------------------------------- */
  var COLLAPSE_KEY = "diana-collapsed";
  function applyCollapsed() {
    document.body.classList.toggle("collapsed", localStorage.getItem(COLLAPSE_KEY) === "1");
  }
  function toggleCollapsed() {
    var now = document.body.classList.toggle("collapsed");
    localStorage.setItem(COLLAPSE_KEY, now ? "1" : "0");
  }

  /* ---- 4. Theme values (shared across all pages via localStorage) -------- */
  var DESIGN_KEY = "diana-design";   // { light:{var:hex}, dark:{var:hex}, font:{name,stack,google} }
  var TOKENS = [
    { key: "--accent", label: "Accent" },
    { key: "--active-bg", label: "Highlight / hover" },
    { key: "--bg", label: "Background" },
    { key: "--panel", label: "Surface (cards, sidebar)" },
    { key: "--text", label: "Text" },
    { key: "--muted", label: "Muted text" },
    { key: "--border", label: "Borders" },
  ];
  var FONTS = [
    { name: "Inter", stack: "Inter, system-ui, sans-serif", google: "Inter:wght@400;500;600;700" },
    { name: "Poppins", stack: "Poppins, system-ui, sans-serif", google: "Poppins:wght@400;500;600;700" },
    { name: "Roboto", stack: "Roboto, system-ui, sans-serif", google: "Roboto:wght@400;500;700" },
    { name: "Lora (serif)", stack: "Lora, Georgia, serif", google: "Lora:wght@400;500;600;700" },
    { name: "System", stack: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif", google: null },
  ];
  var ACCENT_PRESETS = ["#2563EB", "#0F766E", "#7C3AED", "#D9480F", "#047857"];
  var DEFAULTS = {
    light: { "--bg": "#F6F7F9", "--panel": "#FFFFFF", "--side": "#FFFFFF", "--border": "#EAECEF", "--text": "#111827", "--muted": "#6B7280", "--chip": "#F3F4F6", "--chip-text": "#4B5563", "--accent": "#2563EB", "--accent-contrast": "#FFFFFF", "--active-bg": "#EEF2FF", "--shadow": "0 8px 24px rgba(15, 23, 42, .08)" },
    dark: { "--bg": "#0E1116", "--panel": "#161A21", "--side": "#12161C", "--border": "#232A34", "--text": "#E6E9EF", "--muted": "#9AA4B2", "--chip": "#1E242D", "--chip-text": "#8FA0B4", "--accent": "#2563EB", "--accent-contrast": "#FFFFFF", "--active-bg": "#1E273A", "--shadow": "0 8px 24px rgba(0, 0, 0, .35)" },
  };

  function loadDesign() { try { return JSON.parse(localStorage.getItem(DESIGN_KEY)) || {}; } catch (e) { return {}; } }
  function saveDesign(d) { localStorage.setItem(DESIGN_KEY, JSON.stringify(d)); }
  function setVar(key, val) {
    document.documentElement.style.setProperty(key, val);
    if (key === "--panel") document.documentElement.style.setProperty("--side", val);
  }
  function clearVar(key) {
    document.documentElement.style.removeProperty(key);
    if (key === "--panel") document.documentElement.style.removeProperty("--side");
  }
  function applyModeTokens(mode) {
    var set = loadDesign()[mode] || {};
    TOKENS.forEach(function (t) { if (set[t.key]) setVar(t.key, set[t.key]); else clearVar(t.key); });
  }
  function ensureFontLink(google) {
    if (!google) return;
    var id = "font-" + google.split(":")[0].replace(/\W/g, "");
    if (document.getElementById(id)) return;
    var l = document.createElement("link");
    l.id = id; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=" + google + "&display=swap";
    document.head.appendChild(l);
  }
  function applyFont(f) { if (!f) return; ensureFontLink(f.google); document.documentElement.style.setProperty("--font", f.stack); }
  function applySavedDesign() {
    applyModeTokens(currentTheme());
    var d = loadDesign();
    if (d.font) applyFont(d.font);
  }
  function normalizeHex(v) {
    v = (v || "").trim();
    if (/^#[0-9a-f]{6}$/i.test(v)) return v;
    if (/^#[0-9a-f]{3}$/i.test(v)) return "#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
    return "#000000";
  }
  function effective(key) {
    return normalizeHex(getComputedStyle(document.documentElement).getPropertyValue(key));
  }

  /* ---- publishable CSS from the current choices -------------------------- */
  function mergedTokens(mode) {
    var out = {}, k;
    for (k in DEFAULTS[mode]) out[k] = DEFAULTS[mode][k];
    var ov = loadDesign()[mode] || {};
    for (k in ov) { out[k] = ov[k]; if (k === "--panel") out["--side"] = ov[k]; }
    return out;
  }
  function emitBlock(sel, t) {
    return sel + " {\n" +
      "  --bg: " + t["--bg"] + "; --panel: " + t["--panel"] + "; --side: " + t["--side"] + ";\n" +
      "  --border: " + t["--border"] + "; --text: " + t["--text"] + "; --muted: " + t["--muted"] + ";\n" +
      "  --chip: " + t["--chip"] + "; --chip-text: " + t["--chip-text"] + ";\n" +
      "  --accent: " + t["--accent"] + "; --accent-contrast: " + t["--accent-contrast"] + "; --active-bg: " + t["--active-bg"] + ";\n" +
      "  --shadow: " + t["--shadow"] + ";\n}";
  }
  function generateThemeCSS() {
    var d = loadDesign();
    var out = "/* Paste this into assets/theme.css to make it the default for everyone. */\n";
    out += emitBlock(":root", mergedTokens("light")) + "\n";
    out += emitBlock('html[data-theme="dark"]', mergedTokens("dark")) + "\n";
    if (d.font && d.font.name !== "Inter") {
      out += "\n/* Font: " + d.font.name + ". Ask Claude to wire the font <link> into each page's\n";
      out += "   <head>, otherwise the font only applies in your browser. */\n";
      out += ":root { --font: " + d.font.stack + "; }\n";
    }
    return out;
  }

  /* ---- Design page ------------------------------------------------------- */
  function buildDesignPage() {
    var root = document.getElementById("designRoot");
    if (!root) return;
    var swatches = ACCENT_PRESETS.map(function (hex) {
      return '<button class="tp-swatch" data-hex="' + hex + '" aria-label="' + hex + '" style="background:' + hex + '"></button>';
    }).join("");
    var fontOpts = FONTS.map(function (f) { return '<option value="' + f.name + '">' + f.name + "</option>"; }).join("");
    var colorRows = TOKENS.map(function (t) {
      return '<div class="tp-field"><label for="c' + t.key + '">' + t.label + '</label>' +
        '<span class="tp-field-right"><span class="tp-hex" data-hex-for="' + t.key + '"></span>' +
        '<input type="color" class="tp-color" id="c' + t.key + '" data-token="' + t.key + '" aria-label="' + t.label + '"></span></div>';
    }).join("");

    root.innerHTML =
      '<div class="tp-plabel">Editing mode</div>' +
      '<div class="tp-modes"><button class="tp-mode" data-mode="light">Light</button><button class="tp-mode" data-mode="dark">Dark</button></div>' +
      '<div class="tp-plabel">Font</div>' +
      '<select class="tp-select" id="tpFont">' + fontOpts + '</select>' +
      '<div class="tp-plabel">Accent presets</div>' +
      '<div class="tp-swatches">' + swatches + '</div>' +
      '<div class="tp-plabel">Colors (for the mode above)</div>' +
      colorRows +
      '<button class="tp-reset" id="tpReset">Reset all</button>' +
      '<div class="tp-plabel">Publish as the default</div>' +
      '<p class="muted-sub" style="margin:0 0 10px">Copy this into <code>assets/theme.css</code> (or send it to Claude) to make it what every visitor sees.</p>' +
      '<textarea class="tp-out" id="tpOut" readonly rows="14" aria-label="Theme CSS"></textarea>' +
      '<button class="tp-copy" id="tpCopy">Copy CSS</button><span class="tp-copied" id="tpCopied"></span>';

    var fontSel = document.getElementById("tpFont");

    function refresh() {
      var mode = currentTheme();
      root.querySelectorAll(".tp-mode").forEach(function (b) { b.classList.toggle("on", b.getAttribute("data-mode") === mode); });
      TOKENS.forEach(function (t) {
        var val = effective(t.key);
        var inp = root.querySelector('input[data-token="' + t.key + '"]');
        var lbl = root.querySelector('[data-hex-for="' + t.key + '"]');
        if (inp) inp.value = val;
        if (lbl) lbl.textContent = val.toUpperCase();
      });
      var accent = effective("--accent").toLowerCase();
      root.querySelectorAll(".tp-swatch").forEach(function (s) {
        s.classList.toggle("sel", s.getAttribute("data-hex").toLowerCase() === accent);
      });
      var d = loadDesign();
      fontSel.value = (d.font && d.font.name) || "Inter";
      var out = document.getElementById("tpOut");
      if (out) out.value = generateThemeCSS();
    }
    window.__designRefresh = refresh;

    function setToken(key, hex) {
      var mode = currentTheme();
      var d = loadDesign();
      d[mode] = d[mode] || {};
      d[mode][key] = hex;
      saveDesign(d);
      setVar(key, hex);
      refresh();
    }

    root.querySelectorAll(".tp-mode").forEach(function (b) {
      b.addEventListener("click", function () { setTheme(b.getAttribute("data-mode")); refresh(); });
    });
    fontSel.addEventListener("change", function () {
      var f = FONTS.filter(function (x) { return x.name === fontSel.value; })[0];
      if (!f) return;
      applyFont(f);
      var d = loadDesign(); d.font = { name: f.name, stack: f.stack, google: f.google }; saveDesign(d);
      refresh();
    });
    root.querySelectorAll(".tp-swatch").forEach(function (s) {
      s.addEventListener("click", function () { setToken("--accent", s.getAttribute("data-hex")); });
    });
    root.querySelectorAll("input[data-token]").forEach(function (inp) {
      inp.addEventListener("input", function () { setToken(inp.getAttribute("data-token"), inp.value); });
    });
    document.getElementById("tpReset").addEventListener("click", function () {
      saveDesign({});
      TOKENS.forEach(function (t) { clearVar(t.key); });
      document.documentElement.style.removeProperty("--font");
      refresh();
    });
    document.getElementById("tpCopy").addEventListener("click", function () {
      var out = document.getElementById("tpOut");
      var note = document.getElementById("tpCopied");
      out.select();
      function done() { if (note) { note.textContent = "Copied!"; setTimeout(function () { note.textContent = ""; }, 1800); } }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(out.value).then(done, function () { try { document.execCommand("copy"); done(); } catch (e) {} });
      } else { try { document.execCommand("copy"); done(); } catch (e) {} }
    });

    refresh();
  }

  /* ---- boot -------------------------------------------------------------- */
  function boot() {
    fillFields();
    renderLists();
    setupProjectFilters();
    setupExperienceFilters();
    renderProjectDetail();
    var ct = document.getElementById("collapseToggle");
    if (ct) ct.addEventListener("click", toggleCollapsed);
    var tt = document.getElementById("themeToggle");
    if (tt) tt.addEventListener("click", toggleTheme);
    paintThemeButton();
    buildDesignPage();
  }

  applyTheme(currentTheme());
  applySavedDesign();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyCollapsed(); boot(); });
  } else {
    applyCollapsed(); boot();
  }
})();

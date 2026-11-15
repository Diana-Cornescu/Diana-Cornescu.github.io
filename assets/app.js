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

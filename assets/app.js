/* =============================================================================
   app.js — builds the sidebar + page content from config.js, and handles
   dark/light mode (system default + remembered) and the collapsible sidebar.
   You shouldn't need to edit this for normal content changes.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG || {};
  var profile = cfg.profile || {};

  /* ---- tiny icon set (inline SVG) --------------------------------------- */
  var ICONS = {
    menu:  '<path d="M4 6h16M4 12h16M4 18h16"/>',
    user:  '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    grid:  '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
    file:  '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h6"/>',
    mail:  '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/>',
    sun:   '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon:  '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    down:  '<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  };
  function svg(name, size) {
    size = size || 18;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ---- theme (dark/light): system default, then remembered -------------- */
  var THEME_KEY = "diana-theme";
  var mql = window.matchMedia("(prefers-color-scheme: dark)");

  function currentTheme() {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return mql.matches ? "dark" : "light";
  }
  function applyTheme(mode) { document.documentElement.setAttribute("data-theme", mode); }
  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    paintThemeButton();
  }
  // follow the OS if the user hasn't made an explicit choice
  mql.addEventListener("change", function () {
    if (!localStorage.getItem(THEME_KEY)) { applyTheme(currentTheme()); paintThemeButton(); }
  });

  function paintThemeButton() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var dark = currentTheme() === "dark";
    btn.innerHTML = svg(dark ? "sun" : "moon") +
      '<span class="label">' + (dark ? "Light mode" : "Dark mode") + "</span>";
  }

  /* ---- collapse: remembered --------------------------------------------- */
  var COLLAPSE_KEY = "diana-collapsed";
  function applyCollapsed() {
    document.body.classList.toggle("collapsed", localStorage.getItem(COLLAPSE_KEY) === "1");
  }
  function toggleCollapsed() {
    var now = document.body.classList.toggle("collapsed");
    localStorage.setItem(COLLAPSE_KEY, now ? "1" : "0");
  }

  /* ---- sidebar ----------------------------------------------------------- */
  function buildSidebar(activePage) {
    var nav = (cfg.nav || []).map(function (item) {
      var active = item.id === activePage ? " active" : "";
      return '<a class="nav-item' + active + '" href="' + esc(item.href) + '" aria-label="' + esc(item.label) + '">' +
        svg(item.icon) + '<span class="label">' + esc(item.label) + "</span></a>";
    }).join("");

    var resumeHref = profile.resumeFile ? esc(profile.resumeFile) : "#";

    return '' +
      '<aside class="sidebar">' +
        '<div class="side-top">' +
          '<button class="icon-btn" id="collapseToggle" aria-label="Collapse or expand sidebar">' + svg("menu", 20) + '</button>' +
        '</div>' +
        '<div class="identity">' +
          '<div class="avatar">' + esc(profile.initials || "") + '</div>' +
          '<div class="identity-text">' +
            '<div class="identity-name">' + esc(profile.name || "") + '</div>' +
            '<div class="identity-role">' + esc([profile.role, profile.location].filter(Boolean).join(" · ")) + '</div>' +
          '</div>' +
        '</div>' +
        '<nav class="nav">' + nav + '</nav>' +
        '<div class="side-bottom">' +
          '<button class="ghost-btn" id="themeToggle" aria-label="Toggle dark mode"></button>' +
          '<a class="accent-btn" href="' + resumeHref + '" aria-label="Download résumé">' +
            svg("down") + '<span class="label">Résumé</span></a>' +
        '</div>' +
      '</aside>';
  }

  /* ---- page renderers ---------------------------------------------------- */
  function renderAbout() {
    var stats = (profile.stats || []).map(function (s) {
      return '<div class="stat"><div class="stat-value">' + esc(s.value) + '</div>' +
        '<div class="stat-label">' + esc(s.label) + '</div></div>';
    }).join("");
    return '' +
      '<p class="hero-eyebrow">' + esc([profile.role, profile.location].filter(Boolean).join(" · ")) + '</p>' +
      '<h1 class="hero-title">' + esc(profile.tagline || "") + '</h1>' +
      '<p class="hero-sub">' + esc(profile.intro || "") + '</p>' +
      '<div class="cta-row">' +
        '<a class="btn-primary" href="projects.html">' + svg("grid") + ' View my work</a>' +
        '<a class="btn-secondary" href="' + (profile.resumeFile ? esc(profile.resumeFile) : "resume.html") + '">' + svg("down") + ' Download résumé</a>' +
      '</div>' +
      (stats ? '<div class="stats">' + stats + '</div>' : "");
  }

  function projectTags(p) {
    return (p.tags || []).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("");
  }
  function renderProjects() {
    var cards = (cfg.projects || []).map(function (p) {
      return '<a class="card" href="' + esc(p.url || "#") + '">' +
        '<div class="card-head"><div>' +
          '<div class="card-title">' + esc(p.title) + '</div>' +
          '<div class="card-type">' + esc(p.type || "") + '</div>' +
        '</div><span style="color:var(--accent)">' + svg("arrow") + '</span></div>' +
        '<p class="card-desc" style="margin-top:12px">' + esc(p.description || "") + '</p>' +
        '<div class="tags">' + projectTags(p) + '</div>' +
      '</a>';
    }).join("");
    return '<h2 class="section-title">Projects</h2><div class="cards">' + cards + '</div>';
  }

  function renderGallery() {
    var tiles = [];
    (cfg.projects || []).forEach(function (p) {
      (p.images || []).forEach(function (img) {
        tiles.push(
          '<figure class="tile" style="margin:0">' +
            '<img class="tile-img" src="' + esc(img.src) + '" alt="' + esc(img.caption || p.title) + '" loading="lazy">' +
            '<figcaption class="tile-meta">' +
              '<div class="tile-title">' + esc(img.caption || p.title) + '</div>' +
              '<div class="tile-sub">' + esc(p.title) + (img.kind ? " · " + esc(img.kind) : "") + '</div>' +
            '</figcaption>' +
          '</figure>'
        );
      });
    });
    return '<h2 class="section-title" style="margin-bottom:6px">Gallery</h2>' +
      '<p class="card-desc" style="margin-bottom:22px">Every chart and diagram from my projects, in one place.</p>' +
      '<div class="gallery">' + tiles.join("") + '</div>';
  }

  function renderResume() {
    var exp = (cfg.experience || []).map(function (e) {
      return '<div class="row"><div class="row-when">' + esc(e.start) + " — " + esc(e.end) + '</div>' +
        '<div><div class="row-role">' + esc(e.role) + '</div>' +
        '<div class="row-org">' + esc(e.org) + '</div>' +
        '<p class="row-sum">' + esc(e.summary || "") + '</p></div></div>';
    }).join("");
    var edu = (cfg.education || []).map(function (e) {
      return '<div class="row"><div class="row-when">' + esc(e.start) + " — " + esc(e.end) + '</div>' +
        '<div><div class="row-role">' + esc(e.degree) + '</div>' +
        '<div class="row-org">' + esc(e.org) + '</div></div></div>';
    }).join("");
    var skills = (cfg.skills || []).map(function (s) { return '<span class="skill">' + esc(s) + '</span>'; }).join("");
    return '<h2 class="section-title">Experience</h2><div class="timeline">' + exp + '</div>' +
      (edu ? '<h3 class="subhead">Education</h3><div class="timeline">' + edu + '</div>' : "") +
      (skills ? '<h3 class="subhead">Skills</h3><div class="skill-chips">' + skills + '</div>' : "") +
      '<div style="margin-top:34px"><a class="btn-secondary" href="' + (profile.resumeFile ? esc(profile.resumeFile) : "#") + '">' + svg("down") + ' Download full résumé (PDF)</a></div>';
  }

  function renderContact() {
    var s = profile.social || {};
    var links = [];
    if (s.github) links.push('<a href="' + esc(s.github) + '">GitHub</a>');
    if (s.linkedin) links.push('<a href="' + esc(s.linkedin) + '">LinkedIn</a>');
    return '<h2 class="section-title">Get in touch</h2>' +
      '<div class="contact-card">' +
        '<div class="contact-grid">' +
          (profile.email ? '<div><div class="contact-label">Email</div><a href="mailto:' + esc(profile.email) + '">' + esc(profile.email) + '</a></div>' : "") +
          (profile.phone ? '<div><div class="contact-label">Phone</div><a href="tel:' + esc(profile.phone.replace(/[^+\d]/g, "")) + '">' + esc(profile.phone) + '</a></div>' : "") +
          (profile.location ? '<div><div class="contact-label">Location</div>' + esc(profile.location) + '</div>' : "") +
        '</div>' +
        (profile.email ? '<a class="btn-primary" href="mailto:' + esc(profile.email) + '">' + svg("mail") + ' Email me</a>' : "") +
        (links.length ? '<div class="contact-links">' + links.join("") + '</div>' : "") +
      '</div>';
  }

  var RENDERERS = {
    about: renderAbout, projects: renderProjects, gallery: renderGallery,
    resume: renderResume, contact: renderContact,
  };
  var TITLES = {
    about: "About", projects: "Projects", gallery: "Gallery",
    resume: "Résumé", contact: "Contact",
  };

  /* ---- boot -------------------------------------------------------------- */
  function boot() {
    var page = document.body.getAttribute("data-page") || "about";

    document.title = (profile.name || "Portfolio") + " — " + (TITLES[page] || "");

    var frag = document.createElement("div");
    frag.innerHTML = buildSidebar(page) +
      '<div class="content"><div class="container" id="pageContent"></div></div>';
    while (frag.firstChild) document.body.appendChild(frag.firstChild);

    var render = RENDERERS[page] || renderAbout;
    document.getElementById("pageContent").innerHTML = render();

    document.getElementById("collapseToggle").addEventListener("click", toggleCollapsed);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    paintThemeButton();
  }

  // theme + collapse applied before paint to avoid a flash
  applyTheme(currentTheme());
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { applyCollapsed(); boot(); });
  } else {
    applyCollapsed(); boot();
  }
})();

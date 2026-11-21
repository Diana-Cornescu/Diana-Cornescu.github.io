# Editing this site

The site is plain HTML/CSS/JS. Here's where each kind of change lives.

## Your personal info → `config.js`
Open `config.js` and edit the values. These are pulled into the pages automatically:
- **Name, role, location, email, phone, bio, social links, resume path** → `profile`
- **Jobs** (title, employer, dates, and bullet points) → `experience`. Each bullet can be a plain string, or `{ text: "...", cats: ["Data Science", "Initiative"] }` so it can be filtered by category on the resume page.
- **Education** → `education`
- **Experience filter chips** (the category buttons above Experience) → `experienceFilters`. A bullet's `cats` must match one of these labels exactly.
- **Skills (flat list)** → `skills` — shown nowhere directly anymore; kept as a simple reference list. The Projects filter is now built from project `tags` (below), not this list.
- **Skills (grouped)** → `skillCategories` — the categorized Skills dropdown on the resume page (Languages & Data, GenAI & LLM, …).
- **Stat chips on the About page** → `profile.stats`
- **Projects** → `projects` — these power the Projects page, the Gallery, AND each project's own detail page. Each project has a `slug`, `type`, `description`, optional `github`/`website`, `tags`, `images`, and a `details` block (`summary`, `why`, `what`, `result`) that fills its detail page. Add a project and its card, gallery tiles, filter chip, and detail page all appear automatically.
- **Project filter ("Filter by toolkit")** — the chips are collected automatically from every project's `tags`. There is no separate list to maintain: add a project with a new tag and a new chip shows up; remove the last project using a tag and its chip disappears. One toolkit filters at a time.

On the **resume page**, Education, Skills, and Experience are collapsible dropdowns (Education and Skills start closed, Experience open). To change which starts open, add or remove the `open` attribute on the `<details class="acc">` blocks in `resume.html`.

### Project detail pages
Each project has its own page at `project.html?p=<slug>` — the cards and every gallery tile link there. The page reads like a short write-up (summary → Why it matters → What I did → The result) plus buttons to the GitHub repo and live site. It's one shared template (`project.html`); the content for each project lives in that project's `details` block in `config.js`, so you never create a new HTML file per project — just add the project to `config.js`. If you'd rather each project were a separate hand-written page in a `projects/` folder, that's possible too, but it means a new file (and manual linking) per project; the current setup keeps everything in one data source.

Change any of these in `config.js`, save, refresh the browser.

## Page structure & content → the `.html` files
Each page is a normal, self-contained HTML file you can read and edit directly:
- `index.html` — About / landing
- `projects.html` — the Projects page (cards are built from the `projects` list in config.js)
- `project.html` — the shared template for a single project's detail page (`project.html?p=<slug>`); content comes from that project's `details` in config.js
- `gallery.html` — the Gallery (auto-built from the images in your `projects`; each tile links to its project page)
- `resume.html` — resume layout (experience/education/skills *data* comes from config.js)
- `contact.html` — contact page

Projects and the resume are **data in config.js** rendered into these pages;
the headings, layout, and styling are in the HTML/CSS.

### Navigation & the front-page scrolling band
The navigation is a **top bar** (`.topbar`) that's identical on every page — page links on the left, dark-mode toggle + Resume + Design on the right. If you add or rename a page, update that top bar in each HTML file (it's the same block everywhere; the current page's link has `class="nav-item active"`).

The front page (`index.html`) has an **auto-scrolling image band** above the hero (`<section class="strip">`). It's filled automatically from every project image in `config.js` and each image links to its project page — so adding project images updates the band too. Speed/size live in the `.strip` rules in `styles.css` (the `strip-scroll` animation is 60s; lower it to scroll faster). It pauses on hover and stops entirely for visitors who prefer reduced motion.

The sidebar markup appears at the top of every page (that's normal for a static
site). Your **name/role** in it come from `config.js`, so you only change those
once; if you change the **nav links or sidebar layout**, do it in each page.

## Sizes & spacing → `assets/styles.css`
Organized by section with comments. A few handy ones:
- **Project box size**: the `.card` rule
- **Gallery thumbnail size**: the `.tile-img` rule (these are separate, so you can
  resize one without touching the other)
- Sidebar width: `--side-w` / `--side-w-collapsed`

## Color theme & font
**Design page:** click **Design** in the sidebar (just above Dark mode). Tune the
accent, hover/highlight, background, surface, text, muted text, borders, and the
font — **separately for light and dark mode** (toggle at the top). Changes apply
live across every page and are saved in your browser.

**Make it the default for everyone:** the Design page has a "Copy CSS" box at the
bottom that generates a ready-to-paste `theme.css` from your current choices.
Paste it into **`assets/theme.css`** (or send it to Claude). You can also edit
`--accent` in `theme.css` directly, or swap in a ready-made palette in `assets/`:

- `theme.indigo.css` (the default)
- `theme.teal.css`
- `theme.violet.css`
- `theme.sunset.css`
- `theme.forest.css`

**To switch the whole site's colors:** delete `assets/theme.css`, then rename the
palette you want (e.g. `theme.teal.css`) to `theme.css`. Refresh — done. Each
palette includes both light and dark mode, so dark/light keeps working either way.
(Prefer not to rename? You can instead copy a palette file's contents into
`theme.css`.) To hand-tweak colors, edit the `--accent` and other variables inside
whichever file is currently `theme.css`.

## `assets/app.js`
Small helper that (1) drops your `config.js` details into the pages, (2) builds the
resume lists, and (3) runs the dark/light toggle + collapsible sidebar. You rarely
need to touch it.

## Adding a project image
1. Put the image in `assets/img/` (e.g. `assets/img/churn.png`).
2. In `config.js`, add it to that project's `images` list:
   `{ src: "assets/img/churn.png", caption: "Churn dashboard", kind: "chart" }`
It then appears in the Gallery automatically — no second step.

## Adding your resume PDF
Drop `resume.pdf` into `assets/` (or change `profile.resumeFile` in `config.js`).

## Run locally
Double-click `index.html`, or from the folder run `py -m http.server 8000` and open `http://localhost:8000`.

## Publish
Commit + push to `main`. In **Settings → Pages**, set source to **Deploy from a branch → `main` / `/` (root)**. Live at `https://diana-cornescu.github.io`.

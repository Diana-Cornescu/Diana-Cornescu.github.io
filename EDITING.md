# Editing this site

The site is plain HTML/CSS/JS. Here's where each kind of change lives.

## Your personal info → `config.js`
Open `config.js` and edit the values. These are pulled into the pages automatically:
- **Name, role, location, email, phone, bio, social links, resume path** → `profile`
- **Jobs** (title, employer, dates, and bullet points) → `experience`. Each bullet can be a plain string, or `{ text: "...", cats: ["Data Science", "Initiative"] }` so it can be filtered by category on the resume page.
- **Education** → `education`
- **Experience filter chips** (the category buttons above Experience) → `experienceFilters`. A bullet's `cats` must match one of these labels exactly.
- **Skills** → `skills` — these are the clickable chips at the **top of the Projects page**. Clicking one filters the project cards to those whose `tags` match; a skill with no matching project shows dimmed.
- **Stat chips on the About page** → `profile.stats`
- **Projects** (title, type, description, tags, link, images) → `projects` — these power both the Projects page and the Gallery. A project's `tags` are also what the skill filter matches on, so keep them spelled like the entries in `skills`.

On the **resume page**, Education and Experience are collapsible dropdowns (Education starts closed, Experience open). To change which starts open, add or remove the `open` attribute on the `<details class="acc">` blocks in `resume.html`.

Change any of these in `config.js`, save, refresh the browser.

## Page structure & content → the `.html` files
Each page is a normal, self-contained HTML file you can read and edit directly:
- `index.html` — About / landing
- `projects.html` — the Projects page (cards are built from the `projects` list in config.js)
- `gallery.html` — the Gallery (auto-built from the images in your `projects`)
- `resume.html` — resume layout (experience/education/skills *data* comes from config.js)
- `contact.html` — contact page

Projects and the resume are **data in config.js** rendered into these pages;
the headings, layout, and styling are in the HTML/CSS.

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

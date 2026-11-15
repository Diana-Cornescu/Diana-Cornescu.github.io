# Editing this site

The site is plain HTML/CSS/JS. Here's where each kind of change lives.

## Your personal info → `config.js`
Open `config.js` and edit the values. These are pulled into the pages automatically:
- **Name, role, location, email, phone, bio, social links, résumé path** → `profile`
- **Jobs** (title, employer, dates, and bullet points) → `experience`
- **Education** → `education`
- **Skills** → `skills`
- **Stat chips on the About page** → `profile.stats`
- **Projects** (title, type, description, tags, link, images) → `projects` — these power both the Projects page and the Gallery

Change any of these in `config.js`, save, refresh the browser.

## Page structure & content → the `.html` files
Each page is a normal, self-contained HTML file you can read and edit directly:
- `index.html` — About / landing
- `projects.html` — the Projects page (cards are built from the `projects` list in config.js)
- `gallery.html` — the Gallery (auto-built from the images in your `projects`)
- `resume.html` — résumé layout (experience/education/skills *data* comes from config.js)
- `contact.html` — contact page

Projects and the résumé are **data in config.js** rendered into these pages;
the headings, layout, and styling are in the HTML/CSS.

The sidebar markup appears at the top of every page (that's normal for a static
site). Your **name/role** in it come from `config.js`, so you only change those
once; if you change the **nav links or sidebar layout**, do it in each page.

## Sizes, spacing, colors → `assets/styles.css`
Organized by section with comments. A few handy ones:
- Accent color: `--accent` near the top
- **Project box size**: the `.card` rule
- **Gallery thumbnail size**: the `.tile-img` rule (these are separate, so you can
  resize one without touching the other)
- Sidebar width: `--side-w` / `--side-w-collapsed`

## `assets/app.js`
Small helper that (1) drops your `config.js` details into the pages, (2) builds the
résumé lists, and (3) runs the dark/light toggle + collapsible sidebar. You rarely
need to touch it.

## Adding a project image
1. Put the image in `assets/img/` (e.g. `assets/img/churn.png`).
2. In `config.js`, add it to that project's `images` list:
   `{ src: "assets/img/churn.png", caption: "Churn dashboard", kind: "chart" }`
It then appears in the Gallery automatically — no second step.

## Adding your résumé PDF
Drop `resume.pdf` into `assets/` (or change `profile.resumeFile` in `config.js`).

## Run locally
Double-click `index.html`, or from the folder run `py -m http.server 8000` and open `http://localhost:8000`.

## Publish
Commit + push to `main`. In **Settings → Pages**, set source to **Deploy from a branch → `main` / `/` (root)**. Live at `https://diana-cornescu.github.io`.

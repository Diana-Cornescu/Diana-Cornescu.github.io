# Editing this site

**Everything you normally change lives in one file: `config.js`.**

Open `config.js` and edit the values. That's it — every page updates automatically.

- **Your name, role, contact, bio, social links, résumé file** → `profile`
- **Jobs and school** → `experience` and `education`
- **Skills** → `skills`
- **Projects** (title, description, tags, link, and images) → `projects`

## How the Gallery works
You never add an image to the Gallery by hand. Each project lists its own
`images`, and the Gallery page is built automatically from every image across
every project. Add an image once in a project and it appears in both places.

## Adding a real project image
1. Drop the image file into `assets/img/` (e.g. `assets/img/churn-dashboard.png`).
2. In `config.js`, add it to that project's `images` list:
   ```js
   images: [
     { src: "assets/img/churn-dashboard.png", caption: "Churn dashboard", kind: "chart" },
   ]
   ```

## Adding your résumé PDF
Drop `resume.pdf` into `assets/` (or update `profile.resumeFile` to the path you use).

## Theme
Dark/light follows the visitor's system setting by default and remembers their
choice if they flip the switch. No action needed.

## Files you normally DON'T touch
`assets/styles.css` (colors/layout), `assets/app.js` (rendering), and the
`*.html` page shells. They read from `config.js`.

## Publishing
This is a static site — just commit and push to the `main` branch. In the repo's
**Settings → Pages**, set the source to **Deploy from a branch → `main` / root (`/`)**.
Your site is at `https://diana-cornescu.github.io`.

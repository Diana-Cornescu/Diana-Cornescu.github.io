/* =============================================================================
   config.js — THE ONE PLACE TO EDIT.
   Change anything here and it updates across every page automatically.
   Right now everything is PLACEHOLDER / FAKE. Replace the values, then publish.
   Nothing else in the site should need editing for normal content changes.
   ========================================================================== */

window.SITE_CONFIG = {

  /* --- Who you are (shows in sidebar, hero, contact, page titles) --------- */
  profile: {
    name: "Diana Cornescu",
    initials: "DC",                 // shown in the little avatar square
    role: "Data Analyst",
    location: "Toronto, Canada",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    // The short line under your name + the longer intro on the About page:
    tagline: "I turn messy data into decisions people can act on.",
    intro:
      "Placeholder intro paragraph. A few sentences about who you are and the " +
      "problems you like to solve — the first thing a recruiter reads. Replace " +
      "this text; it lives only here.",
    // Links. Leave a value as "" to hide that link everywhere.
    social: {
      github: "https://github.com/Diana-Cornescu",
      linkedin: "https://www.linkedin.com/in/your-handle",
    },
    // Path to your résumé PDF (drop the file in /assets and update this):
    resumeFile: "assets/resume.pdf",
    // Little stat chips on the About page. Add/remove freely.
    stats: [
      { value: "3+ yrs", label: "in analytics" },
      { value: "12", label: "projects shipped" },
      { value: "Python", label: "main stack" },
    ],
  },

  /* --- Résumé: experience, education, skills ------------------------------ */
  experience: [
    {
      role: "Data Analyst",
      org: "Acme Analytics",
      start: "2024",
      end: "now",
      summary: "Placeholder — what you did and the measurable impact in one line.",
    },
    {
      role: "Analytics Intern",
      org: "DataCorp",
      start: "2023",
      end: "2024",
      summary: "Placeholder — what you did and the measurable impact in one line.",
    },
  ],

  education: [
    {
      degree: "BSc, Placeholder Field",
      org: "University of Somewhere",
      start: "2019",
      end: "2023",
    },
  ],

  skills: ["Python", "SQL", "Pandas", "Tableau", "dbt", "Airflow", "Git", "scikit-learn"],

  /* --- Projects -----------------------------------------------------------
     Each project lists its own images. The GALLERY page is built automatically
     from every image across every project — so you add an image ONCE here and
     it shows up in both the project and the gallery. No duplication.
     kind: "chart" or "diagram" (just a small label under the gallery thumb).
     ---------------------------------------------------------------------- */
  projects: [
    {
      id: "churn",
      title: "Churn Early-Warning Dashboard",
      type: "Dashboard",
      description:
        "Placeholder description — the problem, what you built, and the outcome in a sentence or two.",
      tags: ["Python", "dbt", "Looker"],
      url: "#", // link to a repo, write-up, or live demo
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Churn dashboard", kind: "chart" },
        { src: "assets/img/placeholder-line.svg", caption: "Retention trend", kind: "chart" },
      ],
    },
    {
      id: "forecast",
      title: "Demand Forecasting Pipeline",
      type: "ML model",
      description:
        "Placeholder description — swap in a real project when you have one ready to show.",
      tags: ["scikit-learn", "Airflow"],
      url: "#",
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "Pipeline architecture", kind: "diagram" },
        { src: "assets/img/placeholder-line.svg", caption: "Forecast vs actual", kind: "chart" },
      ],
    },
    {
      id: "pricing",
      title: "Retail Pricing Study",
      type: "Analysis",
      description:
        "Placeholder description of a notebook or write-up you want to feature.",
      tags: ["SQL", "Tableau"],
      url: "#",
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Price elasticity", kind: "chart" },
        { src: "assets/img/placeholder-bars.svg", caption: "Category margins", kind: "chart" },
      ],
    },
  ],

  /* --- Navigation ---------------------------------------------------------
     Order + labels of the sidebar items. Usually no need to touch this.
     ---------------------------------------------------------------------- */
  nav: [
    { id: "about", label: "About", href: "index.html", icon: "user" },
    { id: "projects", label: "Projects", href: "projects.html", icon: "grid" },
    { id: "gallery", label: "Gallery", href: "gallery.html", icon: "image" },
    { id: "resume", label: "Résumé", href: "resume.html", icon: "file" },
    { id: "contact", label: "Contact", href: "contact.html", icon: "mail" },
  ],
};

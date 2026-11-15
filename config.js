/* =============================================================================
   config.js — YOUR PERSONAL INFORMATION, in one place.

   This file holds ONLY personal data: your name, contact details, and your
   resume (jobs, school, skills). Change a value here and it updates wherever
   that detail appears across the site.

   Everything else — the page layout, the project cards, the gallery, box
   sizes, colors — lives in the actual HTML/CSS files, which you edit directly:
     • Structure/content of a page  ->  that page's .html file
     • Sizes, spacing, colors       ->  assets/styles.css
   This file does NOT control layout.
   ========================================================================== */

window.SITE_CONFIG = {

  /* --- Basic details ------------------------------------------------------ */
  profile: {
    name: "Diana Cornescu",
    initials: "DC",                       // the little avatar square in the sidebar
    role: "Data Analyst",                 // shows under your name + in the hero
    location: "Toronto, Canada",
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",

    tagline: "I turn messy data into decisions people can act on.",  // big hero headline
    intro:
      "Placeholder intro paragraph. A few sentences about who you are and the " +
      "problems you like to solve — the first thing a recruiter reads.",

    social: {
      github: "https://github.com/Diana-Cornescu",
      linkedin: "https://www.linkedin.com/in/your-handle",
    },

    resumeFile: "assets/resume.pdf",      // drop your PDF in /assets and keep this path

    // Small stat chips on the About page. Add/remove freely.
    stats: [
      { value: "3+ yrs", label: "in analytics" },
      { value: "12", label: "projects shipped" },
      { value: "Python", label: "main stack" },
    ],
  },

  /* --- Work experience ----------------------------------------------------
     One entry per workplace. `bullets` is a list — add as many as you like.
     ---------------------------------------------------------------------- */
  experience: [
    {
      title: "Data Analyst",
      org: "Acme Analytics",
      start: "2024",
      end: "Present",
      bullets: [
        "Placeholder bullet — a result you drove, with a number if you have one.",
        "Placeholder bullet — a tool you used or a thing you built.",
        "Placeholder bullet — scope, stakeholders, or impact.",
      ],
    },
    {
      title: "Analytics Intern",
      org: "DataCorp",
      start: "2023",
      end: "2024",
      bullets: [
        "Placeholder bullet — what you contributed.",
        "Placeholder bullet — a measurable outcome.",
      ],
    },
  ],

  /* --- Education ----------------------------------------------------------- */
  education: [
    {
      degree: "BSc, Placeholder Field",
      org: "University of Somewhere",
      start: "2019",
      end: "2023",
      note: "",   // optional: honours, GPA, relevant coursework
    },
  ],

  /* --- Skills (shown as chips) -------------------------------------------- */
  skills: ["Python", "SQL", "Pandas", "Tableau", "dbt", "Airflow", "Git", "scikit-learn"],

  /* --- Projects -----------------------------------------------------------
     These power BOTH the Projects page AND the Gallery. Each project lists its
     own images; the Gallery is built automatically from every image across all
     projects, so you add an image ONCE here and it shows up in both places.
     (The look of the cards/tiles is still CSS: .card and .tile in styles.css.)
       type: a short label shown under the title (e.g. "Dashboard")
       url:  link to a repo, write-up, or live demo (use "#" for none)
       kind: "chart" or "diagram" — a small label under the gallery thumbnail
     ---------------------------------------------------------------------- */
  projects: [
    {
      title: "Churn Early-Warning Dashboard",
      type: "Dashboard",
      description: "Placeholder description — the problem, what you built, and the outcome in a sentence or two.",
      url: "#",
      tags: ["Python", "dbt", "Looker"],
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Churn dashboard", kind: "chart" },
        { src: "assets/img/placeholder-line.svg", caption: "Retention trend", kind: "chart" },
      ],
    },
    {
      title: "Demand Forecasting Pipeline",
      type: "ML model",
      description: "Placeholder description — swap in a real project when you have one ready to show.",
      url: "#",
      tags: ["scikit-learn", "Airflow"],
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "Pipeline architecture", kind: "diagram" },
        { src: "assets/img/placeholder-line.svg", caption: "Forecast vs actual", kind: "chart" },
      ],
    },
    {
      title: "Retail Pricing Study",
      type: "Analysis",
      description: "Placeholder description of a notebook or write-up you want to feature.",
      url: "#",
      tags: ["SQL", "Tableau"],
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Price elasticity", kind: "chart" },
        { src: "assets/img/placeholder-bars.svg", caption: "Category margins", kind: "chart" },
      ],
    },
  ],
};

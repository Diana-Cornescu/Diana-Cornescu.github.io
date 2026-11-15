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
    role: "Data Scientist",               // shows under your name + in the hero
    location: "Toronto, Canada",
    email: "DianaCornescu@Outlook.com",
    phone: "",                            // left blank — your resume omits it; add a number here if you want it public

    tagline: "I turn messy data into decisions people can act on.",  // big hero headline
    intro:
      "Recent Master of Data Science graduate (UBC, 93% average) with 1.5 years of " +
      "industry experience across analytics and data engineering. I build automated, " +
      "well-documented pipelines and predictive models that hold up on messy, real-world " +
      "data — from a 1.6M-product RAG system to validation stages that catch data drift " +
      "before it reaches a report. I like turning ambiguous business questions into tracked " +
      "technical work and clear, defensible recommendations.",

    social: {
      github: "https://github.com/Diana-Cornescu",
      linkedin: "https://www.linkedin.com/in/diana-cornescu/",
    },

    resumeFile: "assets/resume.pdf",      // drop your PDF in /assets and keep this path

    // Small stat chips on the About page. Add/remove freely.
    stats: [
      { value: "93%", label: "MDS average (UBC)" },
      { value: "1.5 yrs", label: "analytics experience" },
      { value: "6+", label: "projects shipped" },
    ],
  },

  /* --- Work experience ----------------------------------------------------
     One entry per workplace. `bullets` is a list — add as many as you like.
     ---------------------------------------------------------------------- */
  experience: [
    {
      title: "Data Scientist (Master's Capstone Project)",
      org: "Accrediting Commission for Community and Junior Colleges + Kai Analytics",
      start: "May 2026",
      end: "Jun 2026",
      bullets: [
        "Built a unified success KPI merging two previously incompatible scoring sources into one outcome target, and used it to train 3+ supervised models (OLS / ridge / lasso regression, mixed-effects, decision trees).",
        "Embedded a validation stage that detects and logs score-denominator drift, plus a naming-convention contract that selects columns by prefix/suffix — so new reporting years are accepted without any code changes.",
        "Identified 4 meaningful clusters (PCA, K-means, UMAP) across 140 entities and validated consistency across 12 time/source combinations; presented results to the client VP and partner firm.",
        "Automated model selection end to end (imputation, scaling, PCA to 95% explained variance, silhouette-based clustering) so non-technical users can run scripts and get results without touching code.",
      ],
    },
    {
      title: "Data Modeling Analyst",
      org: "Ontario Treasury Board Secretariat",
      start: "May 2023",
      end: "Dec 2023",
      bullets: [
        "Cut recurring monthly reporting time by 50% (3 hr → 1.5 hr) by building a documented Python automation script and streamlining manual processes.",
        "Added a data-quality validation step comparing entity IDs across 3 source systems, surfacing and categorizing 1,200+ recurring discrepancies for upstream correction.",
        "Documented 2 business processes to onboard incoming analysts — at a high level for context and a lower level for the programmatic logic and assumptions.",
      ],
    },
    {
      title: "Data & Business Analyst",
      org: "Lee Chow Group",
      start: "May 2022",
      end: "Dec 2022",
      bullets: [
        "Quantified portfolio financial risk in a solo-built dashboard (10+ visualizations, Excel/Power BI), surfacing quarterly exposure and recovering $3,000+ in missed revenue.",
        "Forecast neighbourhood population density with multi-linear regression on 3+ data sources to surface advantageous investment locations 5–10 years ahead of price markups.",
      ],
    },
  ],

  /* --- Education ----------------------------------------------------------- */
  education: [
    {
      degree: "Master of Data Science",
      org: "University of British Columbia",
      start: "2025",
      end: "2026",
      note: "93% cumulative average. 1st place (team) in a program-wide Datathon.",
    },
    {
      degree: "Bachelor of Commerce (Co-op), Economics Minor",
      org: "Toronto Metropolitan University",
      start: "2019",
      end: "2024",
      note: "CGPA 4.0/4.3.",
    },
    {
      degree: "MIT MicroMasters — Machine Learning with Python",
      org: "MITx (Remote)",
      start: "",
      end: "2024",
      note: "From Linear Models to Deep Learning.",
    },
  ],

  /* --- Skills (shown as chips) -------------------------------------------- */
  skills: [
    "Python", "SQL", "R", "Pandas", "NumPy", "PySpark", "scikit-learn",
    "PostgreSQL", "DuckDB", "XGBoost", "ETL & Pipeline Design",
    "RAG & LLM APIs", "LangChain", "Power BI", "Matplotlib", "Docker",
    "AWS", "Git & GitHub Actions",
  ],

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
      title: "RAG Pipeline: Amazon Electronics Products",
      type: "RAG / NLP",
      description: "Scalable NLP preprocessing pipeline for RAG retrieval across 1.6M products and 43.9M reviews, using SQL (DuckDB) and Parquet for memory-efficient transformations. Benchmarked BM25, semantic, and hybrid retrieval, then deployed the strongest strategy as a live app on a hosted LLM API (Groq + Qwen).",
      url: "https://roccolee18-amazon-electronics-recommender-app.share.connect.posit.cloud/",
      tags: ["Python", "DuckDB", "LangChain", "RAG"],
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "RAG retrieval pipeline", kind: "diagram" },
        { src: "assets/img/placeholder-bars.svg", caption: "Retrieval strategy benchmark", kind: "chart" },
      ],
    },
    {
      title: "Chartify: Dashboard with LLM Assistant",
      type: "Dashboard",
      description: "Extended a dashboard's text-to-SQL assistant (querychat, GPT-4o-mini) with a results chart that redraws from each natural-language query, including a fallback for empty results. Wrote the Playwright end-to-end and pytest unit test suites and managed 41 of the team's GitHub issues across 4 releases.",
      url: "https://github.com/UBC-MDS-2025-26/DSCI-532_2026_31_Chartify",
      tags: ["Python", "LLM", "Dashboard", "Playwright"],
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Natural-language query results", kind: "chart" },
        { src: "assets/img/placeholder-line.svg", caption: "Dashboard trend view", kind: "chart" },
      ],
    },
    {
      title: "EDA Simplifier: Python Package with CI/CD",
      type: "Python Package",
      description: "Co-developed and published an open-source Python package to TestPyPI that automates EDA on any pandas DataFrame, with a clean four-function API that auto-detects column types and routes them to the right charts. Full CI/CD via GitHub Actions: lint, tests, and auto-publish on every PR.",
      url: "https://ubc-mds-2025-26.github.io/DSCI_524_Group38_EDAsimplifier/",
      tags: ["Python", "Altair", "CI/CD"],
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Auto-generated EDA plots", kind: "chart" },
        { src: "assets/img/placeholder-flow.svg", caption: "CI/CD workflow", kind: "diagram" },
      ],
    },
    {
      title: "Avalanche Danger Prediction (Telus x TechNation Hackathon)",
      type: "ML model",
      description: "Built an end-to-end reproducible pipeline in under 12 hours that predicts daily avalanche-danger categories from forecasts and weather via an XGBoost multi-class classifier. Engineered 1–7 day lagged weather features, ran grid-search tuning, and exported confusion-matrix figures with class-weighted reports.",
      url: "https://github.com/jadeeechen/avalanche_prediction",
      tags: ["XGBoost", "Python"],
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Class-weighted performance", kind: "chart" },
      ],
    },
    {
      title: "PDF Malware Detection",
      type: "ML model",
      description: "Supervised classifier flagging malicious vs. benign PDFs from structural features, reaching 96.4% F1 / 97.9% precision / 95.1% recall on imbalanced classes. Tuned an RBF-kernel SVC via RandomizedSearchCV and shipped a reproducible workflow with Docker, conda-lock, a Makefile, and a Quarto HTML report.",
      url: "https://ralahaaqil.github.io/PDF-Malware-Detection/",
      tags: ["scikit-learn", "Docker", "Quarto"],
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Feature separation", kind: "chart" },
        { src: "assets/img/placeholder-bars.svg", caption: "Precision / recall by class", kind: "chart" },
      ],
    },
    {
      title: "Resume Auditing Workflow: Claude Skills",
      type: "Automation",
      description: "Redesigned a per-posting resume workflow into a group-and-audit process, clustering 100+ job postings into 5 groups to capture economies of scale. Built an audit step that checks a resume against each group's job descriptions and returns a ranked keyword table with coverage flags, every claim traced to a database of confirmed experience.",
      url: "#",
      tags: ["Claude", "Automation", "Python"],
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "Group-and-audit workflow", kind: "diagram" },
      ],
    },
  ],
};

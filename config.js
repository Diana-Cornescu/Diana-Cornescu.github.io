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

    tagline: "Data Scientist by training, \nSolution builder by instinct.",  // big hero headline
    intro:
      "Recent Master of Data Science graduate with 1.5 years of industry experience across" +
      " data modeling and analytics. I build automated, " +
      "well-documented pipelines and predictive models that hold up on messy & real-world " +
      "data. I genuinely enjoy digging into complex problems where solutions save time," +
      " money, or energy. Pride in my work is what drives me.",

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
     One entry per workplace.

     `bullets` can be either a plain string OR an object:
         "A simple bullet with no filter tag."
       or
         { text: "A bullet you can filter.", cats: ["Data Science", "Initiative"] }

     The `cats` tag each bullet so the Experience filter chips (below, in
     `experienceFilters`) can show/hide them. Use any of the labels from
     `experienceFilters` — spelled exactly the same — and add as many as fit.
     ---------------------------------------------------------------------- */

  // The chips shown above Experience on the resume page. Each bullet's `cats`
  // must match one of these labels exactly to be filterable.
  experienceFilters: [
    "Data Science",
    "Data Analytics",
    "Data Engineer & Cloud",
    "Non-Technical Communication",
    "Initiative",
  ],

  experience: [
    {
      title: "Data Scientist (Master's Capstone Project)",
      org: "Accrediting Commission for Community and Junior Colleges + Kai Analytics",
      start: "May 2026",
      end: "Jun 2026",
      bullets: [
        { text: "Developed a unified success KPI that merges two previously incompatible scoring sources into a single outcome target, applying domain-specific logic to adjust for composition changes, and used it to train 3+ supervised models (OLS / ridge / lasso regression, mixed-effects, and decision trees).",
          cats: ["Data Science"] },
        { text: "Ensured long-term interpretability for reliable year-over-year use by embedding a validation stage that detects and logs score-denominator drift, as well as a naming-convention contract that selects columns by prefix/suffix to accept new reporting years without any code changes.",
          cats: ["Data Engineer & Cloud", "Initiative"] },
        { text: "Ran weekly meetings with a client VP to translate business requirements into tracked technical requirements, and during handoff provided results to stakeholders with supplementary documentation on methodology, scripts, dependencies, and limitations.",
          cats: ["Non-Technical Communication"] },
        { text: "Presented analysis results to client VP and partner firm after identifying 4 meaningful clusters (PCA, K-means, UMAP) across 140 entities to enable equitable comparisons, ensuring robust results by validating consistency across 12 combinations of time and source type; each script run writes a self-describing log so results trace back to their settings.",
          cats: ["Data Science", "Non-Technical Communication"] },
        { text: "Replaced a manual tuning step and automated model selection end to end: imputing, scaling, reducing dimensionality to a 95% explained variance threshold with PCA, and selecting the best clustering by silhouette score so non-technical users can run scripts and obtain results without touching code.",
          cats: ["Data Engineer & Cloud", "Initiative"] },
      ],
    },
    {
      title: "Data Modeling Analyst",
      org: "Ontario Treasury Board Secretariat",
      start: "May 2023",
      end: "Dec 2023",
      bullets: [
        { text: "Reduced the time and variability in recurring reporting by streamlining manual processes, improving consistency while cutting processing time by 50% (3 hr to 1.5 hr) by self-developing a Python automation script with documentation.",
          cats: ["Data Engineer & Cloud", "Initiative"] },
        { text: "Developed a data-quality validation step when automating a monthly source-merge process, comparing entity IDs across 3 source systems to surface and categorize 1,200+ recurring discrepancies for upstream correction.",
          cats: ["Data Analytics", "Data Engineer & Cloud"] },
        { text: "Documented 2 business processes to train and onboard incoming talent, at a high level to give context and at a lower level to outline the logic and assumptions used programmatically.",
          cats: ["Non-Technical Communication"] },
      ],
    },
    {
      title: "Data & Business Analyst",
      org: "Lee Chow Group",
      start: "May 2022",
      end: "Dec 2022",
      bullets: [
        { text: "Quantified portfolio financial risk by aggregating scattered contract terms into a solo-built dashboard (10+ visualizations, Excel/Power BI), surfacing quarterly portfolio exposure and recovering $3,000+ in missed revenue.",
          cats: ["Data Analytics", "Initiative"] },
        { text: "Identified strategic opportunities 5-10 years ahead of time by using ETL on 3+ data sources and forecasting neighborhood population density with multi-linear regression modeling to surface advantageous investment locations before price markups.",
          cats: ["Data Science", "Data Analytics"] },
      ],
    },
  ],

  /* --- Education ----------------------------------------------------------- */
  education: [
    {
      degree: "Master of Data Science",
      org: "University of British Columbia",
      start: "Sep 2025",
      end: "Jun 2026",
      note: "93% cumulative average. 1st place (team) in a program-wide Datathon.",
    },
    {
      degree: "MIT MicroMasters — Machine Learning with Python",
      org: "MITx (Remote)",
      start: "Jun 2024",
      end: "Jun 2024",
      note: "From Linear Models to Deep Learning.",
    },
    {
      degree: "Bachelor of Commerce (Co-op), Economics Minor",
      org: "Toronto Metropolitan University",
      start: "Sep 2019",
      end: "Apr 2024",
      note: "CGPA 4.0/4.3.",
    },
  ],

  /* --- Skills -------------------------------------------------------------
     These are the chips at the TOP of the Projects page. Click one to filter
     the project cards to those tagged with that skill (see `tags` on each
     project below). A skill with no matching project still shows, but dimmed.
     Keep a skill's spelling identical to the `tags` you want it to match.
     ---------------------------------------------------------------------- */
  skills: [
    "Python", "SQL", "R", "Pandas", "NumPy", "PySpark", "scikit-learn",
    "PostgreSQL", "DuckDB", "XGBoost", "ETL & Pipeline Design",
    "RAG & LLM APIs", "LangChain", "Power BI", "Matplotlib", "Docker",
    "AWS", "Git & GitHub Actions",
  ],

  /* --- Skill categories ---------------------------------------------------
     The grouped skills shown in the collapsible "Skills" section on the
     resume page (mirrors the Technical Skills block of your master resume).
     This is SEPARATE from the flat `skills` list above (which powers the
     Projects filter) — edit each where you need it.
     ---------------------------------------------------------------------- */
  skillCategories: [
    { category: "Languages & Data",
      items: ["Python (Pandas, NumPy, PySpark, scikit-learn)", "R", "SQL (Postgres, DuckDB)", "Parquet", "Jupyter"] },
    { category: "Data Engineering & ETL",
      items: ["Pipeline design", "Data modeling & validation", "Schema-drift handling", "Experiment & audit logging"] },
    { category: "GenAI & LLM",
      items: ["RAG", "LLM APIs", "Prompt engineering", "LangChain", "NLP", "Claude Code & Cowork (Skills, Plugins)"] },
    { category: "Machine Learning",
      items: ["Regression", "Clustering", "XGBoost", "Feature engineering", "Cross-validation & model evaluation"] },
    { category: "Visualization & BI",
      items: ["Data storytelling", "Exploratory Data Analysis (EDA)", "Power BI", "Excel", "Matplotlib / Seaborn", "Quarto"] },
    { category: "Statistics",
      items: ["Hypothesis testing", "Correlations", "A/B testing", "Segmentation", "Dimensionality reduction", "Anomaly detection"] },
    { category: "Cloud & Delivery",
      items: ["Reproducibility", "Docker", "AWS (ECS, S3)", "GitHub & Actions (CI/CD)", "APIs", "Unit testing", "CLI tooling (Make)"] },
  ],

  /* --- Skill cloud --------------------------------------------------------
     The filterable word-cloud banner at the top of the resume page.
       level: 1-3 = your confidence, and also the SIZE in the cloud
              (3 = biggest/strongest, 2 = medium, 1 = smallest). Best guesses
              below — bump any up or down and the size changes with it.
       cats:  which focus areas a skill belongs to. Click a filter chip and
              only skills carrying that focus area stay visible. Spell them
              exactly like the entries in `skillCloudFilters`.
     ---------------------------------------------------------------------- */
  skillCloudFilters: ["Data Science", "Data Analytics", "Data Engineer & Cloud", "GenAI & LLM"],

  skillCloud: [
    // Intentionally interleaved (not sorted by size) so the cloud reads like a
    // cloud. Order here = display order; shuffle freely, it changes nothing else.
    { name: "Python", level: 3, cats: ["Data Science", "Data Analytics", "Data Engineer & Cloud", "GenAI & LLM"] },
    { name: "R", level: 2, cats: ["Data Science", "Data Analytics"] },
    { name: "RAG", level: 3, cats: ["GenAI & LLM"] },
    { name: "PySpark", level: 1, cats: ["Data Engineer & Cloud", "Data Science"] },
    { name: "SQL", level: 3, cats: ["Data Analytics", "Data Engineer & Cloud", "Data Science"] },
    { name: "Hypothesis testing", level: 2, cats: ["Data Science", "Data Analytics"] },
    { name: "DuckDB", level: 2, cats: ["Data Engineer & Cloud", "Data Science"] },
    { name: "Prompt engineering", level: 3, cats: ["GenAI & LLM"] },
    { name: "Correlations", level: 1, cats: ["Data Analytics"] },
    { name: "Pandas", level: 3, cats: ["Data Science", "Data Analytics"] },
    { name: "Power BI", level: 2, cats: ["Data Analytics"] },
    { name: "NLP", level: 2, cats: ["GenAI & LLM", "Data Science"] },
    { name: "Excel", level: 3, cats: ["Data Analytics"] },
    { name: "Parquet", level: 1, cats: ["Data Engineer & Cloud"] },
    { name: "scikit-learn", level: 3, cats: ["Data Science"] },
    { name: "Feature engineering", level: 2, cats: ["Data Science"] },
    { name: "LangChain", level: 2, cats: ["GenAI & LLM"] },
    { name: "Data storytelling", level: 3, cats: ["Data Analytics", "Data Science"] },
    { name: "AWS", level: 1, cats: ["Data Engineer & Cloud"] },
    { name: "XGBoost", level: 2, cats: ["Data Science"] },
    { name: "LLM APIs", level: 3, cats: ["GenAI & LLM"] },
    { name: "Jupyter", level: 2, cats: ["Data Science", "Data Analytics"] },
    { name: "Cross-validation", level: 1, cats: ["Data Science"] },
    { name: "Regression", level: 3, cats: ["Data Science", "Data Analytics"] },
    { name: "Docker", level: 2, cats: ["Data Engineer & Cloud"] },
    { name: "A/B testing", level: 2, cats: ["Data Analytics", "Data Science"] },
    { name: "Exploratory Data Analysis", level: 3, cats: ["Data Science", "Data Analytics"] },
    { name: "Quarto", level: 1, cats: ["Data Engineer & Cloud"] },
    { name: "NumPy", level: 2, cats: ["Data Science"] },
    { name: "Claude Code & Cowork", level: 3, cats: ["GenAI & LLM"] },
    { name: "ETL pipeline design", level: 2, cats: ["Data Engineer & Cloud"] },
    { name: "Clustering", level: 2, cats: ["Data Science"] },
    { name: "Reproducibility", level: 1, cats: ["Data Engineer & Cloud"] },
    { name: "PostgreSQL", level: 2, cats: ["Data Engineer & Cloud", "Data Analytics"] },
    { name: "Matplotlib / Seaborn", level: 2, cats: ["Data Science", "Data Analytics"] },
    { name: "GitHub Actions (CI/CD)", level: 2, cats: ["Data Engineer & Cloud"] },
    { name: "APIs", level: 1, cats: ["Data Engineer & Cloud", "GenAI & LLM"] },
    { name: "Data modeling", level: 2, cats: ["Data Engineer & Cloud"] },
    { name: "Unit testing", level: 2, cats: ["Data Engineer & Cloud"] },
  ],

  /* --- Projects -----------------------------------------------------------
     These power the Projects page, the Gallery, AND each project's own detail
     page (project.html?p=<slug>). Add a project here and its card, gallery
     tiles, toolkit filter chips, and detail page all appear automatically.
       slug:        the URL id for the detail page. Omit it and it's made from
                    the title. Keep it stable once you've shared a link.
       type:        short label under the title (e.g. "Dashboard")
       description: the one-paragraph blurb shown on the project card
       github / website: optional links shown as buttons on the detail page
                    (leave a field out if there isn't one)
       tags:        the "toolkit" — also the filter chips on the Projects page,
                    auto-collected from every project (no separate list to keep)
       images:      { src, caption, kind } — shown on the detail page and the
                    Gallery; kind is "chart" or "diagram"
       details:     the long-form, blog-style content on the detail page:
         summary  — one-line lead under the title
         why      — "Why it matters" paragraph
         what     — "What I did" (an array renders as bullets; a string as text)
         result   — "The result" paragraph
     ---------------------------------------------------------------------- */
  projects: [
    {
      title: "RAG Pipeline: Amazon Electronics Products",
      slug: "rag-amazon-electronics",
      type: "RAG / NLP",
      description: "Scalable NLP preprocessing pipeline for RAG retrieval across 1.6M products and 43.9M reviews, using SQL (DuckDB) and Parquet for memory-efficient transformations. Benchmarked BM25, semantic, and hybrid retrieval, then deployed the strongest strategy as a live app on a hosted LLM API (Groq + Qwen).",
      github: "https://github.com/UBC-MDS-2025-26/BM25-Semantic-and-Hybrid-RAG-Search",
      website: "https://roccolee18-amazon-electronics-recommender-app.share.connect.posit.cloud/",
      tags: ["Python", "SQL", "DuckDB", "LangChain", "RAG & LLM APIs", "ETL & Pipeline Design"],
      details: {
        summary: "A retrieval system that answers natural-language questions over 1.6M Amazon electronics products and 43.9M reviews.",
        why: "Product search breaks down when the catalogue is enormous and the useful signal is buried in millions of unstructured reviews. I wanted a retrieval layer that could scale to that size on a modest compute budget and still return results an LLM could reason over.",
        what: [
          "Built a memory-efficient preprocessing pipeline in SQL (DuckDB) and Parquet to rank reviews and aggregate the corpus for retrieval.",
          "Merged product metadata with each item's top-10 most helpful reviews into entity-level profiles that capture real customer language.",
          "Benchmarked BM25, semantic, and hybrid LangChain retrieval on a fixed, varied-complexity query set with manual relevance scoring.",
          "Deployed the winning strategy as a live app, cutting LLM-layer latency by moving to a hosted API (Groq + Qwen).",
        ],
        result: "A deployed retrieval app over 1.6M products that returns relevant results and feeds a low-latency LLM answer layer — with the retrieval strategy chosen from evidence rather than guesswork.",
      },
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "RAG retrieval pipeline", kind: "diagram" },
        { src: "assets/img/placeholder-bars.svg", caption: "Retrieval strategy benchmark", kind: "chart" },
      ],
    },
    {
      title: "Chartify: Dashboard with LLM Assistant",
      slug: "chartify-llm-dashboard",
      type: "Dashboard",
      description: "Extended a dashboard's text-to-SQL assistant (querychat, GPT-4o-mini) with a results chart that redraws from each natural-language query, including a fallback for empty results. Wrote the Playwright end-to-end and pytest unit test suites and managed 41 of the team's GitHub issues across 4 releases.",
      github: "https://github.com/UBC-MDS-2025-26/DSCI-532_2026_31_Chartify",
      website: "https://019c9724-a466-7485-646d-fe85536777ee.share.connect.posit.cloud/",
      tags: ["Python", "SQL", "RAG & LLM APIs", "Git & GitHub Actions"],
      details: {
        summary: "A data dashboard with a natural-language assistant that turns plain-English questions into SQL and a chart.",
        why: "A dashboard can only answer the questions its designer anticipated. Letting users ask in plain English — and getting a chart back — removes that ceiling, but only if the system fails gracefully when a query returns nothing useful.",
        what: [
          "Extended the text-to-SQL assistant (querychat, GPT-4o-mini) with a results chart that redraws from each query, plus a fallback for empty results or a dropped column.",
          "Wrote the app specification mapping three user job-stories to the components that answer each audience's questions.",
          "Broke the team's work into 41 of 54 GitHub issues and kept the board on track across 4 tagged releases.",
          "Built the automated test suite: Playwright end-to-end tests and pytest unit tests over the visualization settings.",
        ],
        result: "A working LLM-assisted dashboard with a resilient query-to-chart flow, documented API setup, and a test suite that guards the visualization logic.",
      },
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Natural-language query results", kind: "chart" },
        { src: "assets/img/placeholder-line.svg", caption: "Dashboard trend view", kind: "chart" },
      ],
    },
    {
      title: "EDA Simplifier: Python Package with CI/CD",
      slug: "eda-simplifier",
      type: "Python Package",
      description: "Co-developed and published an open-source Python package to TestPyPI that automates EDA on any pandas DataFrame, with a clean four-function API that auto-detects column types and routes them to the right charts. Full CI/CD via GitHub Actions: lint, tests, and auto-publish on every PR.",
      github: "https://github.com/UBC-MDS-2025-26/DSCI_524_Group38_EDAsimplifier",
      website: "https://ubc-mds-2025-26.github.io/DSCI_524_Group38_EDAsimplifier/",
      tags: ["Python", "Pandas", "Git & GitHub Actions"],
      details: {
        summary: "An open-source Python package that automates exploratory data analysis on any pandas DataFrame.",
        why: "Early EDA is repetitive: the same histograms, correlations, and bar charts rewritten for every dataset. A small, well-tested package removes that busywork and keeps the output consistent.",
        what: [
          "Designed a four-function API that auto-detects column types and routes them to the right visualizations, wrapping Altair with friendly defaults.",
          "Published the package to TestPyPI.",
          "Set up CI/CD with GitHub Actions: lint and unit tests on every PR, auto-publish to TestPyPI and GitHub Pages, and coverage tracking via Codecov.",
        ],
        result: "A published, installable package that replaces manual pandas/Altair boilerplate, with automated tests and releases on every change.",
      },
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Auto-generated EDA plots", kind: "chart" },
        { src: "assets/img/placeholder-flow.svg", caption: "CI/CD workflow", kind: "diagram" },
      ],
    },
    {
      title: "Avalanche Danger Prediction (Telus x TechNation Hackathon)",
      slug: "avalanche-danger-prediction",
      type: "ML model",
      description: "Built an end-to-end reproducible pipeline in under 12 hours that predicts daily avalanche-danger categories from forecasts and weather via an XGBoost multi-class classifier. Engineered 1–7 day lagged weather features, ran grid-search tuning, and exported confusion-matrix figures with class-weighted reports.",
      github: "https://github.com/jadeeechen/avalanche_prediction",
      tags: ["Python", "XGBoost"],
      details: {
        summary: "A model that predicts daily avalanche-danger categories from forecasts and weather — built end to end in under 12 hours.",
        why: "Avalanche risk shifts daily with the weather, and a reproducible model that flags danger categories could support safer backcountry decisions. The real constraint was time: a full pipeline in a single hackathon day.",
        what: [
          "Built a reproducible pipeline intaking avalanche-danger forecasts and current weather.",
          "Engineered 1–7 day lagged weather features and trained an XGBoost multi-class classifier.",
          "Ran grid-search tuning and exported confusion-matrix figures with class-weighted reports.",
        ],
        result: "An end-to-end multi-class classifier delivered in under 12 hours, with tuned hyperparameters and clear per-class performance reporting.",
      },
      images: [
        { src: "assets/img/placeholder-bars.svg", caption: "Class-weighted performance", kind: "chart" },
      ],
    },
    {
      title: "PDF Malware Detection",
      slug: "pdf-malware-detection",
      type: "ML model",
      description: "Supervised classifier flagging malicious vs. benign PDFs from structural features, reaching 96.4% F1 / 97.9% precision / 95.1% recall on imbalanced classes. Tuned an RBF-kernel SVC via RandomizedSearchCV and shipped a reproducible workflow with Docker, conda-lock, a Makefile, and a Quarto HTML report.",
      github: "https://github.com/ralahaaqil/PDF-Malware-Detection",
      website: "https://ralahaaqil.github.io/PDF-Malware-Detection/",
      tags: ["Python", "scikit-learn", "Docker"],
      details: {
        summary: "A classifier that flags malicious vs. benign PDFs from their structural features.",
        why: "Malicious PDFs are a common attack vector, and a false negative is far costlier than a false alarm. I wanted a model tuned for that asymmetry and a workflow anyone could reproduce.",
        what: [
          "Trained and compared Logistic Regression and SVC against a dummy baseline, tuning the winning RBF-kernel SVC with RandomizedSearchCV.",
          "Cleaned messy real-world data and built preprocessing: median imputation, scaling, and one-hot encoding.",
          "Packaged a reproducible workflow with Docker, conda-lock, and a Makefile, rendering the analysis as HTML via Quarto.",
        ],
        result: "96.4% F1 / 97.9% precision / 95.1% recall on imbalanced classes — 27 of ~2,000 test files misclassified — framed around the cybersecurity cost of a false negative.",
      },
      images: [
        { src: "assets/img/placeholder-scatter.svg", caption: "Feature separation", kind: "chart" },
        { src: "assets/img/placeholder-bars.svg", caption: "Precision / recall by class", kind: "chart" },
      ],
    },
    {
      title: "Resume Auditing Workflow: Claude Skills",
      slug: "resume-auditing-workflow",
      type: "Automation",
      description: "Redesigned a per-posting resume workflow into a group-and-audit process, clustering 100+ job postings into 5 groups to capture economies of scale. Built an audit step that checks a resume against each group's job descriptions and returns a ranked keyword table with coverage flags, every claim traced to a database of confirmed experience.",
      tags: ["Python", "RAG & LLM APIs"],
      details: {
        summary: "A group-and-audit workflow that tailors resumes against clusters of job postings instead of one posting at a time.",
        why: "Tailoring a resume to every single posting has steep diminishing returns. Grouping similar postings captures most of the benefit for a fraction of the effort — but only if every claim can be traced to real, confirmed experience.",
        what: [
          "Redesigned a per-posting workflow into a group-and-audit process over 6 weeks and 3 major iterations.",
          "Clustered 100+ job postings into 5 groups that move in the same direction.",
          "Built the audit step: a ranked keyword table with coverage flags, summary options tied to specific postings, and a non-relevant cut list, every claim traced to a database of confirmed experience.",
        ],
        result: "A repeatable auditing workflow that cuts low-value micro-tailoring while keeping every resume claim evidence-backed.",
      },
      images: [
        { src: "assets/img/placeholder-flow.svg", caption: "Group-and-audit workflow", kind: "diagram" },
      ],
    },
  ],
};

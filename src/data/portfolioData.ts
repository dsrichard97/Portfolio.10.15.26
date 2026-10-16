import { BlogPost, ExperienceItem, ProfileData, Project } from '../types/portfolio';

export const initialProfile: ProfileData = {
  name: 'Richard Diaz De Leon',
  role: 'Financial Planning Analyst',
  headline: 'Driving strategic growth through predictive financial modeling, budget variance analysis, and automated reporting pipelines.',
  bio: 'Financial Planning Analyst specializing in corporate FP&A, multi-scenario revenue forecasting, budget-vs-actuals (BvA) variance analysis, and financial data automation. Bridging traditional corporate finance and GAAP mechanics with modern analytics tools (Python, SQL, PowerBI, advanced Excel/VBA) to deliver actionable executive intelligence for leadership teams.',
  location: 'San Francisco, CA & Remote',
  email: 'diazrichard98@gmail.com',
  github: 'https://github.com/dsrichard97',
  linkedin: 'https://www.linkedin.com/in/richarddiazdeleon',
  twitter: 'https://x.com/richarddiaz_fpa',
  statusText: 'Available for full-time FP&A & finance leadership opportunities',
  stats: [
    { value: '5+ Years', label: 'Corporate FP&A Experience', detail: 'Budgeting, forecasting & strategic finance' },
    { value: '$120M+', label: 'Operating Budgets Modeled', detail: 'OPEX, CAPEX & revenue across 8 business units' },
    { value: '< 1.5%', label: 'Forecast Variance Accuracy', detail: 'Quarterly rolling prediction fidelity' },
    { value: '40+ hrs/mo', label: 'Reclaimed via Automation', detail: 'Python & SQL pipelines replacing manual workbooks' },
  ],
};

export const projectsData: Project[] = [
  {
    id: 'apex-revenue-forecast',
    title: 'ApexForecast Revenue Engine',
    tagline: 'Dynamic multi-scenario revenue forecasting model with cohort retention curves and Monte Carlo simulation',
    category: 'Forecasting & FP&A',
    summary: 'A sophisticated revenue forecasting framework built to replace rigid static spreadsheets. Integrates granular customer cohort retention curves, expansion trajectories, and macroeconomic sensitivity parameters to produce probabilistic Bull, Base, and Bear cases for executive leadership.',
    architecture: 'Python analytics core utilizing pandas and numpy for Monte Carlo probability distributions (10,000 iterations). Feeds into an automated executive scenario bridge and dynamic PowerBI reporting layer.',
    challenges: [
      'Static revenue models failed to anticipate churn acceleration during macroeconomic contraction cycles.',
      'Manual multi-tab workbook maintenance took over 18 hours per monthly forecast iteration.',
      'Executive team lacked visibility into confidence intervals around quarterly guidance targets.'
    ],
    solutions: [
      'Implemented log-normal distribution modeling for customer acquisition and cohort renewal rates.',
      'Automated data ingestion from billing databases and CRM systems via scheduled SQL queries.',
      'Delivered interactive scenario sliders allowing C-suite stakeholders to test pricing and churn assumptions in real time.'
    ],
    metrics: [
      { label: 'Forecast Accuracy', value: '98.8%' },
      { label: 'Modeling Time', value: '2 hrs vs 18 hrs' },
      { label: 'Simulations Run', value: '10,000 runs' },
      { label: 'ARR Modeled', value: '$45M' }
    ],
    technologies: ['Python', 'SQL', 'pandas', 'Monte Carlo', 'PowerBI', 'Advanced Excel', 'Financial Modeling'],
    featured: true,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/financial-forecasting-engine',
    stars: 340,
    themeColor: '#0ea5e9',
    diagramStyle: 'forecast',
    codeSnippet: {
      title: 'monte_carlo_revenue.py',
      language: 'python',
      code: `import numpy as np
import pandas as pd

def simulate_cohort_revenue(starting_arr, expansion_mean, expansion_std, churn_mean, churn_std, n_simulations=10000):
    """
    Monte Carlo simulation for annualized revenue confidence intervals.
    Generates 10th, 50th (Base), and 90th percentile revenue horizons.
    """
    sim_expansion = np.random.normal(expansion_mean, expansion_std, n_simulations)
    sim_churn = np.random.normal(churn_mean, churn_std, n_simulations)
    net_retention = 1.0 + sim_expansion - np.maximum(0, sim_churn)
    
    projected_arr = starting_arr * net_retention
    percentiles = np.percentile(projected_arr, [10, 50, 90])
    
    return {
        'bear_case_p10': round(percentiles[0], 2),
        'base_case_p50': round(percentiles[1], 2),
        'bull_case_p90': round(percentiles[2], 2)
    }`
    }
  },
  {
    id: 'vortex-variance-pipeline',
    title: 'Vortex Automated BvA Suite',
    tagline: 'Automated Budget vs. Actuals variance analysis data pipeline with instant root-cause attribution',
    category: 'Data Automation',
    summary: 'An automated financial intelligence pipeline that pulls general ledger actuals and reconciles them against corporate operating budgets. Automatically decomposes variances into volume, price, and mix drivers, producing drill-down reports within minutes of month-end close.',
    architecture: 'PostgreSQL data warehouse views connected with automated Python ETL scripts. Generates formatted departmental variance waterfalls and triggers automated anomaly flags for budget owners.',
    challenges: [
      'Month-end close variance commentary was delayed by 5 days due to manual VLOOKUPs across disconnected ERP and payroll exports.',
      'Budget owners struggled to distinguish between one-off timing anomalies and structural cost overruns.'
    ],
    solutions: [
      'Built a centralized data staging schema standardizing cost center mappings across departments.',
      'Engineered an automatic volume-price-mix variance decomposition algorithm.',
      'Reduced month-end reporting turnaround from 5 business days to 4 hours post-close.'
    ],
    metrics: [
      { label: 'Turnaround Time', value: '4 hours' },
      { label: 'Variance Precision', value: '< 1.2%' },
      { label: 'Departments Automated', value: '14 cost centers' },
      { label: 'Manual Errors', value: 'Zero defects' }
    ],
    technologies: ['SQL', 'PostgreSQL', 'Python', 'ETL Automation', 'ERP Integration', 'Variance Attribution'],
    featured: true,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/automated-bva-variance-suite',
    stars: 280,
    themeColor: '#10b981',
    diagramStyle: 'variance',
    codeSnippet: {
      title: 'variance_attribution.sql',
      language: 'sql',
      code: `SELECT 
    c.cost_center_name,
    c.department,
    SUM(b.budgeted_amount) AS total_budget,
    SUM(a.actual_amount) AS total_actual,
    SUM(a.actual_amount) - SUM(b.budgeted_amount) AS dollar_variance,
    ROUND(((SUM(a.actual_amount) - SUM(b.budgeted_amount)) / NULLIF(SUM(b.budgeted_amount), 0)) * 100, 2) AS variance_pct,
    CASE 
        WHEN (SUM(a.actual_amount) - SUM(b.budgeted_amount)) > 15000 AND (SUM(a.actual_amount) / NULLIF(SUM(b.budgeted_amount), 0)) > 1.10
        THEN 'CRITICAL_OVERRUN_FLAG'
        WHEN (SUM(a.actual_amount) - SUM(b.budgeted_amount)) < -10000 
        THEN 'FAVORABLE_SAVINGS'
        ELSE 'WITHIN_TOLERANCE'
    END AS status_indicator
FROM dim_cost_center c
LEFT JOIN fact_budget b ON c.cost_center_id = b.cost_center_id AND b.period = '2026-Q3'
LEFT JOIN fact_gl_actuals a ON c.cost_center_id = a.cost_center_id AND a.period = '2026-Q3'
GROUP BY c.cost_center_name, c.department
ORDER BY dollar_variance DESC;`
    }
  },
  {
    id: 'pulse-liquidity-13week',
    title: 'PulseLiquidity 13-Week Cash Flow',
    tagline: 'Direct-method rolling 13-week cash flow and working capital stress test model',
    category: 'Financial Modeling',
    summary: 'A mission-critical treasury and FP&A model forecasting direct cash receipts, vendor disbursements, payroll cycles, and tax obligations across a rolling 13-week horizon. Features adjustable DPO and DSO sensitivity controls.',
    architecture: 'Granular aging schedule model pulling directly from accounts receivable (AR) and accounts payable (AP) ledgers, dynamic working capital cycle timing, and liquidity covenant buffer tracking.',
    challenges: [
      'Rapid company growth created sudden working capital bottlenecks during inventory buildup cycles.',
      'Senior leadership needed clear early-warning triggers 6–8 weeks before potential minimum cash covenant breaches.'
    ],
    solutions: [
      'Established DSO (Days Sales Outstanding) decay curves based on historical payment patterns.',
      'Implemented automated vendor payment prioritization schedules preserving vendor relationships while smoothing cash outflows.',
      'Created a dynamic headroom indicator guaranteeing compliance with credit facility covenants.'
    ],
    metrics: [
      { label: 'Weekly Precision', value: '± 2.1%' },
      { label: 'Covenant Headroom', value: '>$4.5M buffer' },
      { label: 'Horizon Modeled', value: '13 rolling wks' },
      { label: 'Reporting Cadence', value: 'Weekly refresh' }
    ],
    technologies: ['Financial Modeling', 'Working Capital', 'Treasury Operations', 'Excel VBA', 'Cash Forecasting'],
    featured: true,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/13-week-cash-flow-model',
    stars: 215,
    themeColor: '#f59e0b',
    diagramStyle: 'liquidity',
  },
  {
    id: 'horizon-capital-dcf',
    title: 'Horizon Capital & DCF Allocator',
    tagline: 'Corporate valuation, hurdle rate sensitivity, and CAPEX multi-initiative evaluation matrix',
    category: 'Financial Modeling',
    summary: 'A multi-asset corporate investment appraisal model calculating Net Present Value (NPV), Internal Rate of Return (IRR), and discounted payback periods for competing strategic capital expenditure projects.',
    architecture: 'Standardized 3-statement forecast tie-in with dynamic Weighted Average Cost of Capital (WACC) calculations, terminal growth rate toggles, and Monte Carlo risk-adjusted returns.',
    challenges: [
      'Business units presented non-standardized ROI calculations, making objective capital allocation impossible.',
      'Overlooked cost of capital fluctuations caused sub-optimal hurdle rate evaluations.'
    ],
    solutions: [
      'Created an institutional-grade standardized DCF evaluation template enforced across all corporate divisions.',
      'Constructed dynamic two-way data tables evaluating NPV sensitivity across varying WACC and EBITDA margin assumptions.'
    ],
    metrics: [
      { label: 'CAPEX Evaluated', value: '$32M evaluated' },
      { label: 'Target IRR Hurdle', value: '18.5%' },
      { label: 'Payback Period', value: '2.4 years' },
      { label: 'Sensitivity Matrix', value: '2-way WACC/Growth' }
    ],
    technologies: ['DCF Modeling', 'CAPEX Budgeting', 'NPV / IRR Analysis', 'WACC Calculation', 'Valuation'],
    featured: false,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/corporate-capital-allocation-dcf',
    stars: 190,
    themeColor: '#8b5cf6',
    diagramStyle: 'waterfall',
  },
  {
    id: 'marginlens-unit-economics',
    title: 'MarginLens Unit Economics',
    tagline: 'Granular gross margin decomposition, customer acquisition cost (CAC), and LTV payback framework',
    category: 'Executive Dashboards',
    summary: 'A deep-dive SaaS and product profitability model analyzing customer-level unit economics, fully loaded CAC, magic numbers, and contribution margins across distinct customer segments.',
    architecture: 'SQL aggregation pipeline reconciling Stripe billing data with digital marketing ad spends, server compute allocations, and customer support tier costs.',
    challenges: [
      'Blended gross margins hid unprofitable enterprise tier contracts requiring excessive custom engineering support.',
      'Marketing spend attribution was decoupled from long-term customer cohort retention data.'
    ],
    solutions: [
      'Decomposed margins by product tier, revealing an 18% cost drag in legacy enterprise contracts.',
      'Calculated fully-loaded CAC including marketing headcount, tooling, and onboarding overhead.',
      'Empowered product leadership to adjust pricing tiers, increasing aggregate gross margin by 420 basis points.'
    ],
    metrics: [
      { label: 'Margin Expansion', value: '+420 bps' },
      { label: 'LTV / CAC Ratio', value: '3.8x healthy' },
      { label: 'Payback Window', value: '11 months' },
      { label: 'Contracts Audited', value: '450+ accounts' }
    ],
    technologies: ['Unit Economics', 'SaaS Metrics', 'CAC / LTV Analysis', 'SQL', 'Tableau', 'Margin Optimization'],
    featured: false,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/unit-economics-marginlens',
    stars: 260,
    themeColor: '#ec4899',
    diagramStyle: 'unit_economics',
  },
  {
    id: 'board-reporting-generator',
    title: 'BoardDeck Executive Suite',
    tagline: 'Automated quarterly board pack generator with visual bridge waterfalls and financial KPI summaries',
    category: 'Executive Dashboards',
    summary: 'A Python and presentation automation utility converting monthly general ledger and FP&A models into publication-ready executive slide decks and interactive KPI tables for Board of Directors presentations.',
    architecture: 'Automated Python reporting scripts interacting with Google Slides and PowerPoint APIs, populating audited financial tables, EBITDA bridge waterfalls, and cash burn charts with zero manual formatting.',
    challenges: [
      'Quarterly board meeting prep consumed 30+ analyst hours formatting slides and double-checking numbers against updated models.',
      'Last-minute journal entry adjustments risked presentation errors in front of the board.'
    ],
    solutions: [
      'Automated dynamic link injection ensuring slide charts update instantly upon model revisions.',
      'Standardized corporate financial chart themes with clear variance annotations.'
    ],
    metrics: [
      { label: 'Prep Time Saved', value: '25 hrs / quarter' },
      { label: 'Report Precision', value: '100% reconciled' },
      { label: 'Slide Deck Refresh', value: 'Instant (< 1 min)' },
      { label: 'Audience', value: 'C-Suite & Board' }
    ],
    technologies: ['Python', 'Executive Reporting', 'Board Presentation', 'PowerBI', 'Data Visualization', 'EBITDA Bridges'],
    featured: false,
    liveUrl: 'https://www.linkedin.com/in/richarddiazdeleon',
    repoUrl: 'https://github.com/dsrichard97/board-pack-generator',
    stars: 310,
    themeColor: '#14b8a6',
    diagramStyle: 'waterfall',
  }
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'sub-millisecond-13week-cashflow',
    slug: 'building-resilient-13-week-cash-flow-forecasts',
    title: 'Building Resilient 13-Week Cash Flow Forecasts in High-Volatility Operating Environments',
    excerpt: 'How to construct an institutional direct-method 13-week cash forecast that bridges operational payables, customer collection decay curves, and covenant buffers under market stress.',
    category: 'Treasury & Liquidity',
    date: 'October 2026',
    readTime: '7 min read',
    tags: ['Cash Flow', 'Treasury', 'Financial Modeling', 'Working Capital', 'Risk Management'],
    featured: true,
    keyTakeaways: [
      'Indirect cash flow statements are too slow and abstract for short-term liquidity management; 13-week forecasts must use the direct receipts and disbursements method.',
      'Customer accounts receivable decay curves must be dynamically weighted based on payment terms rather than simple 30/60/90-day averages.',
      'Automating daily cash reconciliation against bank statement feeds catches cash burn anomalies before they threaten liquidity covenants.',
      'Always stress-test payment delay scenarios on top 5 customers to determine structural covenant headroom.'
    ],
    sections: [
      {
        heading: 'Why Indirect Cash Flow Models Fail in Stress Cycles',
        body: [
          'Most standard corporate P&L projections approximate cash flow by starting from Net Income and adjusting for non-cash depreciation and working capital changes. While suitable for multi-year strategic plans, this indirect approach fails completely when managing weekly cash runway.',
          'A business can report positive GAAP net income while encountering a severe cash crunch due to customer payment delays, inventory prepayments, or semi-annual software renewals hitting simultaneously.'
        ]
      },
      {
        heading: 'The Mechanics of the Direct Receipts Model',
        body: [
          'A robust 13-week forecast begins with granular daily billing projections mapped to probability-weighted collection windows. Instead of assuming invoices are paid on Day 30, we model historical payment lag distributions for each customer tier.'
        ],
        code: {
          filename: 'dso_decay_model.py',
          code: `def calculate_projected_cash_receipts(invoices_df, historical_lag_weights):
    """
    Project weekly cash collections using historical payment decay curves.
    """
    invoices_df['due_date'] = pd.to_datetime(invoices_df['invoice_date']) + pd.to_timedelta(invoices_df['terms_days'], unit='D')
    
    # Apply historical probability weights for payment on-time vs 15/30/45 days late
    projected_receipts = []
    for _, inv in invoices_df.iterrows():
        amount = inv['amount']
        for week_offset, prob in historical_lag_weights.items():
            projected_receipts.append({
                'expected_week': inv['due_date'] + pd.DateOffset(weeks=week_offset),
                'projected_amount': amount * prob,
                'customer_id': inv['customer_id']
            })
    return pd.DataFrame(projected_receipts)`
        }
      },
      {
        heading: 'Establishing Covenant Buffer Guardrails',
        body: [
          'Credit facilities and debt agreements often enforce minimum liquidity thresholds (e.g., maintaining at least $3M in unencumbered cash at all times).',
          'In our models, we embed an automated warning trigger that flags any projected week where buffer margins drop within 20% of covenant boundaries, granting executive leadership 6 to 8 weeks of lead time to adjust payables or draw on revolver facilities.'
        ],
        quote: 'In corporate FP&A, liquidity is not merely a financial metric—it is the oxygen of the enterprise. An analyst who can accurately predict cash peaks and troughs 8 weeks ahead protects the entire organization.'
      }
    ]
  },
  {
    id: 'eliminating-spreadsheet-hell-python-sql',
    slug: 'eliminating-month-end-spreadsheet-hell-python-sql',
    title: 'Eliminating Month-End Spreadsheet Hell: Automating Variance Analysis with Python & SQL',
    excerpt: 'Moving beyond fragile multi-gigabyte workbooks by pairing SQL data warehouse views with automated Python variance attribution pipelines.',
    category: 'Financial Automation',
    date: 'September 2026',
    readTime: '6 min read',
    tags: ['Python', 'SQL', 'FP&A Automation', 'ETL', 'Process Improvement'],
    featured: false,
    keyTakeaways: [
      'Manual VLOOKUP and copy-paste workflows across 15 departmental sheets introduce human error and waste valuable strategic analysis time.',
      'SQL window functions and CTEs provide instantaneous year-over-year and budget-vs-actual variance calculations over millions of general ledger records.',
      'Automated Python scripts can format and email departmental managers their specific variance scorecards within minutes of closing books.'
    ],
    sections: [
      {
        heading: 'The Cost of Fragile Spreadsheets',
        body: [
          'At many growing enterprises, the FP&A team spends 80% of its time during month-end close performing data janitorial work: pulling CSV exports from NetSuite or QuickBooks, cleaning department tags, fixing broken Excel links, and double-checking SUM formulas.',
          'This leaves barely 20% of the team’s bandwidth for high-value strategic inquiry: understanding why marketing CAC escalated or why customer support software costs doubled.'
        ]
      },
      {
        heading: 'Automating the Variance Engine',
        body: [
          'By standardizing general ledger cost center mappings in a clean PostgreSQL data model, budget-vs-actuals comparisons can be calculated continuously rather than once a month.'
        ],
        code: {
          filename: 'variance_attribution_cte.sql',
          code: `WITH Actuals AS (
    SELECT cost_center, account_code, SUM(amount) AS act_amount
    FROM gl_journal_entries
    WHERE fiscal_period = '2026-M09' AND status = 'POSTED'
    GROUP BY 1, 2
),
Budget AS (
    SELECT cost_center, account_code, SUM(amount) AS bud_amount
    FROM annual_operating_budget
    WHERE fiscal_period = '2026-M09'
    GROUP BY 1, 2
)
SELECT 
    COALESCE(a.cost_center, b.cost_center) AS cost_center,
    COALESCE(a.account_code, b.account_code) AS account_code,
    b.bud_amount,
    a.act_amount,
    (a.act_amount - b.bud_amount) AS variance_delta,
    CASE 
        WHEN b.bud_amount = 0 AND a.act_amount > 0 THEN 'UNBUDGETED_EXPENSE'
        WHEN ABS(a.act_amount - b.bud_amount) > 10000 THEN 'ACTION_REQUIRED'
        ELSE 'NORMAL'
    END AS variance_status
FROM Actuals a
FULL OUTER JOIN Budget b ON a.cost_center = b.cost_center AND a.account_code = b.account_code;`
        }
      }
    ]
  },
  {
    id: 'beyond-topline-arr-unit-economics',
    slug: 'beyond-topline-arr-dissecting-true-contribution-margins',
    title: 'Beyond Topline ARR: Dissecting True Contribution Margins and Net Revenue Retention',
    excerpt: 'Why headline revenue growth can be deceptive without analyzing fully loaded customer acquisition costs, hosting COGS, and cohort expansion curves.',
    category: 'Corporate Strategy',
    date: 'August 2026',
    readTime: '8 min read',
    tags: ['Unit Economics', 'SaaS Metrics', 'Contribution Margin', 'CAC / LTV', 'FP&A'],
    featured: false,
    keyTakeaways: [
      'Gross margins often mask severe contract-level unprofitability when custom onboarding and hosting allocations are omitted.',
      'Net Revenue Retention (NRR) above 115% creates compounding enterprise value even when new customer acquisition slows.',
      'Fully loaded CAC must incorporate sales commissions, digital marketing spend, and customer success onboarding headcount.'
    ],
    sections: [
      {
        heading: 'The Illusion of Topline Velocity',
        body: [
          'In corporate finance, growing Annual Recurring Revenue (ARR) by 40% is celebrated, but if gross margins deteriorate from 78% to 62% due to uncontrolled infrastructure overhead and high customer churn, the enterprise is actually destroying shareholder value.'
        ]
      }
    ]
  },
  {
    id: 'scenario-planning-monte-carlo-fpa',
    slug: 'scenario-planning-under-uncertainty-monte-carlo-fpa',
    title: 'Scenario Planning Under Uncertainty: Integrating Monte Carlo Simulations into Corporate FP&A',
    excerpt: 'Replacing single-point financial forecasts with probabilistic ranges to help executive boards evaluate upside opportunities and downside risk.',
    category: 'Forecasting & FP&A',
    date: 'June 2026',
    readTime: '9 min read',
    tags: ['Monte Carlo', 'Forecasting', 'Probability Modeling', 'Board Decks', 'Risk'],
    featured: false,
    keyTakeaways: [
      'Single-number forecasts provide false precision and leave leadership unprepared for volatility.',
      'Monte Carlo simulations allow modeling interrelated variables (inflation, interest rates, customer conversion rates) simultaneously.',
      'Presenting 10th (Downside), 50th (Base), and 90th (Upside) percentile scenarios empowers executives to evaluate risk-adjusted capital allocations.'
    ],
    sections: [
      {
        heading: 'The Trap of Single-Point Precision',
        body: [
          'When an analyst presents a quarterly forecast stating "Revenue will be exactly $12,450,000", they are setting up leadership for disappointment. Financial forecasting is inherently probabilistic.'
        ]
      }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    period: '2023 — Present',
    role: 'Financial Planning Analyst',
    company: 'Enterprise Corporate Finance & Advisory',
    location: 'San Francisco, CA (Hybrid)',
    summary: 'Directing consolidated multi-entity operating budgets, rolling revenue projections, and automated data variance pipelines for executive leadership.',
    achievements: [
      'Architected comprehensive 3-statement financial model and rolling 13-week cash flow system covering $120M+ in annual operating spend.',
      'Engineered automated Python and SQL variance reporting pipelines, reducing monthly close reporting turnaround time from 5 days to 4 hours.',
      'Collaborated directly with CFO and VP of Finance to prepare quarterly board presentations, investor reporting packs, and scenario analysis.',
      'Identified and resolved $1.8M in annual vendor contract redundancies through cross-departmental cost allocation audits.'
    ],
    technologies: ['Financial Modeling (3-Statement)', 'Budget Variance (BvA)', 'SQL', 'Python (pandas)', 'PowerBI', 'Excel / VBA', 'Cash Flow Management']
  },
  {
    period: '2021 — 2023',
    role: 'Financial Analyst — FP&A & Analytics',
    company: 'Strategic Financial Services',
    location: 'Austin, TX (Remote)',
    summary: 'Led budget-vs-actuals variance analysis, departmental OPEX modeling, and pricing sensitivity frameworks for business unit leaders.',
    achievements: [
      'Constructed customer cohort revenue retention models predicting quarterly ARR and Net Revenue Retention (NRR) with 98.8% accuracy.',
      'Standardized capital expenditure (CAPEX) appraisal models utilizing NPV, IRR, and payback calculations for strategic business investments.',
      'Automated recurring departmental budget tracking workbooks, saving over 40 analyst hours monthly.'
    ],
    technologies: ['Corporate FP&A', 'DCF Valuation', 'CAPEX Budgeting', 'SQL', 'Tableau', 'Advanced Excel Modeling']
  },
  {
    period: '2019 — 2021',
    role: 'Junior Financial Analyst',
    company: 'Capital Planning Group',
    location: 'Denver, CO',
    summary: 'Supported corporate treasury reconciliations, monthly journal entries, departmental variance tracking, and executive slide deck creation.',
    achievements: [
      'Assisted in building annual operating budgets and monthly headcounts across 8 functional cost centers.',
      'Designed automated variance dashboards in PowerBI, replacing manual static PowerPoint chart updates.'
    ],
    technologies: ['Financial Reporting', 'GAAP Accounting', 'Variance Analysis', 'Excel Modeling', 'PowerBI']
  }
];

export const skillCategories = [
  {
    name: 'Corporate FP&A & Financial Modeling',
    skills: [
      '3-Statement Financial Modeling',
      'Budget vs. Actuals (BvA) Variance Analysis',
      'Rolling Multi-Scenario Forecasting',
      '13-Week Cash Flow & Liquidity Management',
      'DCF & Valuation Modeling',
      'CAPEX / OPEX Capital Budgeting',
      'Working Capital Optimization'
    ]
  },
  {
    name: 'Financial Analytics & Automation',
    skills: [
      'SQL (PostgreSQL, Snowflake, BigQuery Queries)',
      'Python for Finance (pandas, numpy, scipy)',
      'Advanced Excel (Index/Match, Dynamic Arrays, Financial Functions)',
      'VBA & Spreadsheet Automation',
      'Automated ETL Financial Pipelines',
      'Monte Carlo Risk Simulations'
    ]
  },
  {
    name: 'Strategic Metrics & SaaS Finance',
    skills: [
      'Annual Recurring Revenue (ARR / MRR)',
      'Net Revenue Retention (NRR / Gross Retention)',
      'Customer Acquisition Cost (CAC) & LTV Payback',
      'Unit Economics & Contribution Margins',
      'Cohort Analysis & Churn Modeling',
      'Pricing Sensitivity & Break-Even Modeling'
    ]
  },
  {
    name: 'Executive Reporting & Data Visualization',
    skills: [
      'PowerBI Financial Dashboards',
      'Tableau Visualizations & KPI Tracking',
      'Board of Directors Presentation Deck Prep',
      'EBITDA Bridge & Waterfall Visualizations',
      'GAAP Accounting Principles & Audit Defense',
      'ERP Systems (NetSuite, QuickBooks, Workday)'
    ]
  }
];

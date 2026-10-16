export type ProjectCategory = 'All' | 'Financial Modeling' | 'Forecasting & FP&A' | 'Data Automation' | 'Executive Dashboards';

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  summary: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  metrics: ProjectMetric[];
  technologies: string[];
  featured: boolean;
  liveUrl: string;
  repoUrl: string;
  stars?: number;
  themeColor: string;
  diagramStyle: 'forecast' | 'variance' | 'waterfall' | 'liquidity' | 'unit_economics' | 'terminal';
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  sections: {
    heading: string;
    body: string[];
    quote?: string;
    code?: {
      filename: string;
      code: string;
    };
  }[];
  keyTakeaways: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  statusText: string;
  stats: {
    value: string;
    label: string;
    detail: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface ContactMessage {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  budget: string;
  message: string;
}

export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  painPoint: string;
  zigoDoes: string;
  deliverables: string[];
  icon: string;
  active: boolean;
  displayOrder: number;
};

export type PortfolioCase = {
  id: string;
  clientName: string;
  slug: string;
  industry: string;
  logoImage?: string;
  shortDescription: string;
  problem: string;
  goal: string;
  solution: string;
  servicesProvided: string[];
  platformsUsed: string[];
  strategy: string[];
  execution: string[];
  resultsSummary: string;
  metrics: { label: string; value: string }[];
  coverLabel: string;
  galleryImages?: string[];
  videoUrls?: string[];
  resultImageUrls?: string[];
  websiteLinks?: string[];
  testimonial: string;
  published: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  skills: string[];
  instagramUrl?: string;
  linkedinUrl?: string;
  displayOrder: number;
  active: boolean;
};

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string[]>;
};

export type Enquiry = {
  id: string;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  message: string;
  status: string;
  createdAt: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  author: string;
  published: boolean;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
};

export type AnalyticsVisit = {
  id: string;
  visitorId: string;
  path: string;
  title: string;
  referrer: string;
  userAgent: string;
  createdAt: string;
};

export type PageViewSummary = {
  path: string;
  title: string;
  views: number;
  lastVisitedAt: string;
};

export type AnalyticsSummary = {
  totalPageViews: number;
  uniqueVisitors: number;
  pageViews: PageViewSummary[];
  recentVisits: AnalyticsVisit[];
  visitorIds: string[];
};

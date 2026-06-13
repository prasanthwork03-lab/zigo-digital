import type { BlogPost, PortfolioCase, Service, TeamMember } from "@/lib/types";

export const site = {
  name: "Zigo Digital",
  tagline: "From Content to Conversion - We Build Complete Digital Growth Systems.",
  phone: "7373507257",
  email: "zigodigitalinfo@gmail.com",
  address: "Chinnalapatti, Dindigul",
  logo: "/assets/zigo-logo.png",
  founderImage: "/assets/founder-prasanth.png",
  founderName: "Prasanth M",
  founderRole: "Founder, Zigo Digital",
  description:
    "Zigo Digital is an all-in-one digital marketing agency offering Meta Ads, Google Ads, lead generation, website development, automation, creative design, SEO, video editing and sales funnel support.",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/contact" },
];

export const toolItems = [
  {
    label: "SEO Audit Tool",
    href: "/tools/seo-audit",
    description: "Analyze a website and generate a branded SEO action report.",
    status: "Live",
  },
  {
    label: "Lead Funnel Checker",
    href: "/tools",
    description: "Coming soon: find missing steps between traffic and enquiry.",
    status: "Soon",
  },
  {
    label: "Content Idea Generator",
    href: "/tools",
    description: "Coming soon: plan posts, reels, and blog topics for your industry.",
    status: "Soon",
  },
];

export const floatingServices = [
  "Meta Ads",
  "Google Ads",
  "Lead Generation",
  "Website Development",
  "Automation",
  "Creative Design",
  "Video Editing",
  "SEO",
];

export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "Multi", label: "Business Domains" },
  { value: "End-to-End", label: "Digital Growth" },
  { value: "ROI", label: "Focused Strategy" },
];

export const clientLogos = [
  {
    name: "SHEVAROYS",
    src: "/assets/client-logos/shevaroys.png",
  },
  {
    name: "Guna's Craft",
    src: "/assets/client-logos/gunas-craft.jpg",
  },
  {
    name: "Waymax Global",
    src: "/assets/client-logos/waymax-global.png",
  },
  {
    name: "O 2 Y Hair Fixing",
    src: "/assets/client-logos/o2y.png",
  },
  {
    name: "Taras Food Park",
    src: "/assets/client-logos/taras-food-park.jpg",
  },
  {
    name: "Hear For Years",
    src: "/assets/client-logos/hear-for-years.png",
  },
];

export const services: Service[] = [
  {
    id: "meta-ads",
    title: "Meta Ads & Lead Generation",
    slug: "meta-ads-lead-generation",
    shortDescription:
      "Targeted Meta campaigns built for quality enquiries, calls, and follow-up ready leads.",
    painPoint: "Random boosting spends money without building a predictable lead pipeline.",
    zigoDoes:
      "We plan audience segments, offers, creatives, landing flows, and lead tracking so every campaign has a conversion path.",
    deliverables: [
      "Campaign strategy",
      "Audience setup",
      "Ad creatives",
      "Lead forms or landing pages",
      "Weekly optimization",
    ],
    icon: "Megaphone",
    active: true,
    displayOrder: 1,
  },
  {
    id: "google-ads",
    title: "Google Ads",
    slug: "google-ads",
    shortDescription:
      "Search campaigns that reach buyers when they are already looking for your service.",
    painPoint: "High-intent searches are expensive when keywords, match types, and tracking are loose.",
    zigoDoes:
      "We structure search campaigns around service intent, call actions, enquiry forms, and measurable conversions.",
    deliverables: [
      "Keyword planning",
      "Search campaign setup",
      "Conversion tracking",
      "Ad copy testing",
      "Performance reporting",
    ],
    icon: "Search",
    active: true,
    displayOrder: 2,
  },
  {
    id: "website-development",
    title: "Website Development",
    slug: "website-development",
    shortDescription:
      "Modern, mobile-first, SEO-ready websites that make your business easier to trust and contact.",
    painPoint: "A weak website turns paid traffic into missed trust, missed enquiries, and missed sales.",
    zigoDoes:
      "We build premium pages, conversion sections, contact paths, and technical foundations ready for SEO and ads.",
    deliverables: [
      "Responsive website",
      "Landing pages",
      "SEO structure",
      "Contact integrations",
      "Speed-focused build",
    ],
    icon: "MonitorSmartphone",
    active: true,
    displayOrder: 3,
  },
  {
    id: "business-automation",
    title: "Business Automation",
    slug: "business-automation",
    shortDescription:
      "Follow-up systems for enquiries, lead tracking, WhatsApp flows, CRM, and daily workflows.",
    painPoint: "Leads go cold when follow-up is slow, scattered, or dependent on memory.",
    zigoDoes:
      "We connect enquiry sources with simple automation so your team can respond faster and track every opportunity.",
    deliverables: [
      "Lead routing",
      "WhatsApp follow-ups",
      "CRM setup",
      "Workflow automation",
      "Status tracking",
    ],
    icon: "Workflow",
    active: true,
    displayOrder: 4,
  },
  {
    id: "video-production",
    title: "Video Shooting & Editing",
    slug: "video-shooting-editing",
    shortDescription:
      "Brand videos, reels, ad videos, and promotional content shaped for attention and trust.",
    painPoint: "Businesses often have good offers but weak visuals that fail to stop the scroll.",
    zigoDoes:
      "We plan concepts, shoot brand-focused footage, edit for platform behavior, and prepare creative variations.",
    deliverables: [
      "Shoot planning",
      "Reels",
      "Ad videos",
      "Promotional edits",
      "Format exports",
    ],
    icon: "Video",
    active: true,
    displayOrder: 5,
  },
  {
    id: "creative-design",
    title: "Creative Design",
    slug: "creative-design",
    shortDescription:
      "Posters, ad creatives, social media designs, banners, brand kits, and campaign visuals.",
    painPoint: "Inconsistent design makes even strong businesses feel unprepared online.",
    zigoDoes:
      "We create polished design systems and campaign assets that make your brand look clear, premium, and consistent.",
    deliverables: [
      "Poster design",
      "Ad creatives",
      "Social media templates",
      "Banners",
      "Brand kit support",
    ],
    icon: "Palette",
    active: true,
    displayOrder: 6,
  },
  {
    id: "seo",
    title: "SEO",
    slug: "seo",
    shortDescription:
      "Website and content optimization for better organic visibility and long-term presence.",
    painPoint: "Paid ads work faster, but businesses lose long-term discovery when SEO is ignored.",
    zigoDoes:
      "We improve page structure, content relevance, search visibility, and local discovery signals.",
    deliverables: [
      "Keyword mapping",
      "On-page SEO",
      "Content planning",
      "Technical fixes",
      "Local visibility support",
    ],
    icon: "LineChart",
    active: true,
    displayOrder: 7,
  },
  {
    id: "social-media",
    title: "Social Media Management",
    slug: "social-media-management",
    shortDescription:
      "Content planning and publishing systems that keep your brand visible, useful, and consistent.",
    painPoint: "Posting without a content plan creates noise but not audience trust.",
    zigoDoes:
      "We shape monthly content themes, creatives, captions, reels, and platform-ready posting calendars.",
    deliverables: [
      "Monthly planner",
      "Caption strategy",
      "Creative direction",
      "Content calendar",
      "Performance review",
    ],
    icon: "Share2",
    active: true,
    displayOrder: 8,
  },
  {
    id: "sales-funnel",
    title: "Sales Funnel & Follow-Up System",
    slug: "sales-funnel-follow-up",
    shortDescription:
      "Landing pages, WhatsApp flows, and communication systems that convert leads into customers.",
    painPoint: "Leads do not become revenue unless the journey after the enquiry is clear.",
    zigoDoes:
      "We map the path from ad click to enquiry to follow-up so sales conversations happen with better timing and context.",
    deliverables: [
      "Landing page flow",
      "Lead magnets",
      "WhatsApp scripts",
      "Follow-up sequences",
      "Sales message support",
    ],
    icon: "Route",
    active: true,
    displayOrder: 9,
  },
];

export const portfolioCases: PortfolioCase[] = [
  {
    id: "o-2-y-hair-fixing",
    clientName: "O 2 Y Hair Fixing",
    slug: "o-2-y-hair-fixing",
    industry: "Hair Fixing / Hair Replacement / Men's Grooming Service",
    logoImage: "/assets/client-logos/o2y.png",
    shortDescription:
      "A trust-based digital funnel for hair fixing enquiries, transformation content, Meta Ads, and WhatsApp consultations.",
    problem:
      "The brand had a strong service offering, but hair fixing is a high-trust service. Customers had fears about natural look, privacy, safety, duration, cost, and whether others would notice.",
    goal:
      "Build trust through real transformation content, educate men facing hair loss, and generate quality call and WhatsApp enquiries.",
    solution:
      "We managed the brand's social media, created transformation-led content, shot and edited videos, and ran Meta Ads focused on enquiry generation.",
    servicesProvided: [
      "Social Media Management",
      "Meta Ads",
      "Lead Generation",
      "Video Shooting",
      "Video Editing",
      "Content Creation",
    ],
    platformsUsed: ["Instagram", "Facebook", "Meta Ads Manager", "WhatsApp"],
    strategy: [
      "Used a trust-based funnel: show the problem, show transformation, build confidence, push to WhatsApp, and convert into consultation.",
      "Created content around natural look, privacy, cost clarity, safety, duration, and confidence after hair fixing.",
      "Planned Meta campaigns for hair loss pain points, transformation proof, local targeting, and retargeting interested users.",
      "Moved interested viewers from reels and ads into call or WhatsApp enquiry conversations.",
    ],
    execution: [
      "Created Instagram and Facebook content plans with reels, captions, hashtags, stories, and enquiry-focused CTA posts.",
      "Shot before-after transformation videos, consultation clips, process visuals, studio shots, and close-up hair patch content.",
      "Edited transformation reels with hook-based overlays, fast cuts, premium grooming visuals, CTA endings, and WhatsApp callouts.",
      "Built lead generation campaigns for serious enquiries instead of only views or likes.",
    ],
    resultsSummary:
      "A stronger trust-building content system and enquiry-focused funnel for men actively looking for hair fixing solutions.",
    metrics: [
      { label: "Trust Content", value: "Built" },
      { label: "WhatsApp Funnel", value: "Active" },
      { label: "Lead Quality", value: "Focused" },
    ],
    coverLabel: "Hair Fixing Lead Funnel",
    testimonial:
      "Hair loss is not the end of confidence. The right hair fixing solution can bring back your natural look.",
    published: true,
  },
  {
    id: "grace-speech-and-hearing",
    clientName: "Grace Speech and Hearing",
    slug: "grace-speech-and-hearing",
    industry: "Speech & Hearing Clinic / Hearing Aid Centre",
    logoImage: "/assets/client-logos/hear-for-years.png",
    shortDescription:
      "Awareness-led healthcare marketing for hearing tests, hearing aids, speech therapy, Meta Ads, and local enquiries.",
    problem:
      "The clinic had valuable services but needed stronger online visibility and a proper enquiry system. Many families delayed action because they were confused, worried, or unaware of early signs.",
    goal:
      "Create awareness, build trust, educate families, and generate quality enquiries for hearing aids, hearing tests, speech therapy, and consultations.",
    solution:
      "We created an awareness-to-enquiry funnel using educational posters, Meta Ads, social media management, and call/WhatsApp CTA content.",
    servicesProvided: [
      "Lead Generation",
      "Poster Creation",
      "Meta Ads",
      "Social Media Management",
    ],
    platformsUsed: ["Instagram", "Facebook", "Meta Ads Manager", "WhatsApp", "Phone Calls"],
    strategy: [
      "Built an awareness-to-enquiry funnel: create awareness, build trust, explain the solution, push to call or WhatsApp, and convert into consultation.",
      "Targeted parents, children, adults, senior citizens, and nearby families who may need hearing or speech support.",
      "Created content that encouraged early consultation for hearing difficulty, speech delay, unclear speech, and poor response to sound.",
      "Focused ad campaigns on hearing aid, hearing test, speech therapy, and child speech delay enquiries.",
    ],
    execution: [
      "Designed hearing aid awareness posters, speech delay creatives, hearing test promotions, senior citizen hearing care content, and CTA posters.",
      "Managed Instagram and Facebook planning, captions, hashtags, stories, service posts, and page optimization.",
      "Ran Meta Ads for local awareness, WhatsApp enquiries, parent-focused targeting, and hearing test campaigns.",
      "Structured enquiry flow from ad or poster to call/WhatsApp, problem understanding, consultation booking, and service conversion.",
    ],
    resultsSummary:
      "A clearer healthcare digital presence with education-focused content and a local lead generation path for consultations.",
    metrics: [
      { label: "Local Reach", value: "Focused" },
      { label: "Awareness Content", value: "Created" },
      { label: "Consultation Funnel", value: "Built" },
    ],
    coverLabel: "Healthcare Awareness Funnel",
    testimonial:
      "Do not ignore hearing or speech problems. Early consultation can improve communication and confidence.",
    published: true,
  },
  {
    id: "gunas-craft",
    clientName: "Guna's Craft",
    slug: "gunas-craft",
    industry: "Handmade Gifts / Paper Quilling Art / Corporate Gifting Brand",
    logoImage: "/assets/client-logos/gunas-craft.jpg",
    shortDescription:
      "Sales-focused storytelling for handmade gifts, paper quilling art, social impact, Meta Ads, and product enquiry generation.",
    problem:
      "The brand had beautiful handmade products but needed stronger digital visibility and a proper sales system. Customers needed to understand the effort, patience, creativity, and purpose behind every product.",
    goal:
      "Build emotional connection, improve premium product presentation, and generate enquiries for customized gifts, wall art, corporate gifting, and bulk orders.",
    solution:
      "We supported the brand with sales-focused marketing, Meta Ads, social media management, content creation, video shooting, video editing, and brand promotion.",
    servicesProvided: [
      "Sales-Focused Marketing",
      "Social Media Management",
      "Content Creation",
      "Video Shooting",
      "Video Editing",
      "Meta Ads",
    ],
    platformsUsed: ["Instagram", "Facebook", "Meta Ads Manager", "WhatsApp", "DM Enquiries"],
    strategy: [
      "Used an emotion-to-sales funnel: show handmade beauty, tell the story, build emotional value, create trust, generate enquiry, and convert into sales.",
      "Positioned the products as meaningful handmade creations rather than normal gift items.",
      "Built content around artisan effort, paper quilling detail, customized gifts, corporate gifting, wall art, and social impact.",
      "Planned Meta Ads for product awareness, festival gifting, corporate gifting, DM enquiries, and retargeting.",
    ],
    execution: [
      "Managed Instagram and Facebook content planning, reels, captions, hashtags, stories, product highlights, and enquiry CTAs.",
      "Shot product close-ups, handmade process videos, wall art showcases, packaging shots, behind-the-scenes visuals, and lifestyle product content.",
      "Edited product reveal reels, craft process edits, smooth transitions, emotional story videos, premium product edits, and ad creatives.",
      "Created sales-focused campaigns for customized gifts, corporate gifts, bulk orders, festivals, weddings, and anniversaries.",
    ],
    resultsSummary:
      "A stronger emotional brand story and enquiry-focused sales funnel for handmade gifting and corporate order opportunities.",
    metrics: [
      { label: "Product Story", value: "Stronger" },
      { label: "Sales Enquiries", value: "Focused" },
      { label: "Brand Value", value: "Elevated" },
    ],
    coverLabel: "Handmade Gift Sales Funnel",
    testimonial:
      "Not just a gift. A handmade creation with patience, skill, and meaning.",
    published: true,
  },
  {
    id: "taras-food-park",
    clientName: "Taras Food Park",
    slug: "taras-food-park",
    industry: "Food Park / Multicuisine Restaurant Group / Cafe & Restaurant Brand",
    logoImage: "/assets/client-logos/taras-food-park.jpg",
    shortDescription:
      "A food destination marketing system for Yercaud tourists, families, food lovers, Meta Ads, reels, and footfall growth.",
    problem:
      "Taras Food Park had multiple restaurant brands and strong food offerings, but the digital presentation needed to be more structured, attractive, and clear for tourists and local customers.",
    goal:
      "Create awareness for all food options under one destination, improve visibility, promote location, and increase footfall, enquiries, and food orders.",
    solution:
      "We provided complete digital marketing support through social media management, Meta Ads, video shooting, video editing, content creation, branding content, and online promotion.",
    servicesProvided: [
      "Social Media Management",
      "Meta Ads",
      "Video Shooting",
      "Video Editing",
      "Content Creation",
      "Digital Marketing Support",
    ],
    platformsUsed: ["Instagram", "Facebook", "Meta Ads Manager", "Location-Based Promotion"],
    strategy: [
      "Used a food destination funnel: show food variety, create craving, build trust, promote location, and increase footfall.",
      "Positioned Taras Food Park as one place with multiple choices for family, friends, tourists, and local customers in Yercaud.",
      "Created content around pure veg, cafe, Andhra food, grill, BBQ, shawarma, biryani, meals, fried rice, and multicuisine dining.",
      "Planned location-based Meta Ads for tourists, families, food lovers, weekend visitors, and local audiences.",
    ],
    execution: [
      "Managed Instagram and Facebook content planning, food reels, captions, hashtags, stories, menu highlights, offers, and festival posts.",
      "Shot food close-ups, restaurant ambience, cafe visuals, grill and BBQ visuals, biryani and meals shots, family dining, service, location, and preparation videos.",
      "Edited food reels with fast cuts, menu highlights, text overlays, trending audio, food color correction, offer announcements, and location CTA endings.",
      "Built promotional content for each sub-brand including Water Front Multicuisine Restaurant, The Lake Cafe, Annalakshmi Pure Veg Restaurant, Andhra Spice, The Grill Box, and Rajavirunthu Grill Box.",
    ],
    resultsSummary:
      "A clearer digital identity for a multi-brand food park and a stronger content system to attract Yercaud tourists, families, and food lovers.",
    metrics: [
      { label: "Food Brands", value: "Unified" },
      { label: "Tourist Reach", value: "Targeted" },
      { label: "Footfall Funnel", value: "Built" },
    ],
    coverLabel: "Food Park Footfall System",
    testimonial:
      "One place. Multiple food choices. Perfect spot for family, friends, and tourists in Yercaud.",
    published: true,
  },
  {
    id: "shevaroys",
    clientName: "SHEVAROYS",
    slug: "shevaroys",
    industry: "Hotel Management College / Hospitality Education Institution",
    logoImage: "/assets/client-logos/shevaroys.png",
    shortDescription:
      "An admission enquiry funnel for a hospitality education brand using Meta Ads, WhatsApp marketing, shooting, editing, and social media.",
    problem:
      "SHEVAROYS had strong education value and hospitality training, but needed a powerful digital presence to reach students and parents who require trust before choosing a course.",
    goal:
      "Increase admission enquiries, improve visibility, build trust among parents and students, and generate quality leads for hotel management courses.",
    solution:
      "We delivered end-to-end digital marketing with social media, Meta Ads, WhatsApp marketing, shooting, editing, and lead generation campaigns.",
    servicesProvided: [
      "End-to-End Digital Marketing",
      "Video Shooting",
      "Video Editing",
      "Meta Ads Campaigns",
      "Lead Generation",
      "WhatsApp Marketing",
      "Social Media Management",
    ],
    platformsUsed: ["Instagram", "Facebook", "Meta Ads Manager", "WhatsApp", "Admission Counselling"],
    strategy: [
      "Built an admission funnel: ad or reel, WhatsApp click, course enquiry, counselling, and admission follow-up.",
      "Created content to answer parent and student doubts about course value, job opportunities, safety, placement support, credibility, fees, hostel facilities, and future scope.",
      "Targeted students after 10th and 12th, diploma seekers, parents, and students looking for job-oriented hospitality courses.",
      "Used WhatsApp as the main conversion channel for course details, brochure sharing, reminders, and follow-up.",
    ],
    execution: [
      "Planned admission campaigns, content calendars, creative direction, lead generation strategy, and WhatsApp enquiry flow.",
      "Shot campus videos, practical training sessions, cooking and food production classes, student activities, classroom learning, faculty interaction, ambience, and admission promos.",
      "Edited reels, admission videos, course highlights, student life content, text overlay hooks, CTA endings, and WhatsApp callouts.",
      "Managed Instagram and Facebook posts, captions, hashtags, admission-focused creatives, career awareness content, event posts, and enquiry CTAs.",
    ],
    resultsSummary:
      "A professional education marketing system that improved admission communication and moved interested students into WhatsApp counselling.",
    metrics: [
      { label: "Admission Funnel", value: "Built" },
      { label: "Parent Trust", value: "Supported" },
      { label: "Student Leads", value: "Focused" },
    ],
    coverLabel: "Hospitality Admission Funnel",
    testimonial:
      "A clear digital path from course awareness to WhatsApp enquiry and admission counselling.",
    published: true,
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "prasanth-m",
    name: "Prasanth M",
    role: "Founder, Zigo Digital",
    imageUrl: site.founderImage,
    bio:
      "Prasanth M is the Founder of Zigo Digital, leading the agency with practical digital marketing experience across performance marketing, lead generation, content planning, website strategy, automation, and client communication. He founded Zigo Digital to help businesses build clear digital growth systems that attract the right audience, generate quality enquiries, and convert attention into sales.",
    skills: [
      "Performance Marketing",
      "Lead Generation",
      "Digital Strategy",
      "Content Planning",
      "Website Strategy",
      "Business Automation",
      "Client Communication",
      "Sales Funnel Planning",
    ],
    displayOrder: 1,
    active: true,
  },
  {
    id: "surya-m",
    name: "Surya M",
    role: "Co Founder & CEO, Zigo Digital",
    imageUrl:
      "https://res.cloudinary.com/domt6qtye/image/upload/v1781249303/WhatsApp_Image_2026-06-12_at_12.56.36_PM_ra1rqj.jpg",
    bio:
      "Surya is the CEO, Project Manager, and Graphic Designer at Zigo Digital, leading creative direction, client coordination, and project execution. With a strong eye for design and branding, he manages end-to-end digital projects, ensuring every design, campaign, and creative output matches the client's business goals. His role combines leadership, strategy, and creativity to deliver high-quality digital solutions for brands.",
    skills: [
      "Team Handling",
      "Project Management",
      "Client Coordination",
      "Graphic Designing",
      "Branding",
      "Creative Direction",
      "Social Media Design",
      "Content Planning",
      "Problem Solving",
      "Time Management",
      "Leadership",
      "Communication",
    ],
    displayOrder: 2,
    active: true,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "digital-growth-systems",
    title: "What I Am Learning About Digital Growth Systems",
    slug: "digital-growth-systems",
    excerpt:
      "A practical note from Prasanth M on connecting content, ads, websites, automation, and follow-up into one clear growth path.",
    content: `## Quick answer
Digital marketing works better when every channel has a clear job. Content builds trust, ads create demand, websites explain the offer, and follow-up converts enquiries into sales.

## What I am learning
Many businesses do not need only posting or only ads. They need a complete digital growth system where every click has a next step.

- Content should answer doubts before the customer asks.
- Ads should bring the right enquiry, not just more views.
- Websites should make the offer clear and easy to trust.
- WhatsApp, calls, and automation should help the team follow up faster.
- SEO and answer-focused content should make the brand discoverable for long-term searches.

## How this applies at Zigo Digital
At Zigo Digital, I am learning to connect strategy, creative, performance marketing, AI tools, and local business understanding into one practical system.

See our [services](/services), explore client [portfolio case studies](/portfolio), or contact us for a [free consultation](/contact).

For search basics, I also follow official resources like [Google Search Central](https://developers.google.com/search).`,
    category: "Marketing Learning",
    tags: ["Digital Marketing", "Lead Generation", "AI Tools", "SEO"],
    coverImage: "/assets/digital-marketing-hero.png",
    author: "Prasanth M",
    published: true,
    featured: true,
    publishedAt: "2026-06-12T00:00:00.000Z",
    updatedAt: "2026-06-12T00:00:00.000Z",
    seoTitle: "What I Am Learning About Digital Growth Systems",
    seoDescription:
      "Prasanth M shares practical learning about content, ads, websites, automation, AI tools, SEO, and lead generation for business growth.",
  },
];

export const processSteps = [
  {
    title: "Discover",
    text: "We understand your business, offer, audience, current channels, and sales process.",
  },
  {
    title: "Design",
    text: "We plan the creative, website, ad, automation, and follow-up system around your growth goal.",
  },
  {
    title: "Launch",
    text: "We publish campaigns, pages, content, and conversion paths with tracking in place.",
  },
  {
    title: "Optimize",
    text: "We review performance, sharpen messaging, and improve the system week by week.",
  },
];

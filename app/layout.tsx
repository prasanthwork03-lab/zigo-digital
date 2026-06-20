import type { Metadata } from "next";
import { VisitTracker } from "@/components/visit-tracker";
import { site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Zigo Digital | Digital Marketing Agency",
    template: "%s | Zigo Digital",
  },
  description: site.description,
  keywords: [
    "Zigo Digital",
    "digital marketing agency",
    "Meta Ads",
    "Google Ads",
    "lead generation",
    "website development",
    "business automation",
    "SEO",
    "video editing",
  ],
  openGraph: {
    title: "Zigo Digital | Digital Marketing Agency",
    description: site.description,
    url: absoluteUrl("/"),
    siteName: "Zigo Digital",
    images: [
      {
        url: "/assets/zigo-logo.png",
        width: 1080,
        height: 1080,
        alt: "Zigo Digital logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zigo Digital | Digital Marketing Agency",
    description: site.description,
    images: ["/assets/zigo-logo.png"],
  },
  alternates: {
    canonical: absoluteUrl("/"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-[#fbfdff] text-[#16202a] antialiased">
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}

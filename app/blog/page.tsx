import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, SearchCheck } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getBlogPosts } from "@/lib/cms";
import { site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read Zigo Digital blog posts by Prasanth M about digital marketing, lead generation, SEO, AI tools, creative strategy, and business growth systems.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: "Zigo Digital Blog",
    description:
      "Practical learning notes on digital marketing, SEO, AI tools, content, ads, websites, and growth systems.",
    url: absoluteUrl("/blog"),
    type: "website",
    images: [site.logo],
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const publishedPosts = blogPosts
    .filter((item) => item.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zigo Digital Blog",
    description: metadata.description,
    url: absoluteUrl("/blog"),
    mainEntity: publishedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      author: {
        "@type": "Person",
        name: post.author,
      },
    })),
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Blog"
              title="Practical learning notes from digital marketing work."
              text="Ideas from Prasanth M about what he learns in marketing, AI tools, SEO, lead generation, creative strategy, and business growth systems."
              align="center"
              level="h1"
            />
          </Reveal>

          <Stagger className="mt-10 grid gap-6 lg:grid-cols-3">
            {publishedPosts.map((post, index) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b5f9c]/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0b2447]">
                    <Image
                      src={post.coverImage || site.logo}
                      alt={post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      priority={index === 0}
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/60 to-transparent" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-black text-[#0b5f9c]">
                      <SearchCheck className="h-3.5 w-3.5" aria-hidden="true" />
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#667789]">
                      <CalendarDays className="h-4 w-4 text-[#c2932e]" aria-hidden="true" />
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <h2 className="mt-4 text-2xl font-black leading-tight text-[#0b2447]">{post.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-[#526170]">{post.excerpt}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-[#f1f6fb] px-3 py-1 text-xs font-bold text-[#0b5f9c]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0b5f9c]">
                      Read blog
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          {!publishedPosts.length ? (
            <div className="mt-10 rounded-lg border border-[#d9e7f5] bg-white p-8 text-center">
              <p className="font-bold text-[#526170]">No published blog posts yet.</p>
            </div>
          ) : null}
        </div>
      </section>
    </PublicShell>
  );
}

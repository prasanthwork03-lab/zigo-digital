import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Lightbulb, Tag } from "lucide-react";
import { BlogContent } from "@/components/blog-content";
import { PublicShell } from "@/components/public-shell";
import { Reveal } from "@/components/reveal";
import { getBlogPosts } from "@/lib/cms";
import { site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find((item) => item.slug === slug && item.published);

  if (!post) {
    return {
      title: "Blog",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: post.canonicalUrl || absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      images: [post.coverImage || site.logo],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: [post.coverImage || site.logo],
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blogPosts = await getBlogPosts();
  const post = blogPosts.find((item) => item.slug === slug && item.published);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage || site.logo),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(site.logo),
      },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="dark-mesh px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#f2d68b]">
                <Tag className="h-3.5 w-3.5" aria-hidden="true" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#d7e2ee]">{post.excerpt}</p>
            <p className="mt-5 text-sm font-bold text-[#f2d68b]">By {post.author}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/15 bg-white/10 shadow-2xl shadow-[#071827]/30">
              <Image
                src={post.coverImage || site.logo}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/45 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="h-fit rounded-lg border border-[#d9e7f5] bg-[#f8fbff] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#0b5f9c]">
              <Lightbulb className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-black text-[#0b2447]">Quick Answer</h2>
            <p className="mt-3 text-sm leading-7 text-[#526170]">{post.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#0b5f9c]">
                  {tag}
                </span>
              ))}
            </div>
          </aside>

          <div>
            <BlogContent content={post.content} />
            <div className="mt-10 rounded-lg border border-[#d9e7f5] bg-[#f8fbff] p-6">
              <p className="text-sm font-bold uppercase text-[#c2932e]">Next Step</p>
              <h2 className="mt-2 text-2xl font-black text-[#0b2447]">Want to turn this learning into action?</h2>
              <p className="mt-3 text-sm leading-6 text-[#526170]">
                Explore Zigo Digital services or send a message to discuss content, ads, SEO, automation, and lead generation for your business.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]"
                >
                  View Services
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-[#d9e7f5] bg-white px-5 text-sm font-bold text-[#0b5f9c] hover:bg-[#eef6ff]"
                >
                  Contact Zigo Digital
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

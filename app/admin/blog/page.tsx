import Link from "next/link";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { deleteBlogPost } from "@/lib/actions";
import { getBlogPosts } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#c2932e]">Blog</p>
            <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Manage blog posts</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#526170]">
              Write learning notes, marketing ideas, AI tool insights, SEO articles, and industry updates for your website.
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Blog Post
          </Link>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-sm">
          <div className="grid gap-0">
            {blogPosts.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 border-b border-[#edf3f8] p-5 last:border-b-0 lg:grid-cols-[1.2fr_0.6fr_0.5fr_auto] lg:items-center"
              >
                <div>
                  <h2 className="font-black text-[#0b2447]">{item.title}</h2>
                  <p className="mt-1 text-sm text-[#667789]">{item.excerpt}</p>
                  <Link href={`/blog/${item.slug}`} className="mt-2 inline-flex text-xs font-bold text-[#0b5f9c]">
                    View public post
                  </Link>
                </div>
                <p className="text-sm font-semibold text-[#526170]">{item.category}</p>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                    item.published ? "bg-[#f0fbf5] text-[#166534]" : "bg-[#fff7e6] text-[#8a5b00]"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/blog/edit/${item.id}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e7f5] text-[#0b5f9c] hover:bg-[#eaf4ff]"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deleteBlogPost}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffd0c7] text-[#b42318] hover:bg-[#fff4f2]"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
            {!blogPosts.length ? (
              <div className="p-8 text-center">
                <p className="text-sm font-semibold text-[#667789]">No blog posts yet.</p>
                <Link href="/admin/blog/new" className="mt-3 inline-flex text-sm font-bold text-[#0b5f9c]">
                  Write your first blog post
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

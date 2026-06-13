import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostForm } from "@/components/admin/admin-forms";
import { getBlogPosts } from "@/lib/cms";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: PageProps) {
  const { id } = await params;
  const blogPosts = await getBlogPosts();
  const item = blogPosts.find((post) => post.id === id);

  if (!item) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-[#c2932e]">Blog</p>
        <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Edit {item.title}</h1>
        <p className="mt-3 text-sm leading-6 text-[#526170]">
          Update the blog content, SEO metadata, links, publish status, and category.
        </p>
        <div className="mt-8">
          <BlogPostForm item={item} />
        </div>
      </div>
    </AdminShell>
  );
}

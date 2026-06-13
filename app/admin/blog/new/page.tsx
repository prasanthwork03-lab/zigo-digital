import { AdminShell } from "@/components/admin/admin-shell";
import { BlogPostForm } from "@/components/admin/admin-forms";

export default function NewBlogPostPage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-[#c2932e]">Blog</p>
        <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Write new blog post</h1>
        <p className="mt-3 text-sm leading-6 text-[#526170]">
          Start with a direct answer, add useful examples, include internal links, and write for people who are searching for practical marketing help.
        </p>
        <div className="mt-8">
          <BlogPostForm />
        </div>
      </div>
    </AdminShell>
  );
}

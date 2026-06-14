import type { BlogPost, PortfolioCase, Service, TeamMember } from "@/lib/types";
import { saveBlogPost, savePortfolioCase, saveService, saveTeamMember } from "@/lib/actions";

function inputClass() {
  return "h-11 rounded-lg border border-[#d9e7f5] bg-white px-3 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10";
}

function textareaClass() {
  return "min-h-28 rounded-lg border border-[#d9e7f5] bg-white px-3 py-3 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10";
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
      {label}
      {children}
    </label>
  );
}

function dateTimeValue(value?: string) {
  if (!value) {
    return new Date().toISOString().slice(0, 16);
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 16) : date.toISOString().slice(0, 16);
}

function multilineValue(value?: string[]) {
  return value?.join("\n") ?? "";
}

export function PortfolioCaseForm({ item }: { item?: PortfolioCase }) {
  return (
    <form action={savePortfolioCase} className="grid gap-5 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Client name">
          <input name="client_name" defaultValue={item?.clientName} className={inputClass()} />
        </Field>
        <Field label="Slug">
          <input name="slug" defaultValue={item?.slug} className={inputClass()} />
        </Field>
      </div>
      <Field label="Industry">
        <input name="industry" defaultValue={item?.industry} className={inputClass()} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Client logo URL">
          <input
            name="logo_image_url"
            defaultValue={item?.logoImage}
            className={inputClass()}
            placeholder="/assets/client-logos/o2y.png"
          />
        </Field>
        <Field label="Cover label">
          <input name="cover_label" defaultValue={item?.coverLabel} className={inputClass()} />
        </Field>
      </div>
      <Field label="Short description">
        <textarea name="short_description" defaultValue={item?.shortDescription} className={textareaClass()} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Problem">
          <textarea name="problem" defaultValue={item?.problem} className={textareaClass()} />
        </Field>
        <Field label="Goal">
          <textarea name="goal" defaultValue={item?.goal} className={textareaClass()} />
        </Field>
      </div>
      <Field label="Solution">
        <textarea name="solution" defaultValue={item?.solution} className={textareaClass()} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Services provided, comma separated">
          <input name="services_provided" defaultValue={item?.servicesProvided.join(", ")} className={inputClass()} />
        </Field>
        <Field label="Platforms used, comma separated">
          <input name="platforms_used" defaultValue={item?.platformsUsed.join(", ")} className={inputClass()} />
        </Field>
      </div>
      <Field label="Results summary">
        <textarea name="results_summary" defaultValue={item?.resultsSummary} className={textareaClass()} />
      </Field>
      <Field label="Metrics summary">
        <input
          name="metrics_json"
          defaultValue={item?.metrics.map((metric) => `${metric.label}: ${metric.value}`).join(", ")}
          className={inputClass()}
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Strategy points, one per line">
          <textarea name="strategy" defaultValue={item?.strategy.join("\n")} className={textareaClass()} />
        </Field>
        <Field label="Execution points, one per line">
          <textarea name="execution" defaultValue={item?.execution.join("\n")} className={textareaClass()} />
        </Field>
      </div>
      <div className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-4">
        <p className="text-sm font-black uppercase text-[#c2932e]">Proof media</p>
        <p className="mt-2 text-sm leading-6 text-[#526170]">
          Add one URL per line or separate by comma. These show automatically on the public case study page.
        </p>
      </div>
      <Field label="Work image / screenshot URLs">
        <textarea
          name="gallery_images"
          defaultValue={multilineValue(item?.galleryImages)}
          className={textareaClass()}
          placeholder={`https://...\nhttps://...`}
        />
      </Field>
      <Field label="Video embed links, YouTube links, or Vimeo links">
        <textarea
          name="video_urls"
          defaultValue={multilineValue(item?.videoUrls)}
          className={textareaClass()}
          placeholder={`https://www.youtube.com/watch?v=...\nhttps://vimeo.com/...`}
        />
      </Field>
      <Field label="Meta Ads / Google Ads result screenshot URLs">
        <textarea
          name="result_image_urls"
          defaultValue={multilineValue(item?.resultImageUrls)}
          className={textareaClass()}
          placeholder={`https://...\nhttps://...`}
        />
      </Field>
      <Field label="Client website / landing page / automation links">
        <textarea
          name="website_links"
          defaultValue={multilineValue(item?.websiteLinks)}
          className={textareaClass()}
          placeholder={`https://client-website.com\nhttps://automation-demo-link.com`}
        />
      </Field>
      <Field label="Testimonial">
        <textarea name="testimonial" defaultValue={item?.testimonial} className={textareaClass()} />
      </Field>
      <label className="flex items-center gap-3 text-sm font-bold text-[#0b2447]">
        <input name="published" type="checkbox" defaultChecked={item?.published ?? true} className="h-4 w-4" />
        Published
      </label>
      <button className="h-11 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]">
        Save case study
      </button>
    </form>
  );
}

export function TeamMemberForm({ item }: { item?: TeamMember }) {
  return (
    <form action={saveTeamMember} className="grid gap-5 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name">
          <input name="name" defaultValue={item?.name} className={inputClass()} />
        </Field>
        <Field label="Role">
          <input name="role" defaultValue={item?.role} className={inputClass()} />
        </Field>
      </div>
      <Field label="Image URL">
        <input name="image_url" defaultValue={item?.imageUrl} className={inputClass()} />
      </Field>
      <Field label="Bio">
        <textarea name="bio" defaultValue={item?.bio} className={textareaClass()} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Skills, comma separated">
          <input name="skills" defaultValue={item?.skills.join(", ")} className={inputClass()} />
        </Field>
        <Field label="Display order">
          <input name="display_order" type="number" defaultValue={item?.displayOrder ?? 10} className={inputClass()} />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Instagram URL">
          <input name="instagram_url" defaultValue={item?.instagramUrl} className={inputClass()} />
        </Field>
        <Field label="LinkedIn URL">
          <input name="linkedin_url" defaultValue={item?.linkedinUrl} className={inputClass()} />
        </Field>
      </div>
      <label className="flex items-center gap-3 text-sm font-bold text-[#0b2447]">
        <input name="active" type="checkbox" defaultChecked={item?.active ?? true} className="h-4 w-4" />
        Active
      </label>
      <button className="h-11 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]">
        {item ? "Update team member" : "Add team member"}
      </button>
    </form>
  );
}

export function ServiceForm({ item }: { item?: Service }) {
  return (
    <form action={saveService} className="grid gap-5 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title">
          <input name="title" defaultValue={item?.title} className={inputClass()} />
        </Field>
        <Field label="Slug">
          <input name="slug" defaultValue={item?.slug} className={inputClass()} />
        </Field>
      </div>
      <Field label="Short description">
        <textarea name="short_description" defaultValue={item?.shortDescription} className={textareaClass()} />
      </Field>
      <Field label="Pain point">
        <textarea name="pain_point" defaultValue={item?.painPoint} className={textareaClass()} />
      </Field>
      <Field label="Detailed description">
        <textarea name="detailed_description" defaultValue={item?.zigoDoes} className={textareaClass()} />
      </Field>
      <Field label="Deliverables, comma separated">
        <input name="deliverables" defaultValue={item?.deliverables.join(", ")} className={inputClass()} />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Icon name">
          <input name="icon" defaultValue={item?.icon ?? "Megaphone"} className={inputClass()} />
        </Field>
        <Field label="Display order">
          <input name="display_order" type="number" defaultValue={item?.displayOrder ?? 10} className={inputClass()} />
        </Field>
      </div>
      <Field label="Image URL">
        <input name="image_url" className={inputClass()} placeholder="Supabase Storage URL" />
      </Field>
      <label className="flex items-center gap-3 text-sm font-bold text-[#0b2447]">
        <input name="active" type="checkbox" defaultChecked={item?.active ?? true} className="h-4 w-4" />
        Active
      </label>
      <button className="h-11 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]">
        Save service
      </button>
    </form>
  );
}

export function BlogPostForm({ item }: { item?: BlogPost }) {
  return (
    <form action={saveBlogPost} className="grid gap-5 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
      <input type="hidden" name="id" value={item?.id ?? ""} />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Blog title">
          <input name="title" defaultValue={item?.title} className={inputClass()} />
        </Field>
        <Field label="Slug">
          <input name="slug" defaultValue={item?.slug} className={inputClass()} placeholder="my-blog-post" />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Category">
          <input name="category" defaultValue={item?.category ?? "Marketing Learning"} className={inputClass()} />
        </Field>
        <Field label="Author">
          <input name="author" defaultValue={item?.author ?? "Prasanth M"} className={inputClass()} />
        </Field>
      </div>
      <Field label="Short excerpt">
        <textarea name="excerpt" defaultValue={item?.excerpt} className={textareaClass()} />
      </Field>
      <Field label="Blog content">
        <textarea
          name="content"
          defaultValue={item?.content}
          className={`${textareaClass()} min-h-80 font-mono text-xs leading-6`}
          placeholder={"## Quick answer\nWrite the main answer first.\n\n- Add helpful points\n- Add links like [Services](/services) or [Google](https://google.com)"}
        />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Tags, comma separated">
          <input name="tags" defaultValue={item?.tags.join(", ")} className={inputClass()} />
        </Field>
        <Field label="Published date">
          <input name="published_at" type="datetime-local" defaultValue={dateTimeValue(item?.publishedAt)} className={inputClass()} />
        </Field>
      </div>
      <Field label="Cover image URL">
        <input name="cover_image_url" defaultValue={item?.coverImage} className={inputClass()} placeholder="/assets/digital-marketing-hero.png" />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="SEO title">
          <input name="seo_title" defaultValue={item?.seoTitle} className={inputClass()} />
        </Field>
        <Field label="Canonical URL">
          <input name="canonical_url" defaultValue={item?.canonicalUrl} className={inputClass()} placeholder="Optional external canonical URL" />
        </Field>
      </div>
      <Field label="SEO description">
        <textarea name="seo_description" defaultValue={item?.seoDescription} className={textareaClass()} />
      </Field>
      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-3 text-sm font-bold text-[#0b2447]">
          <input name="published" type="checkbox" defaultChecked={item?.published ?? true} className="h-4 w-4" />
          Published
        </label>
        <label className="flex items-center gap-3 text-sm font-bold text-[#0b2447]">
          <input name="featured" type="checkbox" defaultChecked={item?.featured ?? false} className="h-4 w-4" />
          Featured
        </label>
      </div>
      <button className="h-11 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]">
        Save blog post
      </button>
    </form>
  );
}

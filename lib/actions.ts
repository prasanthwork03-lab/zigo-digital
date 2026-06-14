"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  addLocalEnquiry,
  deleteLocalBlogPost,
  deleteLocalEnquiry,
  deleteLocalPortfolioCase,
  deleteLocalTeamMember,
  parseMetricsSummary,
  upsertLocalBlogPost,
  upsertLocalPortfolioCase,
  upsertLocalService,
  upsertLocalTeamMember,
} from "@/lib/cms";
import { createSupabaseAdminClient } from "@/lib/supabase";
import type { EnquiryFormState } from "@/lib/types";
import { slugify } from "@/lib/utils";

const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  business_name: z.string().min(2, "Please enter your business name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  service_needed: z.string().min(2, "Please select or enter a service."),
  message: z.string().min(10, "Please share a little more detail."),
});

const listFromForm = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const boolFromForm = (value: FormDataEntryValue | null) => value === "on" || value === "true";

const isoDateFromForm = (value: FormDataEntryValue | null) => {
  const rawValue = String(value || "");
  const date = rawValue ? new Date(rawValue) : new Date();

  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
};

const listFromLongForm = (value: FormDataEntryValue | null) =>
  String(value || "")
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export async function submitEnquiry(
  _prevState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  const selectedServices = formData
    .getAll("service_needed")
    .map(String)
    .map((service) => service.trim())
    .filter(Boolean);
  const serviceNeeded = selectedServices.join(", ");

  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    business_name: formData.get("business_name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service_needed: serviceNeeded,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = createSupabaseAdminClient();

  if (!supabase) {
    await addLocalEnquiry({
      id: crypto.randomUUID(),
      name: parsed.data.name,
      businessName: parsed.data.business_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      serviceNeeded: parsed.data.service_needed,
      message: parsed.data.message,
      status: "new",
      createdAt: new Date().toISOString(),
    });
    revalidatePath("/admin/enquiries");

    return {
      status: "success",
      message: "Thanks. Zigo Digital will contact you shortly.",
    };
  }

  const { error } = await supabase.from("enquiries").insert({
    ...parsed.data,
    status: "new",
  });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong while saving your enquiry. Please try WhatsApp or email.",
    };
  }

  revalidatePath("/admin/enquiries");

  return {
    status: "success",
    message: "Thanks. Zigo Digital will contact you shortly.",
  };
}

export async function savePortfolioCase(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const title = String(formData.get("client_name") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const redirectTo = "/admin/portfolio";
  const id = String(formData.get("id") || crypto.randomUUID());
  const metricsSummary = String(formData.get("metrics_json") || "");
  const localPayload = {
    id,
    clientName: title,
    slug,
    industry: String(formData.get("industry") || ""),
    logoImage: String(formData.get("logo_image_url") || "") || undefined,
    shortDescription: String(formData.get("short_description") || ""),
    problem: String(formData.get("problem") || ""),
    goal: String(formData.get("goal") || ""),
    solution: String(formData.get("solution") || ""),
    servicesProvided: listFromForm(formData.get("services_provided")),
    platformsUsed: listFromForm(formData.get("platforms_used")),
    strategy: listFromLongForm(formData.get("strategy")),
    execution: listFromLongForm(formData.get("execution")),
    resultsSummary: String(formData.get("results_summary") || ""),
    metrics: parseMetricsSummary(metricsSummary),
    coverLabel: String(formData.get("cover_label") || title),
    galleryImages: listFromLongForm(formData.get("gallery_images")),
    videoUrls: listFromLongForm(formData.get("video_urls")),
    resultImageUrls: listFromLongForm(formData.get("result_image_urls")),
    websiteLinks: listFromLongForm(formData.get("website_links")),
    testimonial: String(formData.get("testimonial") || ""),
    published: boolFromForm(formData.get("published")),
  };

  if (!supabase) {
    await upsertLocalPortfolioCase(localPayload);
    revalidatePath("/");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${slug}`);
    revalidatePath("/admin/portfolio");
    redirect(`${redirectTo}?saved=local`);
  }

  const payload = {
    id: isUuid(id) ? id : crypto.randomUUID(),
    client_name: title,
    slug,
    industry: String(formData.get("industry") || ""),
    logo_image_url: String(formData.get("logo_image_url") || ""),
    short_description: String(formData.get("short_description") || ""),
    problem: String(formData.get("problem") || ""),
    goal: String(formData.get("goal") || ""),
    solution: String(formData.get("solution") || ""),
    services_provided: listFromForm(formData.get("services_provided")),
    platforms_used: listFromForm(formData.get("platforms_used")),
    strategy: listFromLongForm(formData.get("strategy")),
    execution: listFromLongForm(formData.get("execution")),
    results_summary: String(formData.get("results_summary") || ""),
    metrics_json: {
      summary: metricsSummary,
    },
    cover_label: String(formData.get("cover_label") || title),
    cover_image_url: "",
    gallery_images: listFromLongForm(formData.get("gallery_images")),
    video_urls: listFromLongForm(formData.get("video_urls")),
    result_image_urls: listFromLongForm(formData.get("result_image_urls")),
    website_links: listFromLongForm(formData.get("website_links")),
    testimonial: String(formData.get("testimonial") || ""),
    published: boolFromForm(formData.get("published")),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("portfolio_cases").upsert(payload);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath(`/portfolio/${slug}`);
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

export async function deletePortfolioCase(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "");
  const redirectTo = "/admin/portfolio";

  if (!supabase || !id) {
    if (id) {
      await deleteLocalPortfolioCase(id);
      revalidatePath("/");
      revalidatePath("/portfolio");
      revalidatePath("/admin/portfolio");
    }
    redirect(`${redirectTo}?deleted=local`);
  }

  const { error } = await supabase.from("portfolio_cases").delete().eq("id", id);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/portfolio");
  revalidatePath("/admin/portfolio");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

export async function deleteEnquiry(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "");
  const redirectTo = "/admin/enquiries";

  if (!supabase || !id) {
    if (id) {
      await deleteLocalEnquiry(id);
      revalidatePath("/admin/enquiries");
      revalidatePath("/admin/dashboard");
    }
    redirect(`${redirectTo}?deleted=local`);
  }

  const { error } = await supabase.from("enquiries").delete().eq("id", id);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin/enquiries");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

export async function saveTeamMember(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const redirectTo = "/admin/team";
  const id = String(formData.get("id") || crypto.randomUUID());
  const localPayload = {
    id,
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    imageUrl: String(formData.get("image_url") || ""),
    bio: String(formData.get("bio") || ""),
    skills: listFromForm(formData.get("skills")),
    instagramUrl: String(formData.get("instagram_url") || "") || undefined,
    linkedinUrl: String(formData.get("linkedin_url") || "") || undefined,
    displayOrder: Number(formData.get("display_order") || 10),
    active: boolFromForm(formData.get("active")),
  };

  if (!supabase) {
    await upsertLocalTeamMember(localPayload);
    revalidatePath("/");
    revalidatePath("/team");
    revalidatePath("/admin/team");
    redirect(`${redirectTo}?saved=local`);
  }

  const payload = {
    id: isUuid(id) ? id : crypto.randomUUID(),
    name: String(formData.get("name") || ""),
    role: String(formData.get("role") || ""),
    bio: String(formData.get("bio") || ""),
    image_url: String(formData.get("image_url") || ""),
    skills: listFromForm(formData.get("skills")),
    instagram_url: String(formData.get("instagram_url") || ""),
    linkedin_url: String(formData.get("linkedin_url") || ""),
    display_order: Number(formData.get("display_order") || 10),
    active: boolFromForm(formData.get("active")),
  };

  const { error } = await supabase.from("team_members").upsert(payload);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/team");
  redirect(redirectTo);
}

export async function deleteTeamMember(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "");
  const redirectTo = "/admin/team";

  if (!supabase || !id) {
    if (id) {
      await deleteLocalTeamMember(id);
      revalidatePath("/");
      revalidatePath("/team");
      revalidatePath("/admin/team");
      revalidatePath("/admin/dashboard");
    }
    redirect(`${redirectTo}?deleted=local`);
  }

  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin/team");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

export async function saveService(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const title = String(formData.get("title") || "");
  const redirectTo = "/admin/services";
  const id = String(formData.get("id") || crypto.randomUUID());
  const localPayload = {
    id,
    title,
    slug: slugify(String(formData.get("slug") || title)),
    shortDescription: String(formData.get("short_description") || ""),
    painPoint: String(formData.get("pain_point") || ""),
    zigoDoes: String(formData.get("detailed_description") || ""),
    deliverables: listFromForm(formData.get("deliverables")),
    icon: String(formData.get("icon") || "Megaphone"),
    active: boolFromForm(formData.get("active")),
    displayOrder: Number(formData.get("display_order") || 10),
  };

  if (!supabase) {
    await upsertLocalService(localPayload);
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/admin/services");
    redirect(`${redirectTo}?saved=local`);
  }

  const payload = {
    id: isUuid(id) ? id : crypto.randomUUID(),
    title,
    slug: slugify(String(formData.get("slug") || title)),
    short_description: String(formData.get("short_description") || ""),
    pain_point: String(formData.get("pain_point") || ""),
    detailed_description: String(formData.get("detailed_description") || ""),
    deliverables: listFromForm(formData.get("deliverables")),
    icon: String(formData.get("icon") || "Megaphone"),
    image_url: String(formData.get("image_url") || ""),
    active: boolFromForm(formData.get("active")),
    display_order: Number(formData.get("display_order") || 10),
  };

  const { error } = await supabase.from("services").upsert(payload);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/services");
  redirect(redirectTo);
}

export async function saveBlogPost(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const title = String(formData.get("title") || "");
  const slug = slugify(String(formData.get("slug") || title));
  const redirectTo = "/admin/blog";
  const id = String(formData.get("id") || crypto.randomUUID());
  const publishedAt = isoDateFromForm(formData.get("published_at"));
  const updatedAt = new Date().toISOString();
  const localPayload = {
    id,
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    category: String(formData.get("category") || "Marketing"),
    tags: listFromForm(formData.get("tags")),
    coverImage: String(formData.get("cover_image_url") || "") || undefined,
    author: String(formData.get("author") || "Prasanth M"),
    published: boolFromForm(formData.get("published")),
    featured: boolFromForm(formData.get("featured")),
    publishedAt,
    updatedAt,
    seoTitle: String(formData.get("seo_title") || "") || undefined,
    seoDescription: String(formData.get("seo_description") || "") || undefined,
    canonicalUrl: String(formData.get("canonical_url") || "") || undefined,
  };

  if (!supabase) {
    await upsertLocalBlogPost(localPayload);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/admin/blog");
    revalidatePath("/admin/dashboard");
    redirect(`${redirectTo}?saved=local`);
  }

  const payload = {
    id: isUuid(id) ? id : crypto.randomUUID(),
    title,
    slug,
    excerpt: String(formData.get("excerpt") || ""),
    content: String(formData.get("content") || ""),
    category: String(formData.get("category") || "Marketing"),
    tags: listFromForm(formData.get("tags")),
    cover_image_url: String(formData.get("cover_image_url") || ""),
    author: String(formData.get("author") || "Prasanth M"),
    published: boolFromForm(formData.get("published")),
    featured: boolFromForm(formData.get("featured")),
    published_at: publishedAt,
    updated_at: updatedAt,
    seo_title: String(formData.get("seo_title") || ""),
    seo_description: String(formData.get("seo_description") || ""),
    canonical_url: String(formData.get("canonical_url") || ""),
  };

  const { error } = await supabase.from("blog_posts").upsert(payload);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

export async function deleteBlogPost(formData: FormData) {
  const supabase = createSupabaseAdminClient();
  const id = String(formData.get("id") || "");
  const redirectTo = "/admin/blog";

  if (!supabase || !id) {
    if (id) {
      await deleteLocalBlogPost(id);
      revalidatePath("/");
      revalidatePath("/blog");
      revalidatePath("/admin/blog");
      revalidatePath("/admin/dashboard");
    }
    redirect(`${redirectTo}?deleted=local`);
  }

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/dashboard");
  redirect(redirectTo);
}

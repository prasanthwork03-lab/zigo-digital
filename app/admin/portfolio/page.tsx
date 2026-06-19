import Link from "next/link";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { deletePortfolioCase } from "@/lib/actions";
import { getPortfolioCases } from "@/lib/cms";

type AdminPortfolioPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function queryValue(params: Record<string, string | string[] | undefined> | undefined, key: string) {
  const value = params?.[key];

  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPortfolioPage({ searchParams }: AdminPortfolioPageProps) {
  const params = await searchParams;
  const error = queryValue(params, "error");
  const saved = queryValue(params, "saved");
  const portfolioCases = await getPortfolioCases();

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-[#c2932e]">Portfolio</p>
            <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Manage case studies</h1>
            <p className="mt-3 text-sm leading-6 text-[#526170]">
              Add, edit, delete, and publish client modules. Published cases appear on /portfolio and /portfolio/[slug].
            </p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447]"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            New Case Study
          </Link>
        </div>

        {error ? (
          <div className="mt-6 rounded-lg border border-[#ffd0c7] bg-[#fff4f2] px-5 py-4 text-sm font-semibold leading-6 text-[#b42318]">
            Portfolio save failed: {error}
          </div>
        ) : null}

        {saved === "media-json-fallback" ? (
          <div className="mt-6 rounded-lg border border-[#b7e4cd] bg-[#f0fbf5] px-5 py-4 text-sm font-semibold leading-6 text-[#166534]">
            Case study saved and published. Media links were saved in the backup JSON field because the Supabase media columns are not added yet.
          </div>
        ) : null}

        <div className="mt-8 overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-sm">
          <div className="grid gap-0">
            {portfolioCases.map((item) => (
              <div key={item.id} className="grid gap-4 border-b border-[#edf3f8] p-5 last:border-b-0 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto] lg:items-center">
                <div>
                  <h2 className="font-black text-[#0b2447]">{item.clientName}</h2>
                  <p className="mt-1 text-sm text-[#667789]">{item.shortDescription}</p>
                </div>
                <p className="text-sm font-semibold text-[#526170]">{item.industry}</p>
                <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${item.published ? "bg-[#f0fbf5] text-[#166534]" : "bg-[#fff7e6] text-[#8a5b00]"}`}>
                  {item.published ? "Published" : "Draft"}
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/portfolio/edit/${item.id}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9e7f5] text-[#0b5f9c] hover:bg-[#eaf4ff]"
                    aria-label={`Edit ${item.clientName}`}
                  >
                    <Edit3 className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <form action={deletePortfolioCase}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#ffd0c7] text-[#b42318] hover:bg-[#fff4f2]"
                      aria-label={`Delete ${item.clientName}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

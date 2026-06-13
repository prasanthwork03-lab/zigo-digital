import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PortfolioCaseForm } from "@/components/admin/admin-forms";
import { getPortfolioCases } from "@/lib/cms";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPortfolioCasePage({ params }: PageProps) {
  const { id } = await params;
  const portfolioCases = await getPortfolioCases();
  const item = portfolioCases.find((caseStudy) => caseStudy.id === id);

  if (!item) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-[#c2932e]">Portfolio</p>
        <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Edit {item.clientName}</h1>
        <p className="mt-3 text-sm leading-6 text-[#526170]">
          Update the client case study. With Supabase connected, this form writes to portfolio_cases.
        </p>
        <div className="mt-8">
          <PortfolioCaseForm item={item} />
        </div>
      </div>
    </AdminShell>
  );
}

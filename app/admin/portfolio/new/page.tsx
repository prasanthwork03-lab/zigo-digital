import { AdminShell } from "@/components/admin/admin-shell";
import { PortfolioCaseForm } from "@/components/admin/admin-forms";

export default function NewPortfolioCasePage() {
  return (
    <AdminShell>
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase text-[#c2932e]">Portfolio</p>
        <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Add new case study</h1>
        <p className="mt-3 text-sm leading-6 text-[#526170]">
          Create a complete client module with strategy, services, metrics, images, testimonial, and publish status.
        </p>
        <div className="mt-8">
          <PortfolioCaseForm />
        </div>
      </div>
    </AdminShell>
  );
}

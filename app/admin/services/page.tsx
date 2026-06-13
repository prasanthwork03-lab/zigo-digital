import { AdminShell } from "@/components/admin/admin-shell";
import { ServiceForm } from "@/components/admin/admin-forms";
import { getServices } from "@/lib/cms";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <AdminShell>
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase text-[#c2932e]">Services</p>
          <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Manage services</h1>
          <p className="mt-3 text-sm leading-6 text-[#526170]">
            Add, update, deactivate, and reorder services shown across the website.
          </p>
          <div className="mt-8 grid gap-3">
            {services.map((service) => (
              <article key={service.id} className="rounded-lg border border-[#d9e7f5] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="font-black text-[#0b2447]">{service.title}</h2>
                    <p className="mt-1 text-sm text-[#667789]">{service.shortDescription}</p>
                  </div>
                  <span className="rounded-full bg-[#f0fbf5] px-3 py-1 text-xs font-bold text-[#166534]">Active</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <ServiceForm item={services[0]} />
      </div>
    </AdminShell>
  );
}

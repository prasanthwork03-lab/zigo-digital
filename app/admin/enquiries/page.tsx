import { Mail, Phone, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { deleteEnquiry } from "@/lib/actions";
import { getEnquiries } from "@/lib/cms";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <AdminShell>
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase text-[#c2932e]">Enquiries</p>
        <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Contact form leads</h1>
        <p className="mt-3 text-sm leading-6 text-[#526170]">
          Enquiries from the contact form appear here with phone, email, service interest, and message details.
        </p>

        <div className="mt-8 grid gap-4">
          {enquiries.length ? enquiries.map((item) => (
            <article key={item.id} className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black text-[#0b2447]">{item.name}</h2>
                    <span className="rounded-full bg-[#f0fbf5] px-3 py-1 text-xs font-bold text-[#166534]">{item.status}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#667789]">{item.businessName}</p>
                  <p className="mt-4 text-sm leading-6 text-[#526170]">{item.message}</p>
                  <p className="mt-3 text-sm font-bold text-[#0b5f9c]">{item.serviceNeeded}</p>
                </div>
                <div className="grid gap-2 text-sm font-semibold text-[#526170]">
                  <a href={`tel:${item.phone}`} className="flex items-center gap-2 hover:text-[#0b5f9c]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {item.phone}
                  </a>
                  <a href={`mailto:${item.email}`} className="flex items-center gap-2 hover:text-[#0b5f9c]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {item.email}
                  </a>
                  <form action={deleteEnquiry} className="pt-2">
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#ffd0c7] px-3 text-xs font-bold text-[#b42318] hover:bg-[#fff4f2]"
                      aria-label={`Delete enquiry from ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          )) : (
            <div className="rounded-lg border border-dashed border-[#c6d7e8] bg-white p-8 text-center">
              <h2 className="text-xl font-black text-[#0b2447]">No enquiries yet</h2>
              <p className="mt-2 text-sm text-[#526170]">New contact form submissions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

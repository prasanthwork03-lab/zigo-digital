import Image from "next/image";
import { Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { TeamMemberForm } from "@/components/admin/admin-forms";
import { deleteTeamMember } from "@/lib/actions";
import { getTeamMembers } from "@/lib/cms";

export default async function AdminTeamPage() {
  const teamMembers = await getTeamMembers();
  const sortedTeamMembers = [...teamMembers].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <AdminShell>
      <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase text-[#c2932e]">Team</p>
          <h1 className="mt-2 text-3xl font-black text-[#0b2447]">Manage team members</h1>
          <p className="mt-3 text-sm leading-6 text-[#526170]">
            Add founder and future team members with image, role, bio, skills, social links, active status, and display order.
          </p>
          <div className="mt-8 grid gap-4">
            {sortedTeamMembers.map((member) => (
              <article key={member.id} className="flex gap-4 rounded-lg border border-[#d9e7f5] bg-white p-4 shadow-sm">
                <Image src={member.imageUrl} alt={member.name} width={72} height={72} className="h-16 w-16 rounded-lg object-cover object-top" />
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-black text-[#0b2447]">{member.name}</h2>
                    <p className="text-sm font-bold text-[#0b5f9c]">{member.role}</p>
                    <p className="mt-2 text-sm text-[#667789]">{member.skills.slice(0, 3).join(", ")}</p>
                  </div>
                  <form action={deleteTeamMember} className="shrink-0">
                    <input type="hidden" name="id" value={member.id} />
                    <button
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-[#ffd0c7] px-3 text-xs font-bold text-[#b42318] hover:bg-[#fff4f2]"
                      aria-label={`Delete ${member.name}`}
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Delete
                    </button>
                  </form>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="grid gap-8">
          <div>
            <h2 className="mb-4 text-xl font-black text-[#0b2447]">Add new team member</h2>
            <TeamMemberForm />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-black text-[#0b2447]">Edit existing team members</h2>
            <div className="grid gap-5">
              {sortedTeamMembers.map((member) => (
                <TeamMemberForm key={member.id} item={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

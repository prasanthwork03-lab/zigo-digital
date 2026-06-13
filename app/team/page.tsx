import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { getTeamMembers } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Team",
  description: "Meet the founder and team behind Zigo Digital's digital growth systems.",
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  const activeMembers = teamMembers.filter((member) => member.active).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <PublicShell>
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Team"
              title="Founder-led today, built to scale with the right specialists."
              align="center"
              level="h1"
            />
          </Reveal>
          <Stagger className="mt-10 grid auto-rows-fr gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {activeMembers.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <article className="flex h-full min-h-[720px] flex-col overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b5f9c]/10">
                  <div className="relative h-[360px] shrink-0 overflow-hidden bg-[#eaf4ff] sm:h-[380px] lg:h-[420px]">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-2xl font-black text-[#0b2447]">{member.name}</h2>
                    <p className="mt-1 text-sm font-bold text-[#0b5f9c]">{member.role}</p>
                    <p className="mt-4 text-sm leading-6 text-[#526170]">{member.bio}</p>
                    <div className="mt-5 grid flex-1 content-start gap-2">
                      {member.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-sm font-semibold text-[#526170]">
                          <CheckCircle2 className="h-4 w-4 text-[#0b5f9c]" aria-hidden="true" />
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-10 text-center">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-bold text-white hover:bg-[#0b2447]"
            >
              Work With Zigo Digital
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site-data";

export function SiteFooter() {
  const supportItems = ["Lead generation campaigns", "Website & landing pages", "Creative design", "Video editing"];

  return (
    <footer className="border-t border-[#d9e7f5] bg-[#071827] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src={site.logo}
              alt="Zigo Digital logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-contain"
            />
            <div>
              <span className="block text-xl font-bold">{site.name}</span>
              <span className="text-sm text-[#b8c7d8]">Complete digital growth systems</span>
            </div>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#b8c7d8]">{site.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Growth Support</h2>
          <div className="mt-4 grid gap-3 text-sm text-[#b8c7d8]">
            {supportItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-[#d0a345]" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-white">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm text-[#b8c7d8]">
            <a href={`tel:${site.phone}`} className="flex items-center gap-3 hover:text-white">
              <Phone className="h-4 w-4 text-[#d0a345]" aria-hidden="true" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white">
              <Mail className="h-4 w-4 text-[#d0a345]" aria-hidden="true" />
              {site.email}
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#d0a345]" aria-hidden="true" />
              {site.address}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-[#8fa5bb]">
        (c) {new Date().getFullYear()} Zigo Digital. Your success is our mission.
      </div>
    </footer>
  );
}

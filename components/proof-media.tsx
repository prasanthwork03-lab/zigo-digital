/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { ExternalLink, ImageOff, PlayCircle } from "lucide-react";
import {
  getVideoEmbedUrl,
  getVideoThumbnailUrl,
  isDirectVideoUrl,
  normalizeMediaUrl,
  readableLink,
} from "@/lib/media";

export function VideoProofCard({ url, title }: { url: string; title: string }) {
  const normalizedUrl = normalizeMediaUrl(url);
  const embedUrl = getVideoEmbedUrl(normalizedUrl);
  const thumbnailUrl = getVideoThumbnailUrl(normalizedUrl);

  if (embedUrl) {
    return (
      <div className="overflow-hidden rounded-lg border border-[#d9e7f5] bg-[#fbfdff] shadow-sm">
        <iframe
          src={embedUrl}
          title={title}
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (isDirectVideoUrl(normalizedUrl)) {
    return (
      <div className="overflow-hidden rounded-lg border border-[#d9e7f5] bg-[#071827] shadow-sm">
        <video controls preload="metadata" poster={thumbnailUrl || undefined} className="aspect-video w-full bg-[#071827]">
          <source src={normalizedUrl} />
          <a href={normalizedUrl} target="_blank" rel="noreferrer">
            Open video proof
          </a>
        </video>
      </div>
    );
  }

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative flex min-h-64 flex-col items-center justify-center overflow-hidden rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-[#0b5f9c] hover:shadow-xl hover:shadow-[#0b5f9c]/10"
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <span className="absolute inset-0 bg-[#071827]/55" />
      <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0b5f9c] shadow-lg">
        <PlayCircle className="h-8 w-8" aria-hidden="true" />
      </span>
      <span className="relative z-10 mt-4 text-sm font-black text-white">Open video proof</span>
      <span className="relative z-10 mt-2 text-xs font-semibold text-[#d7e2ee]">{readableLink(normalizedUrl)}</span>
    </a>
  );
}

export function ProofImageCard({ url, alt }: { url: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  const normalizedUrl = normalizeMediaUrl(url);

  if (failed) {
    return <BrokenMediaHint url={normalizedUrl} label="Image" />;
  }

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-72 items-center justify-center overflow-hidden rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-3 shadow-sm transition hover:-translate-y-1 hover:border-[#0b5f9c] hover:shadow-xl hover:shadow-[#0b5f9c]/10"
    >
      <img
        src={normalizedUrl}
        alt={alt}
        className="max-h-72 w-full object-contain transition group-hover:scale-[1.02]"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </a>
  );
}

export function BrokenMediaHint({ url, label = "Media link" }: { url: string; label?: string }) {
  const normalizedUrl = normalizeMediaUrl(url);

  return (
    <a
      href={normalizedUrl}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-lg border border-[#ffd0c7] bg-[#fff8f6] p-5 text-center text-sm font-bold text-[#b42318]"
    >
      <ImageOff className="h-8 w-8" aria-hidden="true" />
      {label} could not preview
      <span className="inline-flex items-center gap-2 text-xs text-[#526170]">
        Open source <ExternalLink className="h-3 w-3" aria-hidden="true" />
      </span>
    </a>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

function isSafeHref(href: string) {
  return href.startsWith("/") || href.startsWith("#") || href.startsWith("https://") || href.startsWith("http://");
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    const [fullMatch, label, href] = match;

    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (!isSafeHref(href)) {
      nodes.push(label);
    } else if (href.startsWith("/") || href.startsWith("#")) {
      nodes.push(
        <Link key={`${href}-${match.index}`} href={href} className="font-bold text-[#0b5f9c] underline decoration-[#d0a345]/50 underline-offset-4 hover:text-[#0b2447]">
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a
          key={`${href}-${match.index}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#0b5f9c] underline decoration-[#d0a345]/50 underline-offset-4 hover:text-[#0b2447]"
        >
          {label}
        </a>,
      );
    }

    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function BlogContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (!listItems.length) {
      return;
    }

    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-6 grid gap-3">
        {listItems.map((item) => (
          <li key={item} className="flex gap-3 text-base leading-8 text-[#526170]">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-[#d0a345]" aria-hidden="true" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>,
    );
    listItems = [];
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.slice(2));
      return;
    }

    flushList();

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h3 key={index} className="mb-3 mt-8 text-2xl font-black text-[#0b2447]">
          {renderInline(trimmed.slice(4))}
        </h3>,
      );
      return;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2 key={index} className="mb-4 mt-10 text-3xl font-black text-[#0b2447]">
          {renderInline(trimmed.slice(3))}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith("# ")) {
      blocks.push(
        <h2 key={index} className="mb-4 mt-10 text-3xl font-black text-[#0b2447]">
          {renderInline(trimmed.slice(2))}
        </h2>,
      );
      return;
    }

    if (trimmed.startsWith("> ")) {
      blocks.push(
        <blockquote key={index} className="my-6 border-l-4 border-[#d0a345] bg-[#f8fbff] px-5 py-4 text-lg font-bold leading-8 text-[#0b2447]">
          {renderInline(trimmed.slice(2))}
        </blockquote>,
      );
      return;
    }

    blocks.push(
      <p key={index} className="my-5 text-base leading-8 text-[#526170]">
        {renderInline(trimmed)}
      </p>,
    );
  });

  flushList();

  return <article className="blog-content">{blocks}</article>;
}

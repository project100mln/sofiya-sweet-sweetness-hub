import type { ReactNode } from "react";
import { logoSources } from "@/config/branding";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero overflow-hidden border-y border-border/60">
      <div className="container-page relative py-12 md:py-16">
        <img
          src={logoSources.approvedMark}
          alt=""
          width={346}
          height={512}
          className="pointer-events-none absolute -right-12 top-1/2 hidden h-64 w-64 -translate-y-1/2 select-none object-contain opacity-[0.055] md:block lg:right-6"
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <p className="page-kicker">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {lead && <div className="page-lead">{lead}</div>}
          {children}
        </div>
      </div>
    </section>
  );
}

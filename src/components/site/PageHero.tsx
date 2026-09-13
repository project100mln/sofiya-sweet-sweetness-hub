import type { ReactNode } from "react";
import { logoSources } from "@/config/branding";
import { SofiyaBrandText } from "@/components/site/SofiyaBrandText";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero overflow-hidden border-y border-border/60">
      <div className="container-page relative py-12 md:py-16">
        <img
          src={logoSources.originalSMark}
          alt=""
          width={320}
          height={480}
          className="pointer-events-none absolute -right-12 top-1/2 hidden h-64 w-64 -translate-y-1/2 select-none object-contain opacity-[0.055] md:block lg:right-6"
          aria-hidden
        />
        <div className="relative max-w-3xl">
          <p className="page-kicker">
            {typeof eyebrow === "string" ? (
              <SofiyaBrandText text={eyebrow} wordmarkClassName="!h-[1.1em]" />
            ) : (
              eyebrow
            )}
          </p>
          <h1 className="page-title">
            {typeof title === "string" ? (
              <SofiyaBrandText text={title} wordmarkClassName="!h-[0.82em]" />
            ) : (
              title
            )}
          </h1>
          {lead && (
            <div className="page-lead">
              {typeof lead === "string" ? (
                <SofiyaBrandText text={lead} wordmarkClassName="!h-[1.05em]" />
              ) : (
                lead
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

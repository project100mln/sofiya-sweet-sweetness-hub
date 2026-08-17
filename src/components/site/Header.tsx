import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { branding, logoUrl } from "@/config/branding";
import { site, instagramLink, waLink } from "@/config/site";
import { nav } from "@/config/navigation";
import { Instagram, Menu, MessageCircle, Phone, X } from "lucide-react";

export function Header() {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSticky(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        sticky ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-background"
      } border-b border-border/60`}
    >
      <div className="container-page flex items-center gap-4 py-3 md:py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="SOFIYA — на главную">
          <img
            src={logoUrl(branding.headerLogo)}
            alt={branding.alt}
            className={branding.classes.header}
          />
        </Link>

        <nav className="ml-6 hidden xl:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition-colors"
              activeProps={{
                className: "px-3 py-2 rounded-full text-sm font-semibold text-primary bg-accent",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={`tel:${site.whatsappDigits}`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-foreground/85 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <a
            href={instagramLink}
            target="_blank"
            rel="noreferrer"
            className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={waLink("Здравствуйте, SOFIYA! У меня вопрос.")}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex btn-primary btn-primary-hover"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            className="xl:hidden grid h-11 w-11 place-items-center rounded-full border border-border"
            aria-label="Меню"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            id="mobile-navigation"
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col bg-background"
            role="dialog"
            aria-modal="true"
            aria-label="Навигация"
          >
            <div className="border-b border-border">
              <div className="mx-auto flex w-full max-w-[1440px] items-center px-5 py-3 sm:px-8">
                <img
                  src={logoUrl(branding.headerLogo)}
                  alt={branding.alt}
                  className={branding.classes.headerMobile}
                />
                <button
                  className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-border"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-1 overflow-y-auto px-5 py-6 sm:px-8">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-accent"
                  activeProps={{
                    className: "rounded-2xl px-4 py-3 text-lg font-semibold text-primary bg-accent",
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={waLink("Здравствуйте, SOFIYA!")}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary btn-primary-hover"
                >
                  <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
                </a>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline btn-outline-hover"
                >
                  <Instagram className="h-4 w-4" /> Instagram {site.instagramHandle}
                </a>
                <a
                  href={`tel:${site.whatsappDigits}`}
                  className="py-2 text-center text-foreground/80"
                >
                  {site.phone}
                </a>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}

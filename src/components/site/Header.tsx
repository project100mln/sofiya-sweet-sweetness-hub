import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/sofiya-logo.png.asset.json";
import { site, instagramLink, waLink } from "@/config/site";
import { Instagram, Menu, MessageCircle, Phone, X } from "lucide-react";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/promotions", label: "Акции" },
  { to: "/stores", label: "Магазины" },
  { to: "/cake-preorder", label: "Торты на заказ" },
  { to: "/catering", label: "Кейтеринг" },
  { to: "/about", label: "О нас" },
  { to: "/career", label: "Карьера" },
  { to: "/contacts", label: "Контакты" },
] as const;

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
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        sticky ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-background"
      } border-b border-border/60`}
    >
      <div className="container-page flex items-center gap-4 py-3 md:py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo.url} alt="SOFIYA" className="h-10 md:h-12 w-auto" />
        </Link>

        <nav className="ml-6 hidden xl:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-accent transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-full text-sm font-semibold text-primary bg-accent" }}
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
          <a href={instagramLink} target="_blank" rel="noreferrer"
             className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
             aria-label="Instagram">
            <Instagram className="h-4 w-4" />
          </a>
          <a href={waLink("Здравствуйте, SOFIYA! У меня вопрос.")} target="_blank" rel="noreferrer"
             className="hidden md:inline-flex btn-primary btn-primary-hover">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <button
            className="xl:hidden grid h-11 w-11 place-items-center rounded-full border border-border"
            aria-label="Меню"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">
          <div className="container-page flex items-center py-3 border-b border-border">
            <img src={logo.url} alt="SOFIYA" className="h-10" />
            <button className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-border" onClick={() => setOpen(false)} aria-label="Закрыть">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="container-page flex-1 overflow-y-auto py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-2xl text-lg font-semibold hover:bg-accent"
                    activeProps={{ className: "px-4 py-3 rounded-2xl text-lg font-semibold text-primary bg-accent" }}
                    activeOptions={{ exact: n.to === "/" }}>
                {n.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <a href={waLink("Здравствуйте, SOFIYA!")} target="_blank" rel="noreferrer" className="btn-primary btn-primary-hover">
                <MessageCircle className="h-4 w-4" /> Написать в WhatsApp
              </a>
              <a href={instagramLink} target="_blank" rel="noreferrer" className="btn-outline btn-outline-hover">
                <Instagram className="h-4 w-4" /> Instagram {site.instagramHandle}
              </a>
              <a href={`tel:${site.whatsappDigits}`} className="text-center text-foreground/80 py-2">
                {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { branding, logoUrl } from "@/config/branding";
import { site, instagramLink, waLink } from "@/config/site";
import { nav } from "@/config/navigation";
import { Instagram, Menu, MessageCircle, Phone, X } from "lucide-react";
import { LocaleLink, localizeHref, useCurrentHref, useI18n } from "@/i18n";
import { useModalFocus } from "@/hooks/use-modal-focus";

const desktopNav = nav.filter(({ to }) =>
  ["/", "/catalog", "/promotions", "/stores", "/cake-preorder", "/about"].includes(to),
);

export function Header() {
  const { locale, t } = useI18n();
  const currentHref = useCurrentHref();
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setOpen(false), []);
  useModalFocus(open, menuDialogRef, menuButtonRef, closeMenu);

  useEffect(() => {
    const on = () => setSticky(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`site-header sticky top-0 z-50 border-b transition-all ${
        sticky
          ? "border-border/70 bg-background/95 shadow-[0_10px_35px_-28px_rgba(44,13,65,0.58)] backdrop-blur-xl"
          : "border-transparent bg-background"
      }`}
    >
      <div className="site-header-shell flex min-h-[5.25rem] items-center gap-4 md:min-h-[7.5rem]">
        <LocaleLink
          to="/"
          className="flex shrink-0 items-center"
          aria-label={t("SOFIYA — на главную")}
          data-testid="header-logo"
        >
          <img
            src={logoUrl(branding.headerLogo)}
            alt={branding.alt}
            width={890}
            height={300}
            className={branding.classes.header}
          />
        </LocaleLink>

        <nav
          className="ml-auto hidden items-stretch self-stretch xl:flex"
          aria-label={t("Основная навигация")}
        >
          {desktopNav.map((n) => (
            <LocaleLink
              key={n.to}
              to={n.to}
              className="site-header-link relative flex items-center px-4 text-[0.94rem] font-medium text-foreground/78 transition-colors hover:text-primary min-[1400px]:px-7"
              activeProps={{
                className:
                  "site-header-link site-header-link-active relative flex items-center px-4 text-[0.94rem] font-semibold text-primary min-[1400px]:px-7",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {locale === "kk" ? n.labelKk : n.label}
            </LocaleLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-6 xl:gap-4">
          <div
            className="hidden items-center rounded-full border border-border bg-card p-1 text-xs font-semibold md:flex"
            aria-label={t("Выбор языка")}
          >
            <Link
              to={localizeHref(currentHref, "kk") as never}
              lang="kk"
              aria-current={locale === "kk" ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-2.5 py-1.5 ${locale === "kk" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}
            >
              Қазақша
            </Link>
            <Link
              to={localizeHref(currentHref, "ru") as never}
              lang="ru"
              aria-current={locale === "ru" ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-full px-2.5 py-1.5 ${locale === "ru" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-primary"}`}
            >
              Русский
            </Link>
          </div>
          <a
            href={`tel:${site.whatsappDigits}`}
            className="site-header-phone hidden min-h-11 items-center gap-2.5 whitespace-nowrap text-[0.94rem] font-semibold text-foreground/85 transition-colors hover:text-primary md:inline-flex"
            aria-label={`${t("Позвонить")}: ${site.phone}`}
          >
            <Phone className="h-4 w-4 text-gold" aria-hidden />
            {site.phone}
          </a>
          <a
            href={waLink(t("Здравствуйте, SOFIYA! У меня вопрос."))}
            target="_blank"
            rel="noreferrer"
            className="hidden h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_28px_-16px_rgba(90,4,189,0.9)] transition-transform hover:-translate-y-0.5 hover:bg-primary-hover md:grid"
            aria-label={t("Написать SOFIYA в WhatsApp")}
            data-testid="header-whatsapp"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
          </a>
          <button
            ref={menuButtonRef}
            className="grid h-11 w-11 place-items-center rounded-2xl border border-border bg-card xl:hidden"
            aria-label={t("Меню")}
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
            ref={menuDialogRef}
            id="mobile-navigation"
            className="fixed inset-0 z-[100] flex min-h-[100dvh] flex-col bg-background"
            role="dialog"
            aria-modal="true"
            aria-label={t("Навигация")}
          >
            <div className="border-b border-border/70">
              <div className="mx-auto flex w-full max-w-[1440px] items-center px-5 py-3 sm:px-8">
                <img
                  src={logoUrl(branding.headerLogo)}
                  alt={branding.alt}
                  width={890}
                  height={300}
                  className={branding.classes.headerMobile}
                />
                <button
                  className="ml-auto grid h-11 w-11 place-items-center rounded-2xl border border-border"
                  onClick={closeMenu}
                  aria-label={t("Закрыть")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <nav className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-1 overflow-y-auto px-5 py-6 sm:px-8">
              {nav.map((n) => (
                <LocaleLink
                  key={n.to}
                  to={n.to}
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-lg font-semibold hover:bg-accent"
                  activeProps={{
                    className: "rounded-2xl px-4 py-3 text-lg font-semibold text-primary bg-accent",
                  }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {locale === "kk" ? n.labelKk : n.label}
                </LocaleLink>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex rounded-2xl border border-border bg-card p-1 text-sm font-semibold">
                  <Link
                    to={localizeHref(currentHref, "kk") as never}
                    lang="kk"
                    onClick={closeMenu}
                    aria-current={locale === "kk" ? "page" : undefined}
                    className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-3 py-2 text-center ${locale === "kk" ? "bg-primary text-primary-foreground" : "text-foreground/75"}`}
                  >
                    Қазақша
                  </Link>
                  <Link
                    to={localizeHref(currentHref, "ru") as never}
                    lang="ru"
                    onClick={closeMenu}
                    aria-current={locale === "ru" ? "page" : undefined}
                    className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-xl px-3 py-2 text-center ${locale === "ru" ? "bg-primary text-primary-foreground" : "text-foreground/75"}`}
                  >
                    Русский
                  </Link>
                </div>
                <a
                  href={waLink(t("Здравствуйте, SOFIYA!"))}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary btn-primary-hover"
                >
                  <MessageCircle className="h-4 w-4" /> {t("Написать в WhatsApp")}
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

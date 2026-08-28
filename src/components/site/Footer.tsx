import { branding, logoUrl } from "@/config/branding";
import { site, instagramLink, waLink } from "@/config/site";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { Instagram, MessageCircle, Phone, MapPin } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { LocaleLink, useI18n } from "@/i18n";
import { getCatalog } from "@/i18n/catalog";
import { localizedSiteRegion } from "@/i18n/content";

export function Footer() {
  const { t, pick, locale } = useI18n();
  const { categories } = getCatalog(locale);
  return (
    <footer className="mt-24 bg-[color:var(--foreground)] text-[color:var(--primary-foreground)]">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <img
            src={logoUrl(branding.footerLogo)}
            alt={branding.alt}
            className={branding.classes.footer}
            data-testid="footer-logo"
          />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            {pick(
              `${site.brand} Sweet — сеть фирменных магазинов в Шымкенте и Туркестанской области. Свежая выпечка, авторские торты и десерты каждый день.`,
              `${site.brand} Sweet — Шымкент пен Түркістан облысындағы фирмалық дүкендер желісі. Күн сайын балғын пісірмелер, авторлық торттар мен десерттер.`,
            )}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-medium hover:bg-white/10"
            >
              <Instagram className="h-4 w-4" /> {site.instagramHandle}
            </a>
            <a
              href={waLink(t("Здравствуйте, SOFIYA!"))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-medium hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            {site.tiktokUrl && (
              <a
                href={site.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <SiTiktok className="h-4 w-4" aria-hidden="true" /> {site.tiktokHandle}
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">
            {t("Каталог")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 7).map((c) => (
              <li key={c.id}>
                <LocaleLink
                  to="/catalog"
                  search={{ cat: c.slug }}
                  className="text-white/85 hover:text-[color:var(--gold)]"
                >
                  {c.name}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">
            {t("Компания")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <LocaleLink
                to="/about"
                className="inline-flex items-center gap-2 text-white/85 hover:text-[color:var(--gold)]"
              >
                {locale === "kk" ? (
                  <>
                    <SofiyaWordmark placement="center" />
                    <span>{t("О")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("О")}</span>
                    <SofiyaWordmark placement="center" />
                  </>
                )}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/stores" className="text-white/85 hover:text-[color:var(--gold)]">
                {t("Магазины")}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink
                to="/cake-preorder"
                className="text-white/85 hover:text-[color:var(--gold)]"
              >
                {t("Торты на заказ")}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/catering" className="text-white/85 hover:text-[color:var(--gold)]">
                {t("Кейтеринг")}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/promotions" className="text-white/85 hover:text-[color:var(--gold)]">
                {t("Акции")}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/news" className="text-white/85 hover:text-[color:var(--gold)]">
                {t("Новости")}
              </LocaleLink>
            </li>
            <li>
              <LocaleLink to="/career" className="text-white/85 hover:text-[color:var(--gold)]">
                {t("Карьера")}
              </LocaleLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">
            {t("Контакты")}
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2 items-start">
              <Phone className="h-4 w-4 mt-0.5 text-[color:var(--gold)]" />
              <a
                href={`tel:${site.whatsappDigits}`}
                className="text-white/85 hover:text-[color:var(--gold)]"
              >
                {site.phone}
              </a>
            </li>
            <li className="flex gap-2 items-start">
              <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--gold)]" />
              <span className="text-white/85">{localizedSiteRegion(locale)}</span>
            </li>
          </ul>
          <div className="mt-5">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50">
              <SofiyaWordmark placement="center" />
              <span>Club — {t("скоро")}</span>
            </p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded-lg border border-white/25 px-3 py-2 text-xs">
                App Store · {t("Скоро")}
              </span>
              <span className="inline-flex items-center rounded-lg border border-white/25 px-3 py-2 text-xs">
                Google Play · {t("Скоро")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/55">
          <p className="flex items-center justify-center gap-2 whitespace-nowrap leading-none">
            <span>© {new Date().getFullYear()}</span>
            <SofiyaWordmark placement="center" />
            <span>{t("Все права защищены.")}</span>
          </p>
          <div className="flex w-full items-start justify-between gap-6 md:w-auto md:items-center md:justify-start md:gap-5">
            <LocaleLink to="/privacy" className="max-w-[9rem] hover:text-white md:max-w-none">
              {t("Политика конфиденциальности")}
            </LocaleLink>
            <LocaleLink
              to="/terms"
              className="max-w-[10rem] text-right hover:text-white md:max-w-none md:text-left"
            >
              {t("Пользовательское соглашение")}
            </LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

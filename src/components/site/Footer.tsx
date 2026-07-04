import { Link } from "@tanstack/react-router";
import logo from "@/assets/sofiya-logo.png.asset.json";
import { site, instagramLink, waLink } from "@/config/site";
import { categories } from "@/data/catalog";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";
import { Instagram, MessageCircle, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--foreground)] text-[color:var(--primary-foreground)]">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <img src={logo.url} alt="SOFIYA" className="h-14 w-auto brightness-0 invert" />
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            {site.brand} Sweet — сеть кофеен и пекарен Казахстана. Свежая выпечка, авторские торты и кофе каждый день.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={instagramLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-medium hover:bg-white/10">
              <Instagram className="h-4 w-4" /> {site.instagramHandle}
            </a>
            <a href={waLink("Здравствуйте, SOFIYA!")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-2 text-xs font-medium hover:bg-white/10">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Каталог</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 7).map((c) => (
              <li key={c.id}>
                <Link to="/catalog" search={{ cat: c.slug }} className="text-white/85 hover:text-[color:var(--gold)]">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Компания</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-white/85 hover:text-[color:var(--gold)]">О <SofiyaWordmark /></Link></li>
            <li><Link to="/stores" className="text-white/85 hover:text-[color:var(--gold)]">Магазины</Link></li>
            <li><Link to="/cake-preorder" className="text-white/85 hover:text-[color:var(--gold)]">Торты на заказ</Link></li>
            <li><Link to="/catering" className="text-white/85 hover:text-[color:var(--gold)]">Кейтеринг</Link></li>
            <li><Link to="/promotions" className="text-white/85 hover:text-[color:var(--gold)]">Акции</Link></li>
            <li><Link to="/news" className="text-white/85 hover:text-[color:var(--gold)]">Новости</Link></li>
            <li><Link to="/career" className="text-white/85 hover:text-[color:var(--gold)]">Карьера</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-white/60">Контакты</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2 items-start">
              <Phone className="h-4 w-4 mt-0.5 text-[color:var(--gold)]" />
              <a href={`tel:${site.whatsappDigits}`} className="text-white/85 hover:text-[color:var(--gold)]">{site.phone}</a>
            </li>
            <li className="flex gap-2 items-start">
              <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--gold)]" />
              <span className="text-white/85">{site.region}</span>
            </li>
          </ul>
          <div className="mt-5">
            <p className="text-xs uppercase tracking-widest text-white/50"><SofiyaWordmark /> Club — скоро</p>
            <div className="mt-2 flex gap-2">
              <span className="inline-flex items-center rounded-lg border border-white/25 px-3 py-2 text-xs">App Store · Скоро</span>
              <span className="inline-flex items-center rounded-lg border border-white/25 px-3 py-2 text-xs">Google Play · Скоро</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/55">
          <p>© {new Date().getFullYear()} <SofiyaWordmark /> Sweet. Все права защищены.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-white">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

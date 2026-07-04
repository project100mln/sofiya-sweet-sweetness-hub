export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  category: "promo" | "product" | "season" | "company" | "store" | "app";
  date: string;
  cover: string;
  summary: string;
  body: string;
  isPublished: boolean;
}

import { IMG } from "./catalog";

export const news: NewsItem[] = [
  {
    id: "n-club", slug: "sofiya-club-skoro",
    title: "SOFIYA Club — программа лояльности скоро в приложении",
    category: "app",
    date: "2026-06-15",
    cover: IMG.eclairs,
    summary: "Готовим цифровую карту клиента, персональный QR и подарки за покупки.",
    body: "Мы работаем над мобильным приложением SOFIYA Club. В нём появится цифровая карта, история покупок, бонусы и подарок «6-й кофе бесплатно». Следите за анонсами.",
    isPublished: true,
  },
  {
    id: "n-cake-preorder", slug: "torty-na-zakaz",
    title: "Оформите торт к вашему событию онлайн",
    category: "product",
    date: "2026-05-20",
    cover: IMG.cakeBerry,
    summary: "Пошаговая форма предзаказа — соберите торт по своему сценарию.",
    body: "Теперь оформить фирменный торт SOFIYA можно прямо на сайте: выбирайте размер, дату, точку самовывоза и надпись — заявка отправится нам в WhatsApp.",
    isPublished: true,
  },
  {
    id: "n-network", slug: "rastyom-po-turkistanu",
    title: "Растём по Туркестанской области",
    category: "company",
    date: "2026-04-10",
    cover: IMG.pastryMix,
    summary: "Новые пекарни SOFIYA в Ленгере, Сайраме, Аксукенте и Манкенте.",
    body: "SOFIYA продолжает расширять сеть пекарен и кофеен. Мы открылись в Ленгере, Сайраме, Аксукенте и Манкенте — заходите за свежей выпечкой и кофе.",
    isPublished: true,
  },
];

export const getNews = (slug: string) => news.find((n) => n.slug === slug);

import cakeBerry from "@/assets/cake-berry.jpg.asset.json";
import samsa from "@/assets/samsa.jpg.asset.json";
import eclairs from "@/assets/eclairs.jpg.asset.json";
import tartAssorti from "@/assets/tart-assorti.jpg.asset.json";
import beignets from "@/assets/beignets.jpg.asset.json";
import snickersCake from "@/assets/snickers-cake.jpg.asset.json";
import pastryMix from "@/assets/pastry-mix.jpg.asset.json";
import medovik from "@/assets/medovik.jpg.asset.json";
import type { Category, Product } from "./types";

export const IMG = {
  cakeBerry: cakeBerry.url,
  samsa: samsa.url,
  eclairs: eclairs.url,
  tartAssorti: tartAssorti.url,
  beignets: beignets.url,
  snickersCake: snickersCake.url,
  pastryMix: pastryMix.url,
  medovik: medovik.url,
};

export const categories: Category[] = [
  { id: "cakes", slug: "cakes", name: "Торты", short: "Праздничные и авторские", image: IMG.snickersCake },
  { id: "desserts", slug: "desserts", name: "Порционные десерты", short: "Тарты, пирожные, эклеры", image: IMG.tartAssorti },
  { id: "pastry", slug: "pastry", name: "Выпечка", short: "Свежая, каждый день", image: IMG.beignets },
  { id: "samsa", slug: "samsa", name: "Самса и сытная выпечка", short: "Слоёное тесто, ароматная начинка", image: IMG.samsa },
  { id: "pies", slug: "pies", name: "Пироги", short: "Домашние и праздничные", image: IMG.medovik },
  { id: "breakfast", slug: "breakfast", name: "Завтраки", short: "Утро в SOFIYA", image: IMG.pastryMix },
  { id: "pizza", slug: "pizza", name: "Пицца", short: "Для семьи и компании", image: IMG.eclairs },
  { id: "drinks", slug: "drinks", name: "Напитки", short: "Кофе, чай, лимонады", image: IMG.cakeBerry },
  { id: "gifts", slug: "gifts", name: "Подарочные наборы", short: "Сладкие сюрпризы", image: IMG.tartAssorti },
];

export const products: Product[] = [
  {
    id: "p-snickers", slug: "shokoladnyy-tort-snickers",
    name: "Шоколадный торт со Snickers",
    categoryId: "cakes",
    shortDescription: "Насыщенный шоколад, карамель и арахис",
    fullDescription: "Многослойный шоколадный торт с кремом со вкусом варёной сгущёнки, кусочками Snickers и шоколадной стружкой по бокам.",
    price: 4990, weight: null, servings: null,
    ingredients: ["Шоколадные коржи, карамель с арахисом и сметанный крем."],
    allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.snickersCake],
    isHero: true, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: true, isPublished: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (categoryId: string) =>
  products.filter((p) => p.categoryId === categoryId && p.isPublished);

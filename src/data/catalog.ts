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
    id: "p-berry-cake", slug: "yagodnyy-tort-sofiya",
    name: "Ягодный торт SOFIYA",
    categoryId: "cakes",
    shortDescription: "Нежный крем, свежая клубника и цитрусовые ноты",
    fullDescription: "Фирменный ягодный торт SOFIYA с воздушным кремом, свежей клубникой, дольками мандарина и лёгкой шоколадной глазурью по краю.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.cakeBerry],
    isHero: true, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: true, isPublished: true,
  },
  {
    id: "p-snickers", slug: "shokoladnyy-tort-snickers",
    name: "Шоколадный торт со Snickers",
    categoryId: "cakes",
    shortDescription: "Насыщенный шоколад, карамель и арахис",
    fullDescription: "Многослойный шоколадный торт с кремом со вкусом варёной сгущёнки, кусочками Snickers и шоколадной стружкой по бокам.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.snickersCake],
    isHero: true, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: true, isPublished: true,
  },
  {
    id: "p-medovik", slug: "medovik",
    name: "Медовик",
    categoryId: "cakes",
    shortDescription: "Классический медовый торт со сметанным кремом",
    fullDescription: "Тонкие медовые коржи, пропитанные сметанным кремом, с карамельной глазурью и грецкими орехами по краю.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.medovik],
    isHero: true, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-tart-assorti", slug: "tart-assorti",
    name: "Тарт-ассорти",
    categoryId: "desserts",
    shortDescription: "Четыре вкуса в одном: вишня, безе, шоколад, миндаль",
    fullDescription: "Ассорти из четырёх сегментов: творожный с вишней, безе с карамелью, шоколадный с орехами и миндально-абрикосовый.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.tartAssorti],
    isHero: true, isBestseller: false, isNew: true, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-eclairs", slug: "eklery-shokoladnye",
    name: "Эклеры шоколадные",
    categoryId: "desserts",
    shortDescription: "Заварное тесто, крем и глянцевая глазурь",
    fullDescription: "Классические эклеры с нежным заварным кремом, покрытые тёмной шоколадной глазурью и посыпкой из дроблёного арахиса.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.eclairs],
    isHero: false, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-samsa", slug: "samsa-s-myasom",
    name: "Самса с мясом",
    categoryId: "samsa",
    shortDescription: "Слоёное тесто, кунжут и ароматная начинка",
    fullDescription: "Хрустящая слоёная самса ручной работы, посыпанная белым и чёрным кунжутом, с сочной мясной начинкой.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.samsa],
    isHero: false, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-beignets", slug: "beignets-sofiya",
    name: "Beignets в сахарной пудре",
    categoryId: "pastry",
    shortDescription: "Воздушные пирожные с кремом внутри",
    fullDescription: "Нежные жареные пирожные с воздушной кремовой начинкой, щедро припудренные сахарной пудрой.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.beignets],
    isHero: false, isBestseller: false, isNew: true, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-pastry-mix", slug: "vypechka-assorti",
    name: "Выпечка-ассорти",
    categoryId: "pastry",
    shortDescription: "Кокос, шоколад, глазурь — ассорти на пробу",
    fullDescription: "Набор мини-выпечки SOFIYA: круассаны в кокосовой стружке, шоколадные роллы с орехами и классические слойки.",
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.pastryMix],
    isHero: false, isBestseller: true, isNew: false, isSeasonal: false, isPreorder: false, isPublished: true,
  },
  {
    id: "p-napoleon", slug: "napoleon-karamelnyy",
    name: "Наполеон карамельный",
    categoryId: "cakes",
    shortDescription: "Слоёные коржи и карамельный крем",
    fullDescription: null,
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.medovik],
    isHero: false, isBestseller: false, isNew: true, isSeasonal: false, isPreorder: true, isPublished: true,
  },
  {
    id: "p-matilda", slug: "matilda-cake",
    name: "Matilda Cake",
    categoryId: "cakes",
    shortDescription: "Тёмный шоколад и сливочный ганаш",
    fullDescription: null,
    price: null, weight: null, servings: null, ingredients: null, allergens: null,
    shelfLife: null, storage: null,
    images: [IMG.snickersCake],
    isHero: false, isBestseller: false, isNew: true, isSeasonal: false, isPreorder: true, isPublished: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (categoryId: string) =>
  products.filter((p) => p.categoryId === categoryId && p.isPublished);

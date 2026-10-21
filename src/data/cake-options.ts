import { products } from "@/data/catalog";
import { kkCatalogText } from "@/i18n/catalog";

export interface LocalizedOption {
  id: string;
  ru: string;
  kk: string;
}

// Snickers keeps its original form ID so drafts saved before the catalogue
// list was introduced still resolve to the same cake.
const LEGACY_CAKE_IDS: Record<string, string> = { "p-snickers": "snickers" };

// Every published cake from the catalogue is offered for preorder, in catalogue order.
export const CAKE_TYPES: LocalizedOption[] = [
  ...products
    .filter((product) => product.categoryId === "cakes" && product.isPublished)
    .map((product) => ({
      id: LEGACY_CAKE_IDS[product.id] ?? product.slug,
      ru: product.name,
      kk: kkCatalogText[product.name] ?? product.name,
    })),
  { id: "custom", ru: "Свой вариант", kk: "Өз нұсқам" },
];

export const SIZES: LocalizedOption[] = [
  { id: "1kg", ru: "1 кг", kk: "1 кг" },
  { id: "1-5kg", ru: "1,5 кг", kk: "1,5 кг" },
  { id: "2kg", ru: "2 кг", kk: "2 кг" },
  { id: "2-5kg", ru: "2,5 кг", kk: "2,5 кг" },
  { id: "3kg", ru: "3 кг", kk: "3 кг" },
  { id: "clarify", ru: "Уточнить", kk: "Нақтылау" },
];

export const CANDLES: LocalizedOption[] = [
  { id: "none", ru: "Не нужны", kk: "Қажет емес" },
  { id: "number", ru: "Цифра", kk: "Сан" },
  { id: "stars", ru: "Свечи-звёздочки", kk: "Жұлдызша шамдар" },
  { id: "classic", ru: "Классические", kk: "Классикалық" },
];

export const PACKAGING: LocalizedOption[] = [
  { id: "standard", ru: "Стандартная коробка", kk: "Стандартты қорап" },
  { id: "gift", ru: "Подарочная упаковка", kk: "Сыйлық қаптамасы" },
  { id: "none", ru: "Без упаковки", kk: "Қаптамасыз" },
];

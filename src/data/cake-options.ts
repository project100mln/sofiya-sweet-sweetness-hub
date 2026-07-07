import { products } from "./catalog";

const CAKE_TYPE_LABELS: Record<string, string> = {
  "yagodnyy-tort-sofiya": "Ягодный",
  "shokoladnyy-tort-snickers": "Шоколадный со Snickers",
  medovik: "Медовик",
  "napoleon-karamelnyy": "Наполеон карамельный",
  "matilda-cake": "Matilda Cake",
};

export const CAKE_TYPES = [
  ...products
    .filter((p) => p.categoryId === "cakes" && p.slug in CAKE_TYPE_LABELS)
    .map((p) => CAKE_TYPE_LABELS[p.slug]),
  "Свой вариант",
];

export const SIZES = ["1 кг", "1,5 кг", "2 кг", "2,5 кг", "3 кг", "Уточнить"];
export const CANDLES = ["Не нужны", "Цифра", "Свечи-звёздочки", "Классические"];
export const PACKAGING = ["Стандартная коробка", "Подарочная упаковка", "Без упаковки"];

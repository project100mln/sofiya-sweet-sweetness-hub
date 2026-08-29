export interface LocalizedOption {
  id: string;
  ru: string;
  kk: string;
}

export const CAKE_TYPES: LocalizedOption[] = [
  { id: "snickers", ru: "Сникерс", kk: "Сникерс" },
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

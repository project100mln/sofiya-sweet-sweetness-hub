export const STORE_CITIES = [
  { id: "shymkent", ru: "Шымкент", kk: "Шымкент" },
  { id: "lenger", ru: "Ленгер", kk: "Леңгір" },
  { id: "mankent", ru: "Манкент", kk: "Манкент" },
  { id: "aksukent", ru: "Аксукент", kk: "Ақсукент" },
] as const;

export type StoreCityId = (typeof STORE_CITIES)[number]["id"];

const cityIdByRussianName = Object.fromEntries(
  STORE_CITIES.map((city) => [city.ru, city.id]),
) as Record<string, StoreCityId>;

export function storeCityId(russianCityName: string): StoreCityId {
  const id = cityIdByRussianName[russianCityName];
  if (!id) throw new Error(`Unknown store city: ${russianCityName}`);
  return id;
}

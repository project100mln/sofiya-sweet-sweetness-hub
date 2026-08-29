import { news } from "@/data/news";
import { featuredPromotions } from "@/data/featured-promotions";
import { stores } from "@/data/stores";
import type { NewsItem, StoreRecord } from "@/data/types";
import type { PromotionCardContent } from "@/types/promotions";
import type { Locale } from "@/i18n";

export const siteRegionCopy = {
  ru: "Шымкент и Туркестанская область",
  kk: "Шымкент және Түркістан облысы",
} as const;

export function localizedSiteRegion(locale: Locale): string {
  return siteRegionCopy[locale];
}

export const promotionHoursPattern = {
  ru: "Ежедневно с {from} до {to}",
  kk: "Күн сайын {from} бастап –{to} дейін",
} as const;

export function formatPromotionHours(window: { from: string; to: string }, locale: Locale): string {
  return promotionHoursPattern[locale].replace("{from}", window.from).replace("{to}", window.to);
}

const kkNews: Record<string, Pick<NewsItem, "title" | "summary" | "body">> = {
  "n-club": {
    title: "SOFIYA Club — адалдық бағдарламасы жақында қолданбада",
    summary:
      "Клиенттің цифрлық картасын, жеке QR-кодты және сатып алуға берілетін сыйлықтарды дайындап жатырмыз.",
    body: "Біз SOFIYA Club мобильді қолданбасын әзірлеп жатырмыз. Онда цифрлық карта, сатып алу тарихы, бонустар және «6-шы кофе тегін» сыйлығы болады. Хабарландыруларды қадағалаңыз.",
  },
  "n-cake-preorder": {
    title: "Іс-шараңызға арналған тортты онлайн рәсімдеңіз",
    summary: "Алдын ала тапсырыстың қадамдық нысаны — тортты өз қалауыңыз бойынша құрастырыңыз.",
    body: "Енді SOFIYA фирмалық тортына тікелей сайтта тапсырыс беруге болады: өлшемін, күнін, алып кету дүкенін және жазуын таңдаңыз — өтінім бізге WhatsApp арқылы жіберіледі.",
  },
  "n-network": {
    title: "Түркістан облысында кеңейіп келеміз",
    summary: "Леңгір, Сайрам, Ақсукент және Манкенттегі жаңа SOFIYA дүкендері.",
    body: "SOFIYA фирмалық дүкендер желісін кеңейтуді жалғастыруда. Біз Леңгір, Сайрам, Ақсукент және Манкентте ашылдық — балғын пісірмелер мен десерттерге келіңіз.",
  },
};

const kkPromotions: Record<
  string,
  Pick<PromotionCardContent, "title" | "description" | "product_names">
> = {
  "featured-samsa-happy-hours": {
    title: "Тартылған етті самсалар",
    description:
      "Қытырлақ қамырдағы шырынды ет салмасы. Қайта-қайта жегіңіз келетін дәстүрлі дәм. Акцияға мини самса, №1 самса және пармуда самсасы қатысады.",
    product_names: ["Мини самса", "№1 самса", "Пармуда самсасы"],
  },
  "featured-pastry-happy-hours": {
    title: "Пісірменің үш түрі",
    description:
      "Сүйіспеншілікпен дайындалған нәзік әрі үлпілдек қамыр. Кез келген сәтке жарасады. Акцияға көкнәрлі тоқаш, классикалық круассан және жаңғақты тоқаш қатысады.",
    product_names: ["Көкнәрлі тоқаш", "Классикалық круассан", "Жаңғақты тоқаш"],
  },
};

const kkStoreText: Record<string, string> = {
  Шымкент: "Шымкент",
  Ленгер: "Леңгір",
  Аксукент: "Ақсукент",
  Манкент: "Манкент",
  "Енбекшинский р-н": "Еңбекші ауданы",
  "11 мкрн": "11-шағынаудан",
  "мкр. Улагат": "Ұлағат шағынауданы",
  "Верхний рынок": "Жоғарғы базар",
  "Каратауский район": "Қаратау ауданы",
  Центр: "Орталық",
  "ж/м Сайрам": "Сайрам тұрғын алабы",
  "проспект Тауке хана, 214": "Тәуке хан даңғылы, 214",
  "улица Капал батыра, 2Б": "Қапал батыр көшесі, 2Б",
  "ТРЦ «Бекжан», улица Жиделибайсын, 92": "«Бекжан» СОО, Жиделібайсын көшесі, 92",
  "улица Уалиханова, 213/13": "Уәлиханов көшесі, 213/13",
  "проспект Момышулы, 7": "Момышұлы даңғылы, 7",
  "улица Жибек жолы, 581/1": "Жібек жолы көшесі, 581/1",
  "улица Жумабека Ташенова, 3/2": "Жұмабек Тәшенов көшесі, 3/2",
  "улица Амира Темира, 237/9": "Әмір Темір көшесі, 237/9",
  "улица Ибрагим Ата, 45/5": "Ибрагим ата көшесі, 45/5",
  "улица Рыскулбекова, 16/2": "Рысқұлбеков көшесі, 16/2",
  "улица Толе би, 254": "Төле би көшесі, 254",
  "улица Толе би, 46": "Төле би көшесі, 46",
  "проспект Астана, 7": "Астана даңғылы, 7",
  "проспект Улы Жибек Жолы, 60": "Ұлы Жібек жолы даңғылы, 60",
  "улица Амира Темура, 237/19": "Әмір Темір көшесі, 237/19",
  "улица Жамал апа, 1": "Жамал апа көшесі, 1",
  "улица Юсуфа Сареми, 66А": "Юсуф Сареми көшесі, 66А",
  "ж/м Сайрам, рынок Сайрам": "Сайрам тұрғын алабы, Сайрам базары",
  "напротив «Жеті тандыр»": "«Жеті тандырға» қарама-қарсы",
  "рядом с базарчиком": "базардың жанында",
  "рядом с автостоянкой": "автотұрақтың жанында",
  "напротив НИК": "НИК-ке қарама-қарсы",
  "рынок «Нур Сайрам»": "«Нұр Сайрам» базары",
  Кафе: "Кафе",
  Выпечка: "Пісірмелер",
  "Кофе с собой": "Өзіңізбен алып кететін кофе",
  Пекарня: "Наубайхана",
  Кондитерская: "Кондитерлік дүкен",
};

function storeText(value: string | null): string | null {
  if (value == null) return null;
  const translated = kkStoreText[value];
  if (translated === undefined) throw new Error(`Missing Kazakh store translation: ${value}`);
  return translated;
}

export function localizeNewsItem(item: NewsItem, locale: Locale): NewsItem {
  if (locale === "ru") return item;
  const translated = kkNews[item.id];
  if (!translated) throw new Error(`Missing Kazakh news translation: ${item.id}`);
  return { ...item, ...translated };
}

export function localizePromotion(
  item: PromotionCardContent,
  locale: Locale,
): PromotionCardContent {
  if (locale === "ru") return item;
  const translated = kkPromotions[item.id];
  if (!translated) throw new Error(`Missing Kazakh promotion translation: ${item.id}`);
  return { ...item, ...translated };
}

export function localizeStore(store: StoreRecord, locale: Locale): StoreRecord {
  if (locale === "ru") return store;
  return {
    ...store,
    city: storeText(store.city)!,
    district: storeText(store.district),
    address: storeText(store.address)!,
    landmark: storeText(store.landmark),
    services: store.services.map((service) => storeText(service)!),
  };
}

export function getLocalizedContent(locale: Locale) {
  return {
    news: news.map((item) => localizeNewsItem(item, locale)),
    promotions: featuredPromotions.map((item) => localizePromotion(item, locale)),
    stores: stores.map((store) => localizeStore(store, locale)),
  };
}

// Centralized branding / logo configuration.
// Меняйте логотипы и их поведение здесь — компоненты трогать не нужно.
import markHeart from "@/assets/sofiya-wordmark.png";
import markRound from "@/assets/sofiya-logo.png";
import markRoundTransparent from "@/assets/sofiya-logo-footer.png";

/** Все доступные варианты логотипа. Добавьте новый ассет и запись здесь. */
export const logoSources = {
  /** Надпись «SOFIYA» с сердечком (прозрачный фон) */
  wordmark: markHeart,
  /** Круглый логотип-эмблема */
  round: markRound,
  /** Круглый логотип-эмблема на прозрачном фоне для тёмных поверхностей */
  roundTransparent: markRoundTransparent,
} as const;

export type LogoVariant = keyof typeof logoSources;

/** Переключатели: какой вариант где используется. */
export const branding = {
  /** Логотип в шапке (десктоп + мобильное меню) */
  headerLogo: "round" as LogoVariant,
  /** Логотип в футере */
  footerLogo: "roundTransparent" as LogoVariant,
  /** Логотип, который подставляется вместо слова «SOFIYA» в текстах */
  inlineWordmark: "wordmark" as LogoVariant,

  /** Alt-текст для всех логотипов (важно для SEO) */
  alt: "SOFIYA",

  /** Размеры / классы — тоже настраиваются без правки компонентов */
  classes: {
    header: "h-10 md:h-12 w-auto",
    headerMobile: "h-10 w-auto",
    /** Футер на тёмном фоне: прозрачная версия сохраняет фирменный фиолетовый */
    footer: "h-14 w-auto",
    /** Инлайн-логотип внутри строки текста */
    inline: "inline-block h-[1.4em] w-auto shrink-0",
  },
} as const;

export const logoUrl = (variant: LogoVariant) => logoSources[variant];

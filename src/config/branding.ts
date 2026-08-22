// Centralized branding / logo configuration.
// Меняйте логотипы и их поведение здесь — компоненты трогать не нужно.
import originalSHeaderLogo from "@/assets/sofiya-logo-s-original.png";
import originalSMark from "@/assets/sofiya-mark-s-original.png";
import approvedWordmark from "@/assets/sofiya-wordmark-approved.png";
import markRound from "@/assets/sofiya-logo.png";
import markRoundTransparent from "@/assets/sofiya-logo-footer.png";

/** Все доступные варианты логотипа. Добавьте новый ассет и запись здесь. */
export const logoSources = {
  /** Оригинальный горизонтальный логотип с эмблемой-буквой S для светлой шапки */
  originalSHeader: originalSHeaderLogo,
  /** Оригинальная эмблема-буква S без надписи */
  originalSMark,
  /** Надпись «SOFIYA» с сердечком (прозрачный фон) */
  wordmark: approvedWordmark,
  /** Круглый логотип-эмблема */
  round: markRound,
  /** Круглый логотип-эмблема на прозрачном фоне для тёмных поверхностей */
  roundTransparent: markRoundTransparent,
} as const;

export type LogoVariant = keyof typeof logoSources;

/** Переключатели: какой вариант где используется. */
export const branding = {
  /** Логотип в шапке (десктоп + мобильное меню) */
  headerLogo: "originalSHeader" as LogoVariant,
  /** Логотип в футере */
  footerLogo: "roundTransparent" as LogoVariant,
  /** Логотип, который подставляется вместо слова «SOFIYA» в текстах */
  inlineWordmark: "wordmark" as LogoVariant,

  /** Alt-текст для всех логотипов (важно для SEO) */
  alt: "SOFIYA",

  /** Размеры / классы — тоже настраиваются без правки компонентов */
  classes: {
    header: "h-12 w-auto md:h-[4.5rem]",
    headerMobile: "h-12 w-auto",
    /** Футер на тёмном фоне: прозрачная версия сохраняет фирменный фиолетовый */
    footer: "h-14 w-auto",
    /** Инлайн-логотип внутри строки текста */
    inline: "inline-block h-[1.4em] w-auto shrink-0",
  },
} as const;

export const logoUrl = (variant: LogoVariant) => logoSources[variant];

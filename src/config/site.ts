// Centralized business configuration for SOFIYA Sweet
export const site = {
  brand: "SOFIYA",
  tagline: "Sweet • Cafe & Bakery",
  legalName: "SOFIYA Sweet",
  domain: "",
  instagramUrl: "https://www.instagram.com/sofiya_sweet.kz",
  instagramHandle: "@sofiya_sweet.kz",
  // WhatsApp: user supplied +77075580605
  whatsapp: "+77075580605",
  whatsappDigits: "77075580605",
  phone: "+7 707 558 06 05",
  email: "",
  region: "Шымкент и Туркестанская область",
} as const;

export const waLink = (message: string) =>
  site.whatsappDigits
    ? `https://wa.me/${site.whatsappDigits}?text=${encodeURIComponent(message)}`
    : "";

export const instagramLink = site.instagramUrl;

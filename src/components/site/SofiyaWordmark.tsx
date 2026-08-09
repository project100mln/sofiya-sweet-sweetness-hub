import { branding, logoUrl } from "@/config/branding";

export function SofiyaWordmark({ className }: { className?: string }) {
  return (
    <img
      src={logoUrl(branding.inlineWordmark)}
      alt={branding.alt}
      className={`${branding.classes.inline} ${className ?? ""}`}
    />
  );
}

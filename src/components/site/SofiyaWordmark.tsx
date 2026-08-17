import { branding, logoUrl } from "@/config/branding";

export function SofiyaWordmark({
  className,
  placement = "baseline",
}: {
  className?: string;
  placement?: "baseline" | "center";
}) {
  const alignment =
    placement === "center"
      ? "relative top-0 self-center align-middle"
      : "relative -top-[0.08em] align-middle";

  return (
    <img
      src={logoUrl(branding.inlineWordmark)}
      alt={branding.alt}
      className={`${branding.classes.inline} ${alignment} ${className ?? ""}`}
    />
  );
}

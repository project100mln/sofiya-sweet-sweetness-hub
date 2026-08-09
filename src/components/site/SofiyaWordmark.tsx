import wordmark from "@/assets/sofiya-wordmark.png.asset.json";

export function SofiyaWordmark({ className }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="SOFIYA"
      className={`inline-block h-[1.4em] w-auto align-[-0.3em] ${className ?? ""}`}
    />
  );
}

import wordmark from "@/assets/sofiya-wordmark.png.asset.json";

export function SofiyaWordmark({ className }: { className?: string }) {
  return (
    <img
      src={wordmark.url}
      alt="SOFIYA"
      className={`inline-block h-[1em] w-auto align-[-0.12em] ${className ?? ""}`}
    />
  );
}

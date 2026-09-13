import { Fragment } from "react";
import { SofiyaWordmark } from "@/components/site/SofiyaWordmark";

export function SofiyaBrandText({
  text,
  wordmarkClassName,
  placement = "baseline",
}: {
  text: string;
  wordmarkClassName?: string;
  placement?: "baseline" | "center";
}) {
  const parts = text.split("SOFIYA");

  if (parts.length === 1) return text;

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={`${index}-${part}`}>
          {index > 0 && <SofiyaWordmark className={wordmarkClassName} placement={placement} />}
          {part}
        </Fragment>
      ))}
    </>
  );
}

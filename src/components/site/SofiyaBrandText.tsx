export function SofiyaBrandText({
  text,
}: {
  text: string;
  /**
   * Kept temporarily so existing call sites remain backwards compatible while
   * brand mentions are rendered as readable text inside sentences.
   */
  wordmarkClassName?: string;
  placement?: "baseline" | "center";
}) {
  return text;
}

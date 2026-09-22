import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SofiyaBrandText } from "@/components/site/SofiyaBrandText";

describe("SofiyaBrandText", () => {
  it("keeps copy without the brand name unchanged", () => {
    expect(renderToStaticMarkup(createElement(SofiyaBrandText, { text: "Свежая выпечка" }))).toBe(
      "Свежая выпечка",
    );
  });

  it("keeps SOFIYA readable text when it appears inside a sentence", () => {
    const markup = renderToStaticMarkup(
      createElement(SofiyaBrandText, { text: "SOFIYA — магазины SOFIYA" }),
    );

    expect(markup).toBe("SOFIYA — магазины SOFIYA");
    expect(markup).not.toContain("<img");
  });
});

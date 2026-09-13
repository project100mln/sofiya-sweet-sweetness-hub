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

  it("replaces every visible SOFIYA mention with the approved wordmark", () => {
    const markup = renderToStaticMarkup(
      createElement(SofiyaBrandText, { text: "SOFIYA — магазины SOFIYA" }),
    );

    expect(markup.match(/alt="SOFIYA"/g)).toHaveLength(2);
    expect(markup).toContain("sofiya-wordmark-approved");
    expect(markup).toContain(" — магазины ");
  });
});

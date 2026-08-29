import { describe, expect, it } from "vitest";
import { errorPageCopy, localeForRequest, renderErrorPage } from "@/lib/error-page";

describe("localized catastrophic error page", () => {
  it("renders Russian errors and a Russian home target for source-locale URLs", () => {
    const html = renderErrorPage("ru");

    expect(html).toContain('<html lang="ru-KZ">');
    expect(html).toContain(`<title>${errorPageCopy.ru.title}</title>`);
    expect(html).toContain(errorPageCopy.ru.description);
    expect(html).toContain(`>${errorPageCopy.ru.retry}</button>`);
    expect(html).toContain(`href="/">${errorPageCopy.ru.home}</a>`);
    expect(html).not.toContain("This page didn't load");
  });

  it("renders Kazakh errors and keeps users inside the Kazakh route family", () => {
    const html = renderErrorPage("kk");

    expect(html).toContain('<html lang="kk-KZ">');
    expect(html).toContain(`<title>${errorPageCopy.kk.title}</title>`);
    expect(html).toContain(errorPageCopy.kk.description);
    expect(html).toContain(`>${errorPageCopy.kk.retry}</button>`);
    expect(html).toContain(`href="/kk">${errorPageCopy.kk.home}</a>`);
    expect(html).not.toContain("Something went wrong");
  });

  it("derives the fallback locale from the failing request URL", () => {
    expect(localeForRequest(new Request("https://sofiya.kz/catalog"))).toBe("ru");
    expect(localeForRequest(new Request("https://sofiya.kz/kk/catalog"))).toBe("kk");
  });
});

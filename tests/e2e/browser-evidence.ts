import type { Page } from "@playwright/test";

export function collectBrowserErrors(page: Page): string[] {
  const errors: string[] = [];
  const isFirstParty = (url: string) => {
    const requestOrigin = new URL(url).origin;
    const currentUrl = page.url();
    if (/^https?:/.test(currentUrl)) return requestOrigin === new URL(currentUrl).origin;
    return requestOrigin === "http://127.0.0.1:4173";
  };
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    if (isFirstParty(response.url()) && response.status() >= 400) {
      errors.push(`response: ${response.status()} ${response.url()}`);
    }
  });
  page.on("requestfailed", (request) => {
    const failure = request.failure()?.errorText ?? "unknown failure";
    if (isFirstParty(request.url()) && !failure.includes("ERR_ABORTED")) {
      errors.push(`requestfailed: ${failure} ${request.url()}`);
    }
  });
  return errors;
}

export async function installPopupRecorder(page: Page) {
  await page.addInitScript(() => {
    const target = window as Window & { __externalPopupUrls?: string[] };
    target.__externalPopupUrls = [];
    window.open = (url) => {
      target.__externalPopupUrls?.push(String(url));
      return null;
    };
  });
}

export async function recordedPopupUrls(page: Page): Promise<string[]> {
  return page.evaluate(
    () => (window as Window & { __externalPopupUrls?: string[] }).__externalPopupUrls ?? [],
  );
}

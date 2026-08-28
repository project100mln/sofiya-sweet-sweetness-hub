import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";

const root = process.cwd();
const outputPath = path.join(root, "docs/i18n/KK_TRANSLATION_REGISTER.tsv");
const rows = [];
const seen = new Set();

const formRoutePattern = /src\/routes\/(?:cake-preorder|career|catering|contacts)\.tsx/;

function isLegalFormHandoff(section, context, id, ru) {
  if (!formRoutePattern.test(context)) return false;
  if (section === "conditional-ui") return ru.includes("\nТелефон:");
  return section === "ui-message" && id.startsWith("Проверьте готовый текст");
}

function reviewStatus(section, context, id, ru) {
  return /(?:privacy|terms|legal|құпиялық|келісім)/i.test(`${section} ${context} ${id}`) ||
    isLegalFormHandoff(section, context, id, ru)
    ? "DRAFT_REQUIRES_KK_LEGAL_AND_EDITORIAL"
    : "DRAFT_REQUIRES_KK_EDITORIAL";
}

function add(section, context, id, ru, kk) {
  if (typeof ru !== "string" || typeof kk !== "string") {
    throw new Error(`${section} ${context} ${id}: translation pair must contain two strings`);
  }
  if (!ru.trim() || !kk.trim()) {
    throw new Error(`${section} ${context} ${id}: translation pair must not be empty`);
  }
  if (
    (ru.startsWith("/") && kk.startsWith("/")) ||
    /^(?:ru|kk)[_-]KZ$/.test(ru) ||
    /^(?:ru|kk)[_-]KZ$/.test(kk)
  ) {
    return;
  }
  const key = [section, context, id, ru, kk].join("\0");
  if (seen.has(key)) return;
  seen.add(key);
  rows.push({ section, context, id, ru, kk, status: reviewStatus(section, context, id, ru) });
}

function sourceFile(file) {
  const absolute = path.join(root, file);
  const text = fs.readFileSync(absolute, "utf8");
  const source = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const bindings = new Map();
  const visit = (node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      bindings.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return { file, absolute, text, source, bindings };
}

function propertyName(node, source) {
  if (!node) return undefined;
  if (ts.isIdentifier(node) || ts.isStringLiteralLike(node) || ts.isNumericLiteral(node)) {
    return node.text;
  }
  if (ts.isComputedPropertyName(node) && ts.isStringLiteralLike(node.expression)) {
    return node.expression.text;
  }
  return node.getText(source);
}

function templateText(node, source) {
  if (ts.isNoSubstitutionTemplateLiteral(node) || ts.isStringLiteralLike(node)) return node.text;
  if (!ts.isTemplateExpression(node)) return undefined;
  let value = node.head.text;
  for (const span of node.templateSpans) {
    value += `\${${span.expression.getText(source)}}${span.literal.text}`;
  }
  return value;
}

function unwrap(node) {
  let current = node;
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function evaluator(parsed) {
  const stack = new Set();
  const normalizeJsxText = (value) =>
    value
      .replace(/\r/g, "")
      .replace(/[ \t]*\n[ \t]*/g, "\n")
      .replace(/\n+/g, "\n")
      .replace(/[ \t]+/g, " ")
      .trim();
  const evaluate = (input) => {
    if (!input) return undefined;
    const node = unwrap(input);
    const template = templateText(node, parsed.source);
    if (template !== undefined) return template;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isPrefixUnaryExpression(node) && ts.isNumericLiteral(node.operand)) {
      return node.operator === ts.SyntaxKind.MinusToken
        ? -Number(node.operand.text)
        : Number(node.operand.text);
    }
    if (ts.isIdentifier(node)) {
      const binding = parsed.bindings.get(node.text);
      if (!binding || stack.has(node.text)) return undefined;
      stack.add(node.text);
      const value = evaluate(binding);
      stack.delete(node.text);
      return value;
    }
    if (ts.isArrayLiteralExpression(node)) {
      return node.elements.flatMap((element) => {
        if (ts.isSpreadElement(element)) {
          const spread = evaluate(element.expression);
          return Array.isArray(spread) ? spread : [];
        }
        return [evaluate(element)];
      });
    }
    if (ts.isObjectLiteralExpression(node)) {
      const value = {};
      for (const property of node.properties) {
        if (ts.isSpreadAssignment(property)) {
          const spread = evaluate(property.expression);
          if (spread && typeof spread === "object" && !Array.isArray(spread)) {
            Object.assign(value, spread);
          }
          continue;
        }
        if (ts.isPropertyAssignment(property)) {
          value[propertyName(property.name, parsed.source)] = evaluate(property.initializer);
        } else if (ts.isShorthandPropertyAssignment(property)) {
          value[property.name.text] = evaluate(property.name);
        }
      }
      return value;
    }
    if (ts.isJsxText(node)) return node.text;
    if (ts.isJsxExpression(node)) return evaluate(node.expression);
    if (ts.isJsxSelfClosingElement(node)) {
      return node.tagName.getText(parsed.source) === "br" ? "\n" : "";
    }
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      return normalizeJsxText(
        node.children
          .map((child) => evaluate(child))
          .filter((child) => typeof child === "string")
          .join(""),
      );
    }
    return undefined;
  };
  return evaluate;
}

function variable(parsed, name) {
  const node = parsed.bindings.get(name);
  if (!node) throw new Error(`${parsed.file}: missing variable ${name}`);
  const value = evaluator(parsed)(node);
  if (value === undefined) throw new Error(`${parsed.file}: cannot evaluate variable ${name}`);
  return value;
}

function align(section, context, id, ru, kk, trail = "") {
  if (typeof ru === "string" && typeof kk === "string") {
    add(section, context, `${id}${trail}`, ru, kk);
    return;
  }
  if (Object.is(ru, kk) && (ru == null || typeof ru === "number" || typeof ru === "boolean")) {
    return;
  }
  if (Array.isArray(ru) || Array.isArray(kk)) {
    if (!Array.isArray(ru) || !Array.isArray(kk) || ru.length !== kk.length) {
      throw new Error(`${section} ${context} ${id}${trail}: translation array shape mismatch`);
    }
    for (let index = 0; index < ru.length; index += 1) {
      align(section, context, id, ru[index], kk[index], `${trail}[${index}]`);
    }
    return;
  }
  if (
    ru &&
    kk &&
    typeof ru === "object" &&
    typeof kk === "object" &&
    !Array.isArray(ru) &&
    !Array.isArray(kk)
  ) {
    const ruKeys = Object.keys(ru).sort();
    const kkKeys = Object.keys(kk).sort();
    if (JSON.stringify(ruKeys) !== JSON.stringify(kkKeys)) {
      throw new Error(
        `${section} ${context} ${id}${trail}: translation object keys mismatch (${ruKeys.join(", ")} vs ${kkKeys.join(", ")})`,
      );
    }
    for (const key of ruKeys) align(section, context, id, ru[key], kk[key], `${trail}.${key}`);
    return;
  }
  throw new Error(`${section} ${context} ${id}${trail}: translation value types do not align`);
}

function collectBilingualObjects(value, section, context, trail = "") {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectBilingualObjects(item, section, context, `${trail}[${index}]`),
    );
    return;
  }
  const id = typeof value.id === "string" ? value.id : trail || "entry";
  if ("ru" in value || "kk" in value) {
    if (typeof value.ru === "string" || typeof value.kk === "string") {
      add(section, context, id, value.ru, value.kk);
    } else if (value.ru && value.kk) {
      align(section, context, id, value.ru, value.kk);
    } else {
      throw new Error(`${section} ${context} ${id}: incomplete ru/kk structured pair`);
    }
  }
  if ("label" in value || "labelKk" in value) {
    add(section, context, id, value.label, value.labelKk);
  }
  for (const [key, child] of Object.entries(value)) {
    if (key !== "ru" && key !== "kk") {
      collectBilingualObjects(child, section, context, `${trail}.${key}`);
    }
  }
}

function collectSourceCallsAndConditionals(parsed) {
  const evaluate = evaluator(parsed);
  const relative = parsed.file;
  const userFacingAttributes = new Set([
    "alt",
    "aria-description",
    "aria-label",
    "aria-roledescription",
    "placeholder",
    "title",
  ]);
  const enclosingJsxAttribute = (input) => {
    let current = input.parent;
    while (current && !ts.isJsxAttribute(current)) {
      if (ts.isJsxElement(current) || ts.isJsxFragment(current)) return undefined;
      current = current.parent;
    }
    return current;
  };
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "pick" &&
      node.arguments.length === 2
    ) {
      const position = parsed.source.getLineAndCharacterOfPosition(node.getStart());
      add(
        "dynamic-ui",
        `${relative}:${position.line + 1}`,
        "pick",
        evaluate(node.arguments[0]),
        evaluate(node.arguments[1]),
      );
    }
    if (
      ts.isConditionalExpression(node) &&
      /locale\s*===\s*["']kk["']/.test(node.condition.getText(parsed.source))
    ) {
      const attribute = enclosingJsxAttribute(node);
      const attributeName = attribute ? propertyName(attribute.name, parsed.source) : undefined;
      if (!attributeName || userFacingAttributes.has(attributeName)) {
        const position = parsed.source.getLineAndCharacterOfPosition(node.getStart());
        const ru = evaluate(node.whenFalse);
        const kk = evaluate(node.whenTrue);
        const unevaluable = ru === undefined || kk === undefined || (ru === "" && kk === "");
        if (unevaluable) {
          if (attributeName && userFacingAttributes.has(attributeName)) {
            throw new Error(
              `${relative}:${position.line + 1}: cannot evaluate user-facing ${attributeName} locale branch`,
            );
          }
        } else {
          align("conditional-ui", `${relative}:${position.line + 1}`, "locale-branch", ru, kk);
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(parsed.source);
}

const allSourceFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (/\.tsx?$/.test(entry.name)) allSourceFiles.push(path.relative(root, target));
  }
}
walk(path.join(root, "src"));

const parsedFiles = new Map(allSourceFiles.map((file) => [file, sourceFile(file)]));

const liveContexts = new Map();
for (const parsed of parsedFiles.values()) {
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "t" &&
      node.arguments.length === 1 &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      const key = node.arguments[0].text;
      const position = parsed.source.getLineAndCharacterOfPosition(node.getStart());
      const contexts = liveContexts.get(key) ?? [];
      contexts.push(`${parsed.file}:${position.line + 1}`);
      liveContexts.set(key, contexts);
    }
    ts.forEachChild(node, visit);
  };
  visit(parsed.source);
  collectSourceCallsAndConditionals(parsed);
}

const messages = variable(parsedFiles.get("src/i18n/messages.ts"), "uiMessages");
for (const [key, message] of Object.entries(messages)) {
  add("ui-message", (liveContexts.get(key) ?? []).join("; "), key, message.ru, message.kk);
}

const catalogTranslations = variable(parsedFiles.get("src/i18n/catalog.ts"), "kkCatalogText");
for (const [ru, kk] of Object.entries(catalogTranslations)) {
  add("catalog", "src/i18n/catalog.ts", ru, ru, kk);
}

const content = parsedFiles.get("src/i18n/content.ts");
const promotionHours = variable(content, "promotionHoursPattern");
align(
  "structured-ui",
  "/promotions/{slug}#hours",
  "promotion-hours",
  promotionHours.ru,
  promotionHours.kk,
);
const storeTranslations = variable(content, "kkStoreText");
for (const [ru, kk] of Object.entries(storeTranslations)) {
  add("store", "src/i18n/content.ts", ru, ru, kk);
}

const baseNews = variable(parsedFiles.get("src/data/news.ts"), "news");
const kkNews = variable(content, "kkNews");
for (const item of baseNews) {
  const translated = kkNews[item.id];
  if (!translated) throw new Error(`Missing Kazakh news register entry: ${item.id}`);
  for (const field of ["title", "summary", "body"]) {
    add(
      "news",
      `/news/${item.slug}#${field}`,
      `${item.id}.${field}`,
      item[field],
      translated[field],
    );
  }
}

const basePromotions = variable(
  parsedFiles.get("src/data/featured-promotions.ts"),
  "featuredPromotions",
);
const kkPromotions = variable(content, "kkPromotions");
for (const item of basePromotions) {
  const translated = kkPromotions[item.id];
  if (!translated) throw new Error(`Missing Kazakh promotion register entry: ${item.id}`);
  add(
    "promotion",
    `/promotions/${item.slug}#title`,
    `${item.id}.title`,
    item.title,
    translated.title,
  );
  add(
    "promotion",
    `/promotions/${item.slug}#description`,
    `${item.id}.description`,
    item.description,
    translated.description,
  );
  align(
    "promotion",
    `/promotions/${item.slug}#products`,
    `${item.id}.product_names`,
    item.product_names,
    translated.product_names,
  );
}

const seoFile = parsedFiles.get("src/i18n/seo.ts");
const seo = variable(seoFile, "staticSeoCopy");
for (const [route, copy] of Object.entries(seo)) {
  align("seo", route, route, copy.ru, copy.kk);
}
const dynamicSeo = variable(seoFile, "dynamicSeoCopy");
for (const [surface, copy] of Object.entries(dynamicSeo)) {
  align("dynamic-seo", `${surface} detail metadata`, surface, copy.ru, copy.kk);
}

const errorPage = variable(parsedFiles.get("src/lib/error-page.ts"), "errorPageCopy");
align("error-page", "catastrophic HTTP 500", "error-page", errorPage.ru, errorPage.kk);

for (const file of [
  "src/config/navigation.ts",
  "src/data/cake-options.ts",
  "src/data/catering-services.ts",
  "src/data/store-cities.ts",
  "src/routes/career.tsx",
]) {
  const parsed = parsedFiles.get(file);
  const evaluate = evaluator(parsed);
  for (const [name, node] of parsed.bindings) {
    collectBilingualObjects(evaluate(node), "structured-ui", `${file}#${name}`);
  }
}

const hero = parsedFiles.get("src/components/site/HeroCarousel.tsx");
for (const [index, slide] of variable(hero, "slides").entries()) {
  if (!slide?.kk) throw new Error(`Hero slide ${index + 1} is missing Kazakh copy`);
  for (const field of ["eyebrow", "title", "desc", "cta", "imageAlt"]) {
    if (typeof slide[field] !== "string" || typeof slide.kk[field] !== "string") {
      throw new Error(`Hero slide ${index + 1} is missing an exportable bilingual ${field}`);
    }
    add(
      "hero",
      `/#slide-${index + 1}`,
      `slide-${index + 1}.${field}`,
      slide[field],
      slide.kk[field],
    );
  }
}

const cake = parsedFiles.get("src/routes/cake-preorder.tsx");
align(
  "cake-steps",
  "/cake-preorder",
  "step",
  variable(cake, "STEPS_RU"),
  variable(cake, "STEPS_KK"),
);

const siteRegion = variable(content, "siteRegionCopy");
align(
  "structured-ui",
  "src/i18n/content.ts#siteRegionCopy",
  "site.region",
  siteRegion.ru,
  siteRegion.kk,
);

const utilityClassPattern =
  /(?:^|\s)(?:(?:hover|focus|active|disabled|sm|md|lg|xl):)*(?:bg|text|border|rounded|px|py|mx|my|flex|grid|hidden|block)-[^\s]+/;
const technicalRow = rows.find(
  (row) => utilityClassPattern.test(row.ru) || utilityClassPattern.test(row.kk),
);
if (technicalRow) {
  throw new Error(
    `Translation register contains a utility-class token: ${technicalRow.context} ${technicalRow.id}`,
  );
}

const legalFormHandoffs = rows.filter((row) =>
  isLegalFormHandoff(row.section, row.context, row.id, row.ru),
);
if (
  legalFormHandoffs.length !== 8 ||
  legalFormHandoffs.some((row) => row.status !== "DRAFT_REQUIRES_KK_LEGAL_AND_EDITORIAL")
) {
  throw new Error(
    `Expected 8 legal+editorial form hand-off rows, found ${legalFormHandoffs.length}`,
  );
}

rows.sort((a, b) =>
  [a.section, a.context, a.id, a.ru]
    .join("\0")
    .localeCompare([b.section, b.context, b.id, b.ru].join("\0"), "ru"),
);

function cell(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("\t", "\\t").replaceAll("\n", "\\n");
}

const header = ["section", "context", "id", "ru_source", "kk_draft", "review_status"];
const output = `${[
  header,
  ...rows.map((row) => [row.section, row.context, row.id, row.ru, row.kk, row.status]),
]
  .map((row) => row.map(cell).join("\t"))
  .join("\n")}\n`;

if (process.argv.includes("--check")) {
  const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
  if (current !== output) {
    console.error("Kazakh translation register is stale. Run: npm run review:kk:export");
    process.exit(1);
  }
  console.log(`Kazakh translation register is current: ${rows.length} review rows.`);
} else {
  fs.writeFileSync(outputPath, output);
  console.log(`Wrote ${path.relative(root, outputPath)} with ${rows.length} review rows.`);
}

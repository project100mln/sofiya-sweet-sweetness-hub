import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const files = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\0")
  .filter(Boolean)
  .filter(existsSync)
  .filter((file) => !/\.(jpg|jpeg|png|gif|ico|lock)$/i.test(file));

const signatures = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:service_role|secret)["']?\s*[:=]\s*["'][A-Za-z0-9._-]{20,}/i,
  /sk_(?:live|test)_[A-Za-z0-9]{20,}/,
  /gh[opsu]_[A-Za-z0-9]{30,}/,
];

const findings = [];
for (const file of files) {
  const content = readFileSync(file, "utf8");
  if (signatures.some((signature) => signature.test(content))) findings.push(file);
}

if (findings.length) {
  console.error(`Potential secrets found in: ${findings.join(", ")}`);
  process.exit(1);
}

console.log(`Secret scan passed (${files.length} tracked text files checked).`);

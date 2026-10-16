// GitHub Pages é estático: /dna precisa do próprio index.html (senão dá 404),
// com título/descrição próprios pro preview do link no WhatsApp.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const OUT = "dist/public";
const TITLE = "DNA NoraLabs — o nosso jeito de construir";
const DESC =
  "A cultura da NoraLabs: como a gente pensa, trabalha e constrói sistemas sob medida junto com quem usa.";

const html = readFileSync(`${OUT}/index.html`, "utf8");
const homeTitle = html.match(/<title>([^<]+)<\/title>/)?.[1];
const homeDesc = html.match(/name="description"\s+content="([^"]+)"/)?.[1];
if (!homeTitle || !homeDesc) throw new Error("dna-page: título/descrição da home não encontrados no index.html");

const dna = html
  .replaceAll(homeTitle, TITLE)
  .replaceAll(homeDesc, DESC)
  .replace('content="https://noralabs.co"', 'content="https://noralabs.co/dna"');

mkdirSync(`${OUT}/dna`, { recursive: true });
writeFileSync(`${OUT}/dna/index.html`, dna);
console.log("dna-page: dist/public/dna/index.html gerado");

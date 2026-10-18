// Verifica que cada <script> inline del build esté permitido por la CSP de vercel.json.
// Si alguien edita el script inline de index.html, esto falla en CI en vez de romper el sitio en producción.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
const csp = vercel.headers
  .flatMap((rule) => rule.headers)
  .find((header) => header.key === 'Content-Security-Policy')?.value;

if (!csp) {
  console.error('No se encontró Content-Security-Policy en vercel.json');
  process.exit(1);
}

const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)]
  // JSON-LD no se ejecuta, la CSP no lo bloquea
  .filter(([, attrs]) => !attrs.includes('application/ld+json'));

let failed = false;
for (const [, , body] of inlineScripts) {
  const hash = `sha256-${createHash('sha256').update(body).digest('base64')}`;
  if (!csp.includes(`'${hash}'`)) {
    console.error(`Script inline sin permiso en la CSP. Agregá '${hash}' a script-src en vercel.json`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`CSP OK: ${inlineScripts.length} script(s) inline permitidos`);

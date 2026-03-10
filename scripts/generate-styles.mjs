import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, '../src/styles/theme.css');
const outPath = path.join(__dirname, '../src/styles/inject.ts');

const css = fs.readFileSync(cssPath, 'utf8');

const output = `// AUTO-GENERATED — do not edit. Run \`npm run build\` to regenerate.
const __tourStyles__ = \`${css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

if (typeof document !== 'undefined') {
  const id = '__react_product_tour_styles__';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = __tourStyles__;
    document.head.insertBefore(style, document.head.firstChild);
  }
}
`;

fs.writeFileSync(outPath, output);
console.log('Generated src/styles/inject.ts');

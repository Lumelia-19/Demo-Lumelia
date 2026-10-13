// Renders scripts/og.html to the social card Next.js serves for every page.
// Needs Playwright and a Chromium build: `npm i --no-save playwright && npx playwright install chromium`.
import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { chromium } from 'playwright';

const source = fileURLToPath(new URL('./og.html', import.meta.url));
const target = fileURLToPath(new URL('../src/app/opengraph-image.png', import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(`file://${source}`, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => window.renderField());
await page.screenshot({ path: target, type: 'png' });
await browser.close();
await copyFile(target, target.replace('opengraph-image', 'twitter-image'));
console.log('Wrote', target);

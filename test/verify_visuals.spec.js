// test/verify_visuals.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const pages = [
  { name: 'Home', file: 'index.html', selector: 'h1' },
  { name: 'Metodología', file: 'methodology.html', selector: 'h1' },
  { name: 'Casos de Éxito', file: 'case-studies.html', selector: 'img[alt="Nabolic Fitness Gym Interior"]' },
  { name: 'Recursos', file: 'resources.html', selector: 'h1' },
  { name: 'Diagnóstico', file: 'diagnosis.html', selector: 'h1' },
  { name: 'Términos de Uso', file: 'terms.html', selector: 'h1' },
  { name: 'Política de Privacidad', file: 'privacy.html', selector: 'h1' }
];

const screenshotDir = path.join(__dirname, '..', 'verification');
const baseUrl = 'http://127.0.0.1:8080';

// Ensure the screenshot directory exists
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

for (const pageInfo of pages) {
  test(`Visual verification for ${pageInfo.name} page`, async ({ page }) => {
    const url = `${baseUrl}/${pageInfo.file}`;
    console.log(`Navigating to ${url} for ${pageInfo.name} page...`);

    try {
      const response = await page.goto(url, { waitUntil: 'load' });

      if (!response.ok()) {
        const errorLogPath = path.join(screenshotDir, `error_${path.basename(pageInfo.file, '.html')}.log`);
        const errorContent = `
        ============================================================
        ERROR: Failed to load page for visual verification
        ============================================================
        URL: ${url}
        Status: ${response.status()}
        Status Text: ${response.statusText()}
        Page Content:
        ------------------------------------------------------------
        ${await page.content()}
        ------------------------------------------------------------
        `;
        fs.writeFileSync(errorLogPath, errorContent);
        throw new Error(`Failed to load page: ${url}. Status: ${response.status()}. See ${errorLogPath} for details.`);
      }

      const locator = page.locator(pageInfo.selector).first();
      await locator.waitFor({ state: 'visible', timeout: 15000 });

      // Wait until all network activity has ceased, indicating that CSS and images are likely loaded
      await page.waitForLoadState('networkidle', { timeout: 20000 });

      console.log(`Key element and network idle for ${pageInfo.name}. Taking screenshot...`);

      const screenshotPath = path.join(screenshotDir, `${path.basename(pageInfo.file, '.html')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      console.log(`Screenshot saved for ${pageInfo.name} at: ${screenshotPath}`);
      expect(fs.existsSync(screenshotPath)).toBe(true);

    } catch (error) {
      console.error(`Error during visual verification for ${pageInfo.name}:`, error);

      // Log page content on timeout as well
      if (error.name === 'TimeoutError') {
          const timeoutLogPath = path.join(screenshotDir, `timeout_${path.basename(pageInfo.file, '.html')}.log`);
          const timeoutContent = `
          ============================================================
          ERROR: Timeout during visual verification
          ============================================================
          URL: ${url}
          Selector: ${pageInfo.selector}
          Page Content:
          ------------------------------------------------------------
          ${await page.content()}
          ------------------------------------------------------------
          `;
          fs.writeFileSync(timeoutLogPath, timeoutContent);
          console.error(`Page content on timeout saved to ${timeoutLogPath}`);
      }

      throw error;
    }
  });
}

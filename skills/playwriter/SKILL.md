---
name: playwriter
description: Use Playwriter (Chrome extension + MCP) to control an existing Chrome tab via Playwright code snippets.
---

# playwriter

## Primary path: Playwriter extension (preferred)

### Setup

- Install the Playwriter extension from the Chrome Web Store.
- Start the MCP server via the wrapper command (default):
  - Local: `npx -y playwriter@latest`
  - Remote host: `npx -y playwriter@latest serve --token <token>`
- Click the extension icon on the tab you want to control (gray = disconnected, green = connected).
- For MCP clients, configure the server with:

```json
{
  "mcpServers": {
    "playwriter": {
      "command": "npx",
      "args": ["playwriter@latest"]
    }
  }
}
```

### Execute tool usage

- Use the `execute` tool to send Playwright code snippets.
- Context variables:
  - `page`: active tab (use this unless you create new pages)
  - `context`: Playwright browser context
  - `state`: persists across calls
  - `require`: Node.js module loader
- Keep snippets short; use multiple `execute` calls for complex flows.
- This skill is site-agnostic; rely on roles, text, and snapshots rather than hardcoded selectors.
- If a background agent runs Playwriter on behalf of a primary agent, keep steps atomic and report back URLs, key findings, and any screenshots/snapshots captured.

### Tool availability checklist

- Ensure the MCP server is configured for the environment where Codex is running (for Codex CLI, this is typically `~/.codex/config.toml`).
- If `execute` is missing, inspect available tools and explain the missing dependency. Configure it only when the user has requested setup. Example configuration:

```json
{
  "mcpServers": {
    "playwriter": {
      "command": "npx",
      "args": ["playwriter@latest"]
    }
  }
}
```

### Rules and determinism

- Use an existing connected server; do not start a duplicate server for each operation.
- First check the existing connection with a read-only operation. Request an extension click only if the tool reports that the target tab is disconnected.
- Never call `browser.close()` or `context.close()`; only close pages you created.
- Do not call `page.bringToFront()` unless the user asks.
- After navigation, prefer `await page.waitForLoadState('domcontentloaded')`.
- Avoid `page.waitForTimeout()`; prefer `waitForSelector`, `waitForLoadState`, or `waitForPageLoad`.
- For unknown sites, use `accessibilitySnapshot()` or `screenshotWithAccessibilityLabels()` and interact via `aria-ref=eN`.
- Clean up listeners: `page.removeAllListeners()`.

### Troubleshooting

- Error like "No browser tabs are connected" or "Extension not running": ask the user to click the Playwriter extension icon on the target tab.
- If connect errors persist after user clicks the icon, wait a few seconds and retry the same `execute` call; if still failing, call the `reset` tool once.
- Remote relay: use `--host` or `PLAYWRITER_HOST` and `--token` or `PLAYWRITER_TOKEN`.

### Setup when disconnected

If the connection probe reports no connected tab, explain that the user must open the target tab and click the Playwriter extension icon. Reuse a working connection without another readiness question. If the browser task is not specifically tied to Playwriter, prefer an already available browser-control tool instead of adding setup work.

### Background agent reporting template

When running Playwriter as a background/helper agent, report back succinctly:

```text
Playwriter run summary:
- URL: <current URL>
- Actions: <1-3 short bullets of what was done>
- Findings: <key text/values discovered>
- Snapshot: <short excerpt or note that snapshot was captured>
- Screenshot: <path(s) if saved>
```

### Connection handshake (recommended)

- Run a short read-only `execute` to confirm connectivity:

```js
return { url: page.url(), title: await page.title() };
```

- If it fails with "No browser tabs are connected", ask the user to click the extension icon again, wait briefly, then retry.

### Generic navigation pattern (avoid timeouts)

- For navigations that trigger a new URL, prefer waiting on URL changes or stable selectors:

```js
const box = page.getByRole('textbox', { name: /search|query/i }).first();
await box.fill('your query');
await page.keyboard.press('Enter');
await page.waitForURL(/\\?/);
await page.waitForLoadState('domcontentloaded');
```

- If the page already matches the target URL or uses in-place updates, wait for a stable selector instead (and refresh refs after navigation):

```js
const box = page.getByRole('textbox', { name: /search|query/i }).first();
await box.fill('your query');
await page.keyboard.press('Enter');
await page.waitForLoadState('domcontentloaded');
await page.locator('h1, h2, h3, [role=\"heading\"]').first().waitFor();
```

- Aria refs are ephemeral; after navigation or major DOM updates, take a new snapshot and use the new `aria-ref` values.

### Example

```js
await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
await page.locator('text=Example Domain').waitFor();
const title = await page.title();
console.log(title);
```

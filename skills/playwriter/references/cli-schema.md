# codex-browser CLI schema

## Input JSON

Top-level:

```json
{
  "options": { "...": "..." },
  "actions": [ { "type": "goto", "url": "https://example.com" } ]
}
```

`actions` is required and must be a non-empty array.

### options

- `headless` (boolean)
- `slowMoMs` (number)
- `defaultTimeoutMs` (number)
- `defaultNavigationTimeoutMs` (number)
- `viewport` `{ width: number, height: number }`
- `userAgent` (string)
- `locale` (string)
- `timezoneId` (string)
- `ignoreHTTPSErrors` (boolean)
- `traceOnFailureDir` (string)
- `captureConsole` (boolean)

### actions

- `goto`
  - `{ type: "goto", url: string, waitUntil?: "load"|"domcontentloaded"|"networkidle", timeoutMs?: number, saveAs?: string }`
- `waitFor`
  - `{ type: "waitFor", selector: string, state?: "attached"|"detached"|"visible"|"hidden", timeoutMs?: number, saveAs?: string }`
- `waitForLoadState`
  - `{ type: "waitForLoadState", state?: "load"|"domcontentloaded"|"networkidle", timeoutMs?: number, saveAs?: string }`
- `click`
  - `{ type: "click", selector: string, button?: "left"|"right"|"middle", clickCount?: number, delayMs?: number, timeoutMs?: number, saveAs?: string }`
- `fill`
  - `{ type: "fill", selector: string, text: string, timeoutMs?: number, saveAs?: string }`
- `press`
  - `{ type: "press", key: string, selector?: string, timeoutMs?: number, saveAs?: string }`
- `screenshot`
  - `{ type: "screenshot", path: string, fullPage?: boolean, saveAs?: string }`
- `evaluate`
  - `{ type: "evaluate", expression: string, saveAs?: string }`
- `setViewport`
  - `{ type: "setViewport", width: number, height: number, saveAs?: string }`
- `wait`
  - `{ type: "wait", ms: number, saveAs?: string }`

### templates

- String fields support `{{var}}` or `{{var.path}}` for stored values from `saveAs`.

## Output JSON

Success:

```json
{
  "ok": true,
  "results": [ { "type": "goto", "ok": true, "data": { "url": "...", "status": 200 } } ],
  "timingMs": 123,
  "variables": { "story": { "commentsUrl": "..." } }
}
```

Error:

```json
{
  "ok": false,
  "error": {
    "code": "PLAYWRIGHT_TIMEOUT",
    "name": "TimeoutError",
    "message": "Timeout 30000ms exceeded.",
    "stepIndex": 2,
    "action": { "type": "waitFor", "selector": "#does-not-exist", "timeoutMs": 30000 }
  }
}
```

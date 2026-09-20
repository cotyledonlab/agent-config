---
name: frontend-advanced
description: Advanced frontend patterns for performance, complex state management, mobile optimization, and production-ready UI. Use alongside frontend-design for comprehensive coverage.
---

# Frontend Advanced Skill

## When to use this skill

Trigger this skill when:
- Optimizing performance (Core Web Vitals, bundle size)
- Building complex form validation flows
- Handling loading/error/empty states elegantly
- Creating mobile-first PWAs
- Structuring design tokens at scale
- Building React component architectures
- Adding micro-interactions and polish

---

## Performance Patterns

### Image Optimization
```html
<!-- Lazy loading with native attribute -->
<img 
  src="hero.jpg" 
  alt="Hero image"
  loading="lazy"
  decoding="async"
  fetchpriority="low"
/>

<!-- Responsive images with srcset -->
<img
  src="image-800.jpg"
  srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Responsive image"
/>

<!-- Modern formats with fallback -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Fallback" />
</picture>
```

### Font Loading
```css
/* Prevent FOIT (Flash of Invisible Text) */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* or optional for non-critical */
}

/* Preload critical fonts in HTML head */
/* <link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin /> */
```

### Critical CSS Pattern
```html
<!-- Inline critical CSS -->
<style>
  /* Above-the-fold styles only */
  .hero { ... }
  .nav { ... }
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="styles.css" /></noscript>
```

### Core Web Vitals Checklist
- [ ] **LCP < 2.5s**: Optimize largest image/text block
- [ ] **FID < 100ms**: Minimize JS execution, use web workers
- [ ] **CLS < 0.1**: Set dimensions on images/embeds, avoid injected content
- [ ] **INP < 200ms**: Break up long tasks, use `requestIdleCallback`

### Bundle Optimization
```javascript
// Dynamic imports for code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Route-based splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Prefetch on hover/focus for instant navigation
<Link 
  to="/dashboard" 
  onMouseEnter={() => import('./pages/Dashboard')}
>
  Dashboard
</Link>
```

---

## Loading, Error & Empty States

### Skeleton Loaders
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-surface-highlight) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton shapes */
.skeleton-text { height: 1em; border-radius: 4px; }
.skeleton-avatar { width: 40px; height: 40px; border-radius: 50%; }
.skeleton-card { height: 200px; border-radius: 8px; }
```

### Error State Patterns
```jsx
// Error boundary with recovery
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-container" role="alert">
      <div className="error-icon">⚠️</div>
      <h2>Something went wrong</h2>
      <p className="error-message">{error.message}</p>
      <div className="error-actions">
        <button onClick={resetErrorBoundary}>Try again</button>
        <button onClick={() => window.location.reload()}>Refresh page</button>
      </div>
    </div>
  );
}
```

### Empty States
```jsx
function EmptyState({ icon, title, description, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {action && (
        <button className="empty-action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}

// Usage examples:
// - No search results: "No matches found" + clear filters action
// - Empty list: "No items yet" + create first item action
// - No permissions: "Access restricted" + request access action
```

### State Machine for Async UI
```typescript
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

// Exhaustive render
function AsyncContent<T>({ state, render }: { 
  state: AsyncState<T>;
  render: {
    idle: () => ReactNode;
    loading: () => ReactNode;
    success: (data: T) => ReactNode;
    error: (error: Error) => ReactNode;
  }
}) {
  switch (state.status) {
    case 'idle': return render.idle();
    case 'loading': return render.loading();
    case 'success': return render.success(state.data);
    case 'error': return render.error(state.error);
  }
}
```

---

## Form Validation UX

### Validation Timing
```javascript
// When to validate:
// - On blur: First validation (don't interrupt typing)
// - On change: After first error shown (immediate feedback)
// - On submit: Final check before submission

const [touched, setTouched] = useState(false);
const [error, setError] = useState(null);

const handleBlur = () => {
  setTouched(true);
  validate();
};

const handleChange = (value) => {
  setValue(value);
  if (touched) validate(); // Only re-validate after first blur
};
```

### Inline Error Display
```css
.field-error {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: var(--color-error);
}

.field-error::before {
  content: "⚠";
  font-size: 0.75rem;
}

/* Shake animation for submit errors */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.field-invalid {
  animation: shake 0.3s ease-in-out;
  border-color: var(--color-error);
}
```

### Success Feedback
```css
.field-valid {
  border-color: var(--color-success);
}

.field-valid::after {
  content: "✓";
  position: absolute;
  right: 0.75rem;
  color: var(--color-success);
}
```

### Password Strength Indicator
```jsx
function PasswordStrength({ password }) {
  const strength = calculateStrength(password);
  const levels = ['weak', 'fair', 'good', 'strong'];
  
  return (
    <div className="password-strength">
      <div className="strength-bars">
        {levels.map((level, i) => (
          <div 
            key={level}
            className={`bar ${i < strength ? 'filled' : ''}`}
            style={{ '--bar-color': getBarColor(strength) }}
          />
        ))}
      </div>
      <span className="strength-label">{levels[strength - 1] || 'too short'}</span>
    </div>
  );
}
```

---

## Mobile Optimization

### Viewport Units
```css
/* Use dynamic viewport height for mobile browsers */
.full-height {
  height: 100dvh; /* Dynamic viewport height */
  /* Fallback for older browsers */
  height: 100vh;
}

/* Small viewport (keyboard open) */
.modal {
  max-height: 100svh;
}

/* Large viewport (keyboard closed) */
.hero {
  min-height: 100lvh;
}
```

### Safe Area Insets (Notch/Home Indicator)
```css
.bottom-nav {
  padding-bottom: env(safe-area-inset-bottom);
}

.full-bleed {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* With fallback */
@supports (padding: env(safe-area-inset-bottom)) {
  .bottom-nav {
    padding-bottom: calc(1rem + env(safe-area-inset-bottom));
  }
}
```

### Touch Interactions
```css
/* Larger touch targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  padding: 12px;
}

/* Disable double-tap zoom on interactive elements */
.button {
  touch-action: manipulation;
}

/* Prevent pull-to-refresh on scroll containers */
.scroll-container {
  overscroll-behavior: contain;
}

/* Smooth scrolling with momentum */
.scroll-container {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

### Mobile Input Optimization
```html
<!-- Numeric keyboard -->
<input type="text" inputmode="numeric" pattern="[0-9]*" />

<!-- Email keyboard -->
<input type="email" inputmode="email" autocomplete="email" />

<!-- Phone keyboard -->
<input type="tel" inputmode="tel" autocomplete="tel" />

<!-- Prevent zoom on focus (iOS) -->
<input style="font-size: 16px" /> <!-- 16px or larger -->
```

### PWA Essentials
```html
<!-- Standalone app feel -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />

<!-- Splash screen -->
<link rel="apple-touch-startup-image" href="splash.png" />
```

---

## Design Token Architecture

### Token Hierarchy
```css
/* Tier 1: Primitives (raw values, never use directly in components) */
:root {
  --blue-50: #eff6ff;
  --blue-500: #3b82f6;
  --blue-900: #1e3a8a;
  /* ... full color palette */
}

/* Tier 2: Semantic tokens (reference primitives) */
:root {
  --color-primary: var(--blue-500);
  --color-primary-hover: var(--blue-600);
  --color-background: var(--gray-50);
  --color-surface: var(--white);
  --color-text: var(--gray-900);
  --color-text-muted: var(--gray-500);
}

/* Tier 3: Component tokens (optional, for complex systems) */
.button {
  --button-bg: var(--color-primary);
  --button-text: var(--color-on-primary);
  --button-radius: var(--radius-md);
}
```

### Theme Switching
```css
/* CSS custom properties for runtime theming */
[data-theme="light"] {
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #0f172a;
}

[data-theme="dark"] {
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f8fafc;
}

/* System preference with override */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-background: #0f172a;
    /* ... dark values */
  }
}
```

### Multi-Brand Tokens
```css
/* Brand-specific primitives */
[data-brand="acme"] {
  --brand-primary: #ff6b35;
  --brand-font: 'Acme Sans', sans-serif;
}

[data-brand="globex"] {
  --brand-primary: #2563eb;
  --brand-font: 'Globex Neue', sans-serif;
}

/* Components reference brand tokens */
.button-primary {
  background: var(--brand-primary);
  font-family: var(--brand-font);
}
```

---

## React Component Patterns

### Compound Components
```jsx
// Usage: Clean, flexible API
<Select value={value} onChange={setValue}>
  <Select.Trigger>Choose option</Select.Trigger>
  <Select.Content>
    <Select.Item value="a">Option A</Select.Item>
    <Select.Item value="b">Option B</Select.Item>
  </Select.Content>
</Select>

// Implementation: Context for shared state
const SelectContext = createContext(null);

function Select({ children, value, onChange }) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
}

Select.Trigger = function Trigger({ children }) { /* ... */ };
Select.Content = function Content({ children }) { /* ... */ };
Select.Item = function Item({ value, children }) { /* ... */ };
```

### Render Props for Flexibility
```jsx
function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  
  return (
    <div className="dropdown">
      {trigger({ open, toggle })}
      {open && children}
    </div>
  );
}

// Usage
<Dropdown
  trigger={({ open, toggle }) => (
    <button onClick={toggle}>
      Menu {open ? '▲' : '▼'}
    </button>
  )}
>
  <DropdownMenu />
</Dropdown>
```

### Headless Component Pattern
```jsx
// Logic-only hook, no UI
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn(v => !v), []);
  const setTrue = useCallback(() => setOn(true), []);
  const setFalse = useCallback(() => setOn(false), []);
  return { on, toggle, setTrue, setFalse };
}

// Consumer provides all UI
function CustomSwitch() {
  const { on, toggle } = useToggle();
  return (
    <button 
      role="switch" 
      aria-checked={on} 
      onClick={toggle}
      className={on ? 'switch-on' : 'switch-off'}
    >
      {on ? '🌙' : '☀️'}
    </button>
  );
}
```

### Suspense Boundaries
```jsx
// Granular loading states
function Dashboard() {
  return (
    <div className="dashboard">
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      
      <div className="dashboard-grid">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        
        <Suspense fallback={<TableSkeleton />}>
          <RecentOrders />
        </Suspense>
      </div>
    </div>
  );
}
```

---

## Micro-Interactions

### Button Press Effect
```css
.button {
  transition: transform 100ms ease, box-shadow 100ms ease;
}

.button:active {
  transform: scale(0.97);
  box-shadow: inset 0 2px 4px rgb(0 0 0 / 0.1);
}
```

### Hover Lift Effect
```css
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgb(0 0 0 / 0.15);
}
```

### Focus Ring Animation
```css
.interactive:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px var(--color-background),
    0 0 0 4px var(--color-focus);
  animation: focus-ring 200ms ease;
}

@keyframes focus-ring {
  from { box-shadow: 0 0 0 2px var(--color-background), 0 0 0 2px var(--color-focus); }
  to { box-shadow: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-focus); }
}
```

### Toggle Switch Animation
```css
.switch-thumb {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.switch[aria-checked="true"] .switch-thumb {
  transform: translateX(20px);
}
```

### Staggered List Animation
```css
.list-item {
  opacity: 0;
  transform: translateY(10px);
  animation: list-item-in 300ms ease forwards;
}

.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
/* Or use CSS custom property: animation-delay: calc(var(--index) * 50ms); */

@keyframes list-item-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Code Review Checklist (Advanced)

Before shipping, verify:

### Performance
- [ ] Images lazy loaded below fold
- [ ] Fonts preloaded or using font-display
- [ ] No layout shifts (CLS)
- [ ] Bundle size checked, code split where needed

### Mobile
- [ ] Works with on-screen keyboard
- [ ] Safe area insets respected
- [ ] Touch targets 44px minimum
- [ ] No horizontal scroll

### Error Handling
- [ ] Loading states for all async content
- [ ] Error boundaries catch component failures
- [ ] Empty states guide user action
- [ ] Network errors handled gracefully

### Polish
- [ ] Micro-interactions feel responsive
- [ ] Transitions respect reduced-motion
- [ ] Focus states visible and styled
- [ ] Hover states provide feedback

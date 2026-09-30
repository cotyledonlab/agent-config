---
name: frontend-design
description: Use when designing UI components, layouts, or styling. Provides modern frontend design patterns, accessibility guidelines, and responsive design best practices.
---

# Frontend Design Skill

## When to use this skill

Trigger this skill when:
- Creating new UI components or pages
- Styling existing components
- Implementing responsive layouts
- Improving accessibility
- Building design systems or component libraries
- Converting designs (Figma, sketches) to code

## Design principles

### Visual hierarchy
- Use size, weight, and color to establish importance
- Primary actions should be visually prominent
- Group related elements with spacing and containers
- Limit to 2-3 levels of visual emphasis per view

### Spacing and layout
- Use consistent spacing scale (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- Prefer CSS Grid for 2D layouts, Flexbox for 1D alignment
- Use `gap` over margins for component spacing
- Container max-widths: 640px (prose), 1024px (content), 1280px (wide)

### Typography
- Limit to 2 font families maximum
- Use relative units (rem) for font sizes
- Line height: 1.5 for body text, 1.2-1.3 for headings
- Maximum line length: 65-75 characters for readability

### Color
- Define semantic color tokens (primary, secondary, success, warning, error)
- Ensure 4.5:1 contrast ratio for text (WCAG AA)
- Use opacity variants for hover/focus states
- Support dark mode with CSS custom properties

## Component patterns

### Buttons
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background-color 150ms, box-shadow 150ms;
}

.button:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```

### Cards
```css
.card {
  background: var(--color-surface);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}
```

### Form inputs
```css
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  transition: border-color 150ms, box-shadow 150ms;
}

.input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-alpha);
  outline: none;
}
```

## Responsive design

### Breakpoints
```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
```

### Container queries (preferred for components)
```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### Fluid typography
```css
/* Clamp for responsive sizing without breakpoints */
font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);
```

## Accessibility checklist

### Required for all components
- [ ] Keyboard navigable (Tab, Enter, Escape, Arrow keys)
- [ ] Visible focus indicators
- [ ] Sufficient color contrast (4.5:1 text, 3:1 UI)
- [ ] Touch targets minimum 44x44px
- [ ] Screen reader labels for icons and images

### Interactive elements
- [ ] Button has accessible name (text or aria-label)
- [ ] Links describe destination
- [ ] Form inputs have associated labels
- [ ] Error messages linked to inputs with aria-describedby
- [ ] Loading states announced with aria-live

### Structure
- [ ] Semantic HTML elements (nav, main, article, aside)
- [ ] Heading hierarchy (h1 > h2 > h3, no skipping)
- [ ] Landmarks for page regions
- [ ] Skip link for keyboard users

## Animation guidelines

### Timing
```css
--duration-fast: 150ms;    /* Micro-interactions */
--duration-normal: 250ms;  /* Standard transitions */
--duration-slow: 400ms;    /* Complex animations */

--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## CSS custom properties template

```css
:root {
  /* Colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-surface: #ffffff;
  --color-background: #f9fafb;
  --color-text: #111827;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-focus: #3b82f6;

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, monospace;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px rgb(0 0 0 / 0.1);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-surface: #1f2937;
    --color-background: #111827;
    --color-text: #f9fafb;
    --color-text-muted: #9ca3af;
    --color-border: #374151;
  }
}
```

## Framework-specific notes

### React/JSX
- Use `className` not `class`
- Inline styles use camelCase: `{{ backgroundColor: 'red' }}`
- Prefer CSS Modules or styled-components for scoping

### Tailwind CSS
- Use design tokens via theme extension
- Extract repeated patterns to @apply classes
- Prefer arbitrary values sparingly: `w-[350px]`

### Vue
- Use scoped styles by default
- CSS custom properties work across scoped boundaries
- Use v-bind in CSS for dynamic values

## Code review checklist

Before completing a frontend task, verify:
- [ ] Components work at all breakpoints
- [ ] Dark mode supported (if applicable)
- [ ] Keyboard navigation works
- [ ] No horizontal scroll on mobile
- [ ] Images have alt text
- [ ] Loading and error states handled
- [ ] Animations respect reduced-motion preference

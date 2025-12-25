# Design Tokens Reference

CSS custom properties used in D365 Customer Insights forms. These variables control the visual appearance of exported forms and can be customised in the builder's Design Tokens panel.

## Usage

Design tokens are defined in `:root` and applied throughout the form CSS. When exporting, the builder injects the current token values into the exported HTML.

---

## Typography

| Token | Default | Description |
|-------|---------|-------------|
| `--form-font-family` | `'Segoe UI', Arial, sans-serif` | Primary font stack |
| `--form-font-size-base` | `14px` | Base text size |
| `--form-font-size-small` | `12px` | Small text (hints, captions) |
| `--form-font-size-large` | `16px` | Large text (labels) |
| `--form-line-height-base` | `1.5` | Default line height |
| `--form-line-height-tight` | `1.25` | Compact line height |

### Font Weights

| Token | Default |
|-------|---------|
| `--form-font-weight-light` | `300` |
| `--form-font-weight-normal` | `400` |
| `--form-font-weight-medium` | `500` |
| `--form-font-weight-semibold` | `600` |
| `--form-font-weight-bold` | `700` |

---

## Colors

### Text Colors

| Token | Default | Description |
|-------|---------|-------------|
| `--form-text-primary` | `#000000` | Primary text |
| `--form-text-secondary` | `#323130` | Secondary text, labels |
| `--form-text-tertiary` | `#605e5c` | Muted text |
| `--form-text-placeholder` | `#a19f9d` | Input placeholders |
| `--form-text-required` | `#c33400` | Required field indicator |

### Background Colors

| Token | Default | Description |
|-------|---------|-------------|
| `--form-bg-primary` | `#ffffff` | Main background |
| `--form-bg-secondary` | `#faf9f8` | Input background |
| `--form-bg-transparent` | `rgba(255,255,255,0)` | Transparent |

### Border Colors

| Token | Default | Description |
|-------|---------|-------------|
| `--form-border-default` | `#e1dfdd` | Default borders |
| `--form-border-focus` | `#0078d4` | Focus state |
| `--form-border-hover` | `#c8c6c4` | Hover state |
| `--form-border-error` | `#c33400` | Error state |
| `--form-divider-color` | `#e1dfdd` | Divider lines |

### Interactive Colors

| Token | Default | Description |
|-------|---------|-------------|
| `--form-accent-color` | `#0078d4` | Primary accent |
| `--form-accent-hover` | `#1a56c9` | Accent hover |
| `--form-accent-active` | `#144ba1` | Accent pressed |

---

## Spacing

| Token | Default | Description |
|-------|---------|-------------|
| `--form-spacing-xs` | `4px` | Extra small |
| `--form-spacing-sm` | `8px` | Small |
| `--form-spacing-md` | `12px` | Medium |
| `--form-spacing-base` | `16px` | Base unit |
| `--form-spacing-lg` | `20px` | Large |
| `--form-spacing-xl` | `30px` | Extra large |

### Field Spacing

| Token | Default |
|-------|---------|
| `--form-field-padding-vertical` | `20px` |
| `--form-field-padding-horizontal` | `30px` |
| `--form-field-gap` | `16px` |

---

## Borders & Corners

| Token | Default |
|-------|---------|
| `--form-border-width` | `1px` |
| `--form-border-width-thick` | `2px` |
| `--form-border-style` | `solid` |

### Border Radius

| Token | Default | Description |
|-------|---------|-------------|
| `--form-radius-small` | `4px` | Subtle rounding |
| `--form-radius-medium` | `8px` | Medium rounding |
| `--form-radius-large` | `12px` | Large rounding |
| `--form-input-radius` | `4px` | Input fields |
| `--form-button-radius` | `4px` | Buttons |
| `--form-checkbox-radius` | `4px` | Checkboxes |

---

## Input Fields

| Token | Default |
|-------|---------|
| `--input-font-family` | `var(--form-font-family)` |
| `--input-font-size` | `var(--form-font-size-base)` |
| `--input-font-weight` | `var(--form-font-weight-normal)` |
| `--input-padding-vertical` | `10px` |
| `--input-padding-horizontal` | `12px` |
| `--input-bg` | `var(--form-bg-secondary)` |
| `--input-bg-focus` | `var(--form-bg-primary)` |
| `--input-border-color` | `var(--form-border-default)` |
| `--input-border-radius` | `var(--form-input-radius)` |
| `--input-text-color` | `var(--form-text-primary)` |
| `--input-placeholder-color` | `var(--form-text-placeholder)` |

### Focus State

| Token | Default |
|-------|---------|
| `--input-focus-border-color` | `var(--form-border-focus)` |
| `--input-focus-border-width` | `2px` |
| `--input-focus-outline-offset` | `0px` |

---

## Labels

| Token | Default |
|-------|---------|
| `--label-font-family` | `var(--form-font-family)` |
| `--label-font-size` | `var(--form-font-size-large)` |
| `--label-font-weight` | `var(--form-font-weight-semibold)` |
| `--label-text-color` | `var(--form-text-secondary)` |
| `--label-margin-bottom` | `0px` |

---

## Buttons

| Token | Default |
|-------|---------|
| `--button-font-family` | `var(--form-font-family)` |
| `--button-font-size` | `var(--form-font-size-large)` |
| `--button-font-weight` | `var(--form-font-weight-bold)` |
| `--button-text-color` | `#ffffff` |
| `--button-bg-color` | `#2266e3` |
| `--button-bg-hover` | `var(--form-accent-hover)` |
| `--button-bg-active` | `var(--form-accent-active)` |
| `--button-border-radius` | `var(--form-button-radius)` |
| `--button-padding-vertical` | `14px` |
| `--button-padding-horizontal` | `32px` |

---

## Headings

### H1

| Token | Default |
|-------|---------|
| `--heading-h1-font-size` | `28px` |
| `--heading-h1-font-weight` | `var(--form-font-weight-bold)` |
| `--heading-h1-line-height` | `var(--form-line-height-tight)` |
| `--heading-h1-color` | `var(--form-text-primary)` |

### H2

| Token | Default |
|-------|---------|
| `--heading-h2-font-size` | `22px` |
| `--heading-h2-font-weight` | `var(--form-font-weight-semibold)` |
| `--heading-h2-line-height` | `var(--form-line-height-tight)` |
| `--heading-h2-color` | `#333333` |

---

## Layout

| Token | Default |
|-------|---------|
| `--form-max-width` | `600px` |
| `--form-layout-bg` | `var(--form-bg-transparent)` |

---

## Checkbox & Radio

| Token | Default |
|-------|---------|
| `--checkbox-size` | `20px` |
| `--checkbox-border-width` | `var(--form-border-width)` |
| `--checkbox-border-color` | `var(--form-text-secondary)` |
| `--checkbox-border-radius` | `var(--form-checkbox-radius)` |
| `--checkbox-accent-color` | `var(--form-accent-color)` |
| `--checkbox-label-gap` | `8px` |
| `--radio-size` | `20px` |
| `--radio-border-color` | `var(--form-text-secondary)` |
| `--radio-accent-color` | `var(--form-accent-color)` |

---

## Customisation Examples

### Rounded Modern Style

```css
:root {
  --form-input-radius: 12px;
  --form-button-radius: 24px;
  --button-bg-color: #6366f1;
  --form-accent-color: #6366f1;
}
```

### Minimal Flat Style

```css
:root {
  --form-input-radius: 0;
  --form-button-radius: 0;
  --input-bg: #ffffff;
  --form-border-default: #000000;
}
```

### Dark Theme (Partial)

```css
:root {
  --form-bg-primary: #1a1a1a;
  --form-bg-secondary: #2d2d2d;
  --form-text-primary: #ffffff;
  --form-text-secondary: #e0e0e0;
  --form-border-default: #444444;
}
```

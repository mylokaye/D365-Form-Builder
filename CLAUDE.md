# CLAUDE.md - D365 Form Builder

## Project Overview

A browser-based form builder that generates HTML compatible with **Dynamics 365 Customer Insights - Journeys** forms. Users drag-and-drop fields, configure properties, preview the form, and export production-ready HTML.

**Type:** One-shot build and export tool (no save/load functionality)

**Tech Stack:** Vanilla JavaScript, HTML, CSS (no frameworks)

---

## Goals

1. Visual drag-and-drop form builder
2. Field configuration panel (labels, placeholders, required, validation)
3. Live preview of the form
4. Export valid D365-compatible HTML
5. Design token customisation (colors, fonts, spacing)

---

## Project Structure

```
D365-Form-Builder/
├── docs/                           # Technical documentation
│   ├── technical-reference.md      # D365 form structure & requirements
│   ├── form-attributes-reference.md # All data-* attributes
│   ├── design-tokens.md            # CSS variables documentation
│   └── examples/
│       ├── contact.html            # D365 Contact form export
│       └── lead.html               # D365 Lead form export
│
├── src/                            # Application source
│   ├── index.html                  # Main application
│   ├── css/
│   │   ├── builder.css             # Builder UI styles
│   │   └── design-tokens.css       # D365 form CSS variables
│   ├── js/
│   │   ├── app.js                  # Main application logic
│   │   ├── fieldTypes.js           # Field definitions & HTML generators
│   │   ├── dragDrop.js             # Drag-and-drop functionality
│   │   ├── export.js               # HTML export logic
│   │   └── preview.js              # Live preview renderer
│   └── export/
│       └── form-wrapper.html       # Base HTML template for export
│
├── CLAUDE.md                       # This file
└── README.md                       # Project documentation
```

---

## D365 Form Requirements

### Required Meta Tags (Head)

```html
<meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
<meta type="xrm/designer/setting" name="layout-editable" value="marketing-designer-layout-editable">
```

### Layout Hierarchy

```
form.marketingForm
└── div[data-layout="true"][data-layout-version="v2"]
    └── div[data-section="true"]
        └── div[data-container="true"][data-container-width="100"]
            └── div[data-editorblocktype="..."]
```

### Field Types to Support

| Field Type | `data-editorblocktype` | CSS Class | Priority |
|------------|------------------------|-----------|----------|
| Text | `TextFormField` | `.textFormFieldBlock` | P0 |
| Email | `TextFormField` | `.textFormFieldBlock` | P0 |
| Phone | `TextFormField` | `.phoneFormFieldBlock` | P1 |
| Textarea | `TextAreaFormField` | `.textFormFieldBlock` | P1 |
| Dropdown | `OptionSetFormField` | `.optionSetFormFieldBlock` | P1 |
| Checkbox (single) | `TwoOptionFormField` | `.twoOptionFormFieldBlock` | P1 |
| Radio buttons | `TwoOptionFormField` | `.twoOptionFormFieldBlock` | P2 |
| Multi-select | `MultiOptionSetFormField` | `.multiOptionSetFormFieldBlock` | P2 |
| Date/Time | `DateTimeFormField` | `.dateTimeFormFieldBlock` | P2 |
| Consent | `Consent` | `.consentBlock` | P1 |
| Topic | `Topic` | `.consentBlock` | P2 |
| Submit Button | `SubmitButton` | `.submitButtonWrapper` | P0 |
| Text Block | `Text` | — | P0 |
| Divider | `Divider` | `.dividerWrapper` | P2 |

**Priority:** P0 = MVP, P1 = Should have, P2 = Nice to have

### Common Field Attributes

| Attribute | Purpose | Values |
|-----------|---------|--------|
| `data-editorblocktype` | Field type identifier | See table above |
| `data-targetproperty` | D365 logical name | `firstname`, `emailaddress1`, etc. |
| `data-required` | Required field | `"required"` or omit |
| `data-prefill` | Enable prefill | `"prefill"` or omit |

### Common Logical Names

**Contact Entity:**
- `firstname`, `lastname`, `emailaddress1`, `mobilephone`, `telephone1`, `jobtitle`, `companyname`, `description`

**Lead Entity:**
- `firstname`, `lastname`, `emailaddress1`, `mobilephone`, `companyname`, `jobtitle`, `description`

---

## Builder UI Specification

### Layout (3-Panel)

```
┌─────────────────────────────────────────────────────────────┐
│  Header: Logo, Export Button, Settings                      │
├──────────────┬────────────────────────┬─────────────────────┤
│              │                        │                     │
│   Field      │      Canvas            │    Properties       │
│   Palette    │      (Drop Zone)       │    Panel            │
│              │                        │                     │
│   - Text     │   ┌──────────────┐     │   Label: [____]     │
│   - Email    │   │ First Name   │     │   Placeholder: [__] │
│   - Phone    │   │ [__________] │     │   Required: [x]     │
│   - Textarea │   └──────────────┘     │   Logical Name: [_] │
│   - Dropdown │   ┌──────────────┐     │                     │
│   - Checkbox │   │ Email        │     │                     │
│   - Submit   │   │ [__________] │     │                     │
│   - Text     │   └──────────────┘     │                     │
│   - Divider  │                        │                     │
│              │                        │                     │
├──────────────┴────────────────────────┴─────────────────────┤
│  Footer: Preview Toggle | Design Tokens Panel               │
└─────────────────────────────────────────────────────────────┘
```

### Panel 1: Field Palette (Left)

- Draggable field type buttons
- Grouped by category:
  - **Input Fields:** Text, Email, Phone, Textarea, Date/Time
  - **Selection:** Dropdown, Checkbox, Radio, Multi-select
  - **Consent:** Consent Block, Topic Block
  - **Layout:** Text Block, Divider, Submit Button

### Panel 2: Canvas (Center)

- Drop zone for fields
- Visual representation of form
- Click to select field
- Drag to reorder
- Delete button on hover

### Panel 3: Properties Panel (Right)

- Shows when field selected
- Common properties:
  - Label
  - Placeholder
  - Logical Name (dropdown with common names + custom input)
  - Required (checkbox)
  - Prefill (checkbox)
- Field-specific properties:
  - Dropdown: Options list
  - Consent: Purpose ID, Channels
  - Validation: Pattern, Max length

### Header Actions

- **Export HTML:** Downloads `.html` file
- **Preview:** Opens preview in modal/new tab
- **Settings:** Target audience (Contact/Lead), Form title

### Design Tokens Panel (Footer/Modal)

- Color pickers for:
  - Primary color (buttons)
  - Text color
  - Background color
  - Border color
- Font family selector
- Border radius slider
- Spacing controls

---

## Export Output

The exported HTML must:

1. Include required D365 meta tags
2. Use correct `data-editorblocktype` values
3. Use correct CSS classes
4. Include design tokens as CSS variables
5. Be valid, formatted HTML
6. Include all CSS inline (single-file export)

### Export Template Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta type="xrm/designer/setting" name="type" value="marketing-designer-content-editor-document">
  <meta type="xrm/designer/setting" name="layout-editable" value="marketing-designer-layout-editable">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="referrer" content="never">
  <title>{{FORM_TITLE}}</title>
  <style>
    :root {
      {{DESIGN_TOKENS}}
    }
    {{BASE_STYLES}}
  </style>
</head>
<body>
  <main>
    <form aria-label="{{FORM_TITLE}}" class="marketingForm">
      <div data-layout="true" data-layout-version="v2" style="margin: auto; max-width: 600px;">
        {{SECTIONS}}
      </div>
    </form>
  </main>
</body>
</html>
```

---

## Implementation Order

### Phase 1: MVP (P0)
1. Basic HTML structure with 3-panel layout
2. Field palette with Text, Email, Submit, Text Block
3. Simple drag-and-drop to canvas
4. Properties panel for selected field
5. Export function generating valid D365 HTML

### Phase 2: Core Fields (P1)
1. Add Phone, Textarea, Dropdown, Checkbox fields
2. Add Consent block
3. Field reordering on canvas
4. Delete field functionality
5. Design tokens panel (colors, fonts)

### Phase 3: Advanced (P2)
1. Radio buttons, Multi-select, Date/Time
2. Topic blocks
3. Divider element
4. Multi-column layouts
5. Form preview modal
6. Validation patterns

---

## Key Files Reference

### Technical Documentation
- `docs/technical-reference.md` — Full D365 form structure documentation
- `docs/form-attributes-reference.md` — All data-* attributes with examples

### Example Forms
- `docs/examples/contact.html` — Raw D365 Contact form export
- `docs/examples/lead.html` — Raw D365 Lead form export

---

## Code Conventions

- Use ES6+ JavaScript (no transpilation needed)
- Use CSS custom properties for theming
- Use semantic HTML
- Follow accessibility best practices (labels, ARIA)
- No external dependencies (vanilla JS only)
- Single-file export (all CSS inline)

---

## Testing

Test exported HTML by:
1. Pasting into D365 Customer Insights form HTML editor
2. Verifying form renders in D365 designer
3. Verifying fields are editable in D365 properties panel
4. Submitting test form data

---

## Reference Links

- [D365 Custom Template Attributes](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/custom-template-attributes)
- [D365 Form Field Types](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-manage-forms#field-types)
- [D365 Compliance Settings](https://learn.microsoft.com/en-us/dynamics365/customer-insights/journeys/real-time-marketing-compliance-settings)

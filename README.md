# D365 Form Builder

A visual drag-and-drop form builder that generates HTML compatible with **Dynamics 365 Customer Insights - Journeys**.

## Features

- 🎨 Visual drag-and-drop interface
- ⚙️ Field configuration panel
- 👁️ Live preview
- 📤 Export valid D365-compatible HTML
- 🎯 Design token customisation

## Quick Start

1. Open `src/index.html` in a browser
2. Drag fields from the palette to the canvas
3. Configure field properties in the right panel
4. Click **Export** to download the HTML

## Supported Field Types

| Field | Status |
|-------|--------|
| Text Input | ✅ |
| Email | ✅ |
| Phone | ✅ |
| Textarea | ✅ |
| Dropdown | ✅ |
| Checkbox | ✅ |
| Radio Buttons | ✅ |
| Date/Time | ✅ |
| Consent Block | ✅ |
| Submit Button | ✅ |
| Text Block | ✅ |
| Divider | ✅ |

## Project Structure

```
D365-Form-Builder/
├── docs/                   # Technical documentation
│   ├── technical-reference.md
│   ├── form-attributes-reference.md
│   └── examples/           # D365 form exports
├── src/                    # Application source
│   ├── index.html          # Main app
│   ├── css/
│   ├── js/
│   └── templates/
├── CLAUDE.md               # Claude Code instructions
└── README.md
```

## Documentation

- [Technical Reference](docs/technical-reference.md) — D365 form structure & requirements
- [Form Attributes Reference](docs/form-attributes-reference.md) — All `data-*` attributes

## Testing Exported Forms

1. Copy the exported HTML
2. In D365, go to **Customer Insights - Journeys** > **Forms**
3. Create new form or edit existing
4. Open the **HTML** editor
5. Paste the HTML
6. Save and preview

## License

MIT

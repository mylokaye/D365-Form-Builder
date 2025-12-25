/**
 * Export Module
 * 
 * Handles:
 * - Generating complete D365-compatible HTML
 * - Injecting design tokens
 * - Downloading as .html file
 */

// TODO: Implement export functionality
// See CLAUDE.md for specification

class ExportManager {
  constructor(formState, designTokens) {
    this.formState = formState;
    this.designTokens = designTokens;
    this.template = null;
  }

  async loadTemplate() {
    // Load form-wrapper.html template
    const response = await fetch('./export/form-wrapper.html');
    this.template = await response.text();
  }

  generateDesignTokensCSS() {
    // Convert design tokens object to CSS custom properties string
    let css = '';
    for (const [key, value] of Object.entries(this.designTokens)) {
      css += `  ${key}: ${value};\n`;
    }
    return css;
  }

  generateFormContent() {
    // Build sections and fields HTML from form state
    let html = '';
    
    // Wrap fields in section/container structure
    html += `
        <div data-section="true" class="emptyContainer columns-equal-class wrap-section"
             style="padding: 0px; display: flex;">
          <div class="columnContainer" data-container="true" data-container-width="100"
               style="width: 600px;">
    `;
    
    // Generate each field
    for (const field of this.formState.fields) {
      const fieldType = FIELD_TYPES[field.type];
      if (fieldType) {
        html += fieldType.render(field.props, field.id);
      }
    }
    
    html += `
          </div>
        </div>
    `;
    
    return html;
  }

  generateHTML() {
    if (!this.template) {
      console.error('Template not loaded');
      return null;
    }

    let html = this.template;
    
    // Replace placeholders
    html = html.replace('{{FORM_TITLE}}', this.formState.title || 'Marketing Form');
    html = html.replace('{{DESIGN_TOKENS}}', this.generateDesignTokensCSS());
    html = html.replace('{{FORM_CONTENT}}', this.generateFormContent());
    
    return html;
  }

  download(filename = 'form.html') {
    const html = this.generateHTML();
    if (!html) return;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ExportManager };
}

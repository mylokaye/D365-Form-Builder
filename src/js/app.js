/**
 * D365 Form Builder - Main Application
 * 
 * Orchestrates:
 * - Field palette
 * - Canvas (drop zone)
 * - Properties panel
 * - Design tokens
 * - Export
 */

// Application state
const appState = {
  formTitle: 'Contact Form',
  targetAudience: 'contact',
  fields: [],
  selectedFieldId: null,
  designTokens: {}
};

// Managers (initialized on DOMContentLoaded)
let dragDropManager;
let previewManager;
let exportManager;

/**
 * Generate unique ID for fields
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Add a field to the form
 */
function addField(fieldType, index = -1) {
  const type = FIELD_TYPES[fieldType];
  if (!type) return null;

  const field = {
    id: generateId(),
    type: fieldType,
    props: { ...type.defaultProps }
  };

  if (index === -1) {
    appState.fields.push(field);
  } else {
    appState.fields.splice(index, 0, field);
  }

  renderCanvas();
  selectField(field.id);
  
  return field;
}

/**
 * Remove a field from the form
 */
function removeField(fieldId) {
  const index = appState.fields.findIndex(f => f.id === fieldId);
  if (index > -1) {
    appState.fields.splice(index, 1);
    if (appState.selectedFieldId === fieldId) {
      appState.selectedFieldId = null;
      renderPropertiesPanel();
    }
    renderCanvas();
  }
}

/**
 * Select a field for editing
 */
function selectField(fieldId) {
  appState.selectedFieldId = fieldId;
  
  // Update canvas selection state
  document.querySelectorAll('.canvas-field').forEach(el => {
    el.classList.toggle('selected', el.dataset.fieldId === fieldId);
  });
  
  renderPropertiesPanel();
}

/**
 * Update a field's properties
 */
function updateFieldProp(fieldId, propName, value) {
  const field = appState.fields.find(f => f.id === fieldId);
  if (field) {
    field.props[propName] = value;
    renderCanvas();
  }
}

/**
 * Render the field palette
 */
function renderPalette() {
  const palette = document.getElementById('field-palette');
  if (!palette) return;

  let html = '';
  
  for (const category of FIELD_CATEGORIES) {
    html += `<div class="palette-category">
      <h3>${category.label}</h3>
      <div class="palette-items">`;
    
    for (const [key, field] of Object.entries(FIELD_TYPES)) {
      if (field.category === category.id) {
        html += `
          <div class="palette-item" draggable="true" data-field-type="${key}">
            <span class="palette-icon">${field.icon}</span>
            <span class="palette-label">${field.label}</span>
          </div>
        `;
      }
    }
    
    html += `</div></div>`;
  }
  
  palette.innerHTML = html;
  
  // Add drag event listeners
  palette.querySelectorAll('.palette-item').forEach(item => {
    item.addEventListener('dragstart', handlePaletteDragStart);
  });
}

/**
 * Render the canvas with current fields
 */
function renderCanvas() {
  const canvas = document.getElementById('form-canvas');
  if (!canvas) return;

  if (appState.fields.length === 0) {
    canvas.innerHTML = `
      <div class="empty-state">
        <p>Drag fields here to build your form</p>
      </div>
    `;
    return;
  }

  let html = '';
  
  for (const field of appState.fields) {
    const fieldType = FIELD_TYPES[field.type];
    if (!fieldType) continue;
    
    const isSelected = field.id === appState.selectedFieldId;
    
    html += `
      <div class="canvas-field ${isSelected ? 'selected' : ''}"
           data-field-id="${field.id}"
           draggable="true">
        <div class="field-preview">
          ${fieldType.render(field.props, field.id)}
        </div>
        <div class="field-controls">
          <button class="field-delete" data-field-id="${field.id}" title="Delete">×</button>
        </div>
      </div>
    `;
  }
  
  canvas.innerHTML = html;
  
  // Add event listeners
  canvas.querySelectorAll('.canvas-field').forEach(el => {
    el.addEventListener('click', () => selectField(el.dataset.fieldId));
  });
  
  canvas.querySelectorAll('.field-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeField(btn.dataset.fieldId);
    });
  });
}

/**
 * Render the properties panel for selected field
 */
function renderPropertiesPanel() {
  const panel = document.getElementById('properties-panel');
  if (!panel) return;

  if (!appState.selectedFieldId) {
    panel.innerHTML = `
      <div class="no-selection">
        <p>Select a field to edit its properties</p>
      </div>
    `;
    return;
  }

  const field = appState.fields.find(f => f.id === appState.selectedFieldId);
  if (!field) return;

  const fieldType = FIELD_TYPES[field.type];
  
  let html = `
    <h3>${fieldType.label} Properties</h3>
    <div class="property-group">
  `;
  
  // Common properties
  if ('label' in field.props) {
    html += `
      <label>
        <span>Label</span>
        <input type="text" 
               value="${field.props.label}" 
               onchange="updateFieldProp('${field.id}', 'label', this.value)">
      </label>
    `;
  }
  
  if ('placeholder' in field.props) {
    html += `
      <label>
        <span>Placeholder</span>
        <input type="text" 
               value="${field.props.placeholder}" 
               onchange="updateFieldProp('${field.id}', 'placeholder', this.value)">
      </label>
    `;
  }
  
  if ('logicalName' in field.props) {
    const options = LOGICAL_NAMES[appState.targetAudience] || [];
    html += `
      <label>
        <span>Logical Name</span>
        <input type="text" 
               list="logical-names-${field.id}"
               value="${field.props.logicalName}" 
               onchange="updateFieldProp('${field.id}', 'logicalName', this.value)">
        <datalist id="logical-names-${field.id}">
          ${options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
        </datalist>
      </label>
    `;
  }
  
  if ('required' in field.props) {
    html += `
      <label class="checkbox-label">
        <input type="checkbox" 
               ${field.props.required ? 'checked' : ''} 
               onchange="updateFieldProp('${field.id}', 'required', this.checked)">
        <span>Required</span>
      </label>
    `;
  }
  
  if ('prefill' in field.props) {
    html += `
      <label class="checkbox-label">
        <input type="checkbox" 
               ${field.props.prefill ? 'checked' : ''} 
               onchange="updateFieldProp('${field.id}', 'prefill', this.checked)">
        <span>Enable Prefill</span>
      </label>
    `;
  }
  
  // Field-specific properties
  if ('buttonText' in field.props) {
    html += `
      <label>
        <span>Button Text</span>
        <input type="text" 
               value="${field.props.buttonText}" 
               onchange="updateFieldProp('${field.id}', 'buttonText', this.value)">
      </label>
    `;
  }
  
  if ('content' in field.props) {
    html += `
      <label>
        <span>Content</span>
        <textarea onchange="updateFieldProp('${field.id}', 'content', this.value)">${field.props.content}</textarea>
      </label>
    `;
  }
  
  html += `</div>`;
  
  panel.innerHTML = html;
}

/**
 * Handle drag start from palette
 */
function handlePaletteDragStart(e) {
  e.dataTransfer.setData('fieldType', e.target.dataset.fieldType);
  e.dataTransfer.effectAllowed = 'copy';
}

/**
 * Handle drop on canvas
 */
function handleCanvasDrop(e) {
  e.preventDefault();
  const fieldType = e.dataTransfer.getData('fieldType');
  if (fieldType) {
    addField(fieldType);
  }
}

/**
 * Handle drag over canvas
 */
function handleCanvasDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
}

/**
 * Export the form as HTML
 */
async function exportForm() {
  const manager = new ExportManager(
    { title: appState.formTitle, fields: appState.fields },
    appState.designTokens
  );
  await manager.loadTemplate();
  
  const filename = appState.formTitle.toLowerCase().replace(/\s+/g, '-') + '.html';
  manager.download(filename);
}

/**
 * Initialize the application
 */
function init() {
  renderPalette();
  renderCanvas();
  renderPropertiesPanel();
  
  // Canvas drop zone
  const canvas = document.getElementById('form-canvas');
  if (canvas) {
    canvas.addEventListener('drop', handleCanvasDrop);
    canvas.addEventListener('dragover', handleCanvasDragOver);
  }
  
  // Export button
  const exportBtn = document.getElementById('export-btn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportForm);
  }
  
  // Form title input
  const titleInput = document.getElementById('form-title');
  if (titleInput) {
    titleInput.value = appState.formTitle;
    titleInput.addEventListener('change', (e) => {
      appState.formTitle = e.target.value;
    });
  }
  
  // Target audience select
  const audienceSelect = document.getElementById('target-audience');
  if (audienceSelect) {
    audienceSelect.value = appState.targetAudience;
    audienceSelect.addEventListener('change', (e) => {
      appState.targetAudience = e.target.value;
      renderPropertiesPanel(); // Update logical name suggestions
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);

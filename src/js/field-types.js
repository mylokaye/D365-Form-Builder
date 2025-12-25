/**
 * Field Types Definition
 * 
 * Maps field types to their HTML output generators.
 * Each field type has:
 * - type: The data-editorblocktype value
 * - cssClass: Wrapper class
 * - defaultProps: Default property values
 * - render(): Function that generates HTML string
 */

const FIELD_TYPES = {
  // ============================================
  // INPUT FIELDS
  // ============================================
  
  text: {
    type: 'TextFormField',
    cssClass: 'textFormFieldBlock',
    label: 'Text',
    icon: '📝',
    category: 'input',
    defaultProps: {
      label: 'Text Field',
      placeholder: '',
      logicalName: '',
      required: false,
      prefill: true,
      maxLength: 100
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="required"' : '';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-targetproperty="${props.logicalName}"
             ${requiredAttr}
             ${prefillAttr}>
          <label title="${props.label}" for="${props.logicalName}-${id}">${props.label}</label>
          <input id="${props.logicalName}-${id}"
                 type="text"
                 name="${props.logicalName}"
                 placeholder="${props.placeholder}"
                 title="${props.label}"
                 maxlength="${props.maxLength}"
                 ${requiredInput}>
        </div>
      `;
    }
  },

  email: {
    type: 'TextFormField',
    cssClass: 'textFormFieldBlock',
    label: 'Email',
    icon: '✉️',
    category: 'input',
    defaultProps: {
      label: 'Email',
      placeholder: 'Enter your email address',
      logicalName: 'emailaddress1',
      required: true,
      prefill: true
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="required"' : '';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-targetproperty="${props.logicalName}"
             ${requiredAttr}
             ${prefillAttr}>
          <label title="${props.label}" for="${props.logicalName}-${id}">${props.label}</label>
          <input id="${props.logicalName}-${id}"
                 type="email"
                 name="${props.logicalName}"
                 placeholder="${props.placeholder}"
                 title="${props.label}"
                 ${requiredInput}>
        </div>
      `;
    }
  },

  phone: {
    type: 'TextFormField',
    cssClass: 'phoneFormFieldBlock',
    label: 'Phone',
    icon: '📱',
    category: 'input',
    defaultProps: {
      label: 'Phone Number',
      placeholder: 'Enter your phone number',
      logicalName: 'mobilephone',
      required: false,
      prefill: true
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="required"' : '';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-targetproperty="${props.logicalName}"
             ${requiredAttr}
             ${prefillAttr}>
          <label title="${props.label}" for="${props.logicalName}-${id}">${props.label}</label>
          <input id="${props.logicalName}-${id}"
                 type="tel"
                 name="${props.logicalName}"
                 placeholder="${props.placeholder}"
                 title="${props.label}"
                 pattern="(\\+[\\(]?[0-9]{1,4}|[\\(]?00[0-9]{0,2}|[\\(]?011[0-9]?|[\\(]?010[0-9]?)[\\)]?([ \\-\\(\\)]*[0-9][ \\-\\(\\)]*){3,16}"
                 ${requiredInput}>
        </div>
      `;
    }
  },

  textarea: {
    type: 'TextAreaFormField',
    cssClass: 'textFormFieldBlock',
    label: 'Text Area',
    icon: '📄',
    category: 'input',
    defaultProps: {
      label: 'Message',
      placeholder: '',
      logicalName: 'description',
      required: false,
      prefill: true,
      rows: 5,
      maxLength: 2000
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="required"' : '';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-targetproperty="${props.logicalName}"
             ${requiredAttr}
             ${prefillAttr}>
          <label title="${props.label}" for="${props.logicalName}-${id}">${props.label}</label>
          <textarea id="${props.logicalName}-${id}"
                    name="${props.logicalName}"
                    placeholder="${props.placeholder}"
                    title="${props.label}"
                    cols="20"
                    rows="${props.rows}"
                    maxlength="${props.maxLength}"
                    ${requiredInput}></textarea>
        </div>
      `;
    }
  },

  datetime: {
    type: 'DateTimeFormField',
    cssClass: 'dateTimeFormFieldBlock',
    label: 'Date/Time',
    icon: '📅',
    category: 'input',
    defaultProps: {
      label: 'Date',
      placeholder: 'Select date',
      logicalName: '',
      required: false,
      prefill: true
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="required"' : '';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-targetproperty="${props.logicalName}"
             ${requiredAttr}
             ${prefillAttr}>
          <label title="${props.label}" for="${props.logicalName}-${id}">${props.label}</label>
          <input id="${props.logicalName}-${id}"
                 type="datetime-local"
                 name="${props.logicalName}"
                 placeholder="${props.placeholder}"
                 title="${props.label}"
                 ${requiredInput}>
        </div>
      `;
    }
  },

  // ============================================
  // SELECTION FIELDS
  // ============================================

  dropdown: {
    type: 'OptionSetFormField',
    cssClass: 'optionSetFormFieldBlock',
    label: 'Dropdown',
    icon: '▼',
    category: 'selection',
    defaultProps: {
      label: 'Select Option',
      logicalName: '',
      required: false,
      prefill: true,
      options: [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' }
      ]
    },
    render(props, id) {
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      const optionsHtml = props.options
        .map(opt => `<option value="${opt.value}">${opt.label}</option>`)
        .join('\n                ');
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             ${prefillAttr}>
          <label title="${props.label}" class="block-label" for="${props.logicalName}-${id}">${props.label}</label>
          <select id="${props.logicalName}-${id}" name="${props.logicalName}" title="${props.label}" ${requiredInput}>
            <option value="" disabled selected hidden>Select</option>
            ${optionsHtml}
          </select>
        </div>
      `;
    }
  },

  checkbox: {
    type: 'TwoOptionFormField',
    cssClass: 'twoOptionFormFieldBlock',
    label: 'Checkbox',
    icon: '☑️',
    category: 'selection',
    defaultProps: {
      label: 'I agree',
      logicalName: '',
      required: false,
      prefill: true,
      checkedValue: '1',
      uncheckedValue: '0'
    },
    render(props, id) {
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-options='[{"value":"${props.checkedValue}","label":"Yes"},{"value":"${props.uncheckedValue}","label":"No"}]'
             ${prefillAttr}>
          <div class="twooption_checkbox">
            <div>
              <input id="${props.logicalName}-${id}"
                     name="${props.logicalName}"
                     title="${props.label}"
                     type="checkbox"
                     value="${props.checkedValue}"
                     ${requiredInput}>
              <label title="${props.label}" class="block-label" for="${props.logicalName}-${id}">${props.label}</label>
            </div>
          </div>
        </div>
      `;
    }
  },

  radio: {
    type: 'TwoOptionFormField',
    cssClass: 'twoOptionFormFieldBlock',
    label: 'Radio Buttons',
    icon: '⚪',
    category: 'selection',
    defaultProps: {
      label: 'Choose one',
      logicalName: '',
      required: false,
      prefill: true,
      options: [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' }
      ],
      defaultValue: '0'
    },
    render(props, id) {
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const optionsJson = JSON.stringify(props.options.map(o => ({ value: o.value, label: o.label })));
      
      const radioHtml = props.options
        .map((opt, i) => {
          const checked = opt.value === props.defaultValue ? 'checked' : '';
          return `
                <div>
                  <input id="${props.logicalName}-${id}-${i}"
                         name="${props.logicalName}"
                         title="${opt.label}"
                         type="radio"
                         value="${opt.value}"
                         ${checked}>
                  <label for="${props.logicalName}-${id}-${i}" title="${opt.label}">${opt.label}</label>
                </div>`;
        })
        .join('');
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             data-options='${optionsJson}'
             ${prefillAttr}>
          <label title="${props.label}" class="block-label" for="${props.logicalName}-${id}">${props.label}</label>
          <div id="${props.logicalName}-${id}" class="radiobuttons">
            ${radioHtml}
          </div>
        </div>
      `;
    }
  },

  // ============================================
  // CONSENT FIELDS
  // ============================================

  consent: {
    type: 'Consent',
    cssClass: 'consentBlock',
    label: 'Consent',
    icon: '✅',
    category: 'consent',
    defaultProps: {
      label: 'I agree to receive communications',
      required: true,
      complianceSettingsId: '00000000-0000-0000-0000-000000000000',
      complianceSettingsName: 'Default',
      purposeId: '10000000-0000-0000-0000-000000000003',
      purposeName: 'Commercial',
      channels: 'Email',
      optInWhenChecked: true,
      prefill: true
    },
    render(props, id) {
      const requiredAttr = props.required ? 'data-required="true"' : 'data-required="false"';
      const prefillAttr = props.prefill ? 'data-prefill="prefill"' : '';
      const requiredInput = props.required ? 'required aria-required="true"' : '';
      
      return `
        <div class="${this.cssClass}"
             data-editorblocktype="${this.type}"
             ${requiredAttr}
             style="padding: 4px 30px;"
             data-compliancesettingsid="${props.complianceSettingsId}"
             data-compliancesettingsname="${props.complianceSettingsName}"
             data-purposeid="${props.purposeId}"
             data-purposename="${props.purposeName}"
             data-channels="${props.channels}"
             data-optinwhenchecked="${props.optInWhenChecked}"
             ${prefillAttr}>
          <div>
            <input type="checkbox"
                   id="consent-${id}"
                   name="msdynmkt_purposeid;channels;optinwhenchecked"
                   value="${props.purposeId};${props.channels};${props.optInWhenChecked}"
                   ${requiredInput}>
            <label id="consent-${id}-label" for="consent-${id}">
              <p>${props.label}</p>
            </label>
          </div>
        </div>
      `;
    }
  },

  // ============================================
  // LAYOUT ELEMENTS
  // ============================================

  textBlock: {
    type: 'Text',
    cssClass: '',
    label: 'Text Block',
    icon: '🔤',
    category: 'layout',
    defaultProps: {
      content: 'Enter your text here',
      tag: 'p',
      align: 'center'
    },
    render(props, id) {
      return `
        <div data-editorblocktype="${this.type}" style="margin: 10px; text-align: ${props.align};">
          <${props.tag}>${props.content}</${props.tag}>
        </div>
      `;
    }
  },

  divider: {
    type: 'Divider',
    cssClass: 'dividerWrapper',
    label: 'Divider',
    icon: '➖',
    category: 'layout',
    defaultProps: {
      color: '#e1dfdd',
      thickness: 2
    },
    render(props, id) {
      return `
        <div data-editorblocktype="${this.type}" style="margin: 20px 10px;">
          <div class="dividerWrapper" align="center">
            <table style="padding: 0px; margin: 0px; width: 100%; border-collapse: collapse;"
                   role="presentation" cellpadding="0" cellspacing="0">
              <tbody>
                <tr style="padding: 0px;">
                  <th style="margin: 0px; padding: 0px; vertical-align: top;
                             border-top-width: ${props.thickness}px; border-top-style: solid;
                             border-top-color: ${props.color};">
                    <p style="margin: 0px; padding: 0px; line-height: 0px; width: 100%;">
                      <span>&nbsp;</span>
                    </p>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  },

  submit: {
    type: 'SubmitButton',
    cssClass: 'submitButtonWrapper',
    label: 'Submit Button',
    icon: '🔘',
    category: 'layout',
    defaultProps: {
      buttonText: 'Submit'
    },
    render(props, id) {
      return `
        <div data-editorblocktype="${this.type}" class="submitButtonWrapper">
          <button class="submitButton" type="submit">
            <span>${props.buttonText}</span>
          </button>
        </div>
      `;
    }
  }
};

// Common logical names for autocomplete
const LOGICAL_NAMES = {
  contact: [
    { value: 'firstname', label: 'First Name' },
    { value: 'lastname', label: 'Last Name' },
    { value: 'emailaddress1', label: 'Email' },
    { value: 'mobilephone', label: 'Mobile Phone' },
    { value: 'telephone1', label: 'Business Phone' },
    { value: 'jobtitle', label: 'Job Title' },
    { value: 'companyname', label: 'Company Name' },
    { value: 'address1_city', label: 'City' },
    { value: 'address1_country', label: 'Country' },
    { value: 'description', label: 'Description' }
  ],
  lead: [
    { value: 'firstname', label: 'First Name' },
    { value: 'lastname', label: 'Last Name' },
    { value: 'emailaddress1', label: 'Email' },
    { value: 'mobilephone', label: 'Mobile Phone' },
    { value: 'telephone1', label: 'Business Phone' },
    { value: 'jobtitle', label: 'Job Title' },
    { value: 'companyname', label: 'Company Name' },
    { value: 'subject', label: 'Topic' },
    { value: 'description', label: 'Description' }
  ]
};

// Field categories for palette grouping
const FIELD_CATEGORIES = [
  { id: 'input', label: 'Input Fields' },
  { id: 'selection', label: 'Selection' },
  { id: 'consent', label: 'Consent' },
  { id: 'layout', label: 'Layout' }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FIELD_TYPES, LOGICAL_NAMES, FIELD_CATEGORIES };
}

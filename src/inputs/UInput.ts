import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { getPropertyMeta } from '../decorators/PropertyMeta';

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';

import SlInput from '@shoelace-style/shoelace/dist/components/input/input.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import SlColorPicker from '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js';
import SlTextarea from '@shoelace-style/shoelace/dist/components/textarea/textarea.js';

export type UInputType = (
  'text' | 'email' | 'search' | 'url' | 'tel' |
  'date' | 'datetime-local' | 'time' |
  'number' | 'password' | 
  'textarea' |
  'checkbox' | 
  'select' | 'multi-select' |
  'color'
);
export type UInputSize = 'small' | 'medium' | 'large';
export interface UInputSelectItem {
  display: string;
  value: any;
  disabled?: boolean;
}

@customElement('u-input')
export class UInput extends LitElement {

  @query('.u-input') input!: SlInput | SlCheckbox | SlColorPicker | SlSelect | SlTextarea;

  @property({ type: String }) type: UInputType = 'text';
  @property({ type: String }) size: UInputSize = 'small';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) filled: boolean = false;
  @property({ type: Boolean }) rounded: boolean = false;
  @property({ type: Boolean }) clearable: boolean = true;
  @property({ type: String }) label?: string;
  @property({ type: String }) help?: string;
  @property({ type: String }) icon?: string;
  @property({ type: String }) hint?: string;
  @property({ type: Number }) minLength?: number;
  @property({ type: Number }) maxLength?: number;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
  @property({ type: Boolean }) autofocus: boolean = false;
  @property({ type: Array }) selectItems?: any[];
  @property({ type: Object }) context?: any;
  @property({ type: String }) path?: string;
  @property({ attribute: false }) value?: any;
  @property({ type: String }) default?: string;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) pattern?: string;
  @property({ type: String }) invalidMessage?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if ((changedProperties.has('context') || 
      changedProperties.has('path')) &&
      this.context && this.path) {
      this.value = this.context[this.path];
      this.autoBind(this.context, this.path);
    }
    if (changedProperties.has('invalidMessage') && this.invalidMessage) {
      this.input.setCustomValidity(this.invalidMessage);
    }
  }
  
  private autoBind(context: any, path: string) {
    const meta = getPropertyMeta(context, path);
    if (!meta) return;

    this.label = meta.label;
    this.hint = meta.hint;
    this.required = meta.required || false;
    this.type = meta.type;
    this.pattern = meta.pattern;
  }
  
  render() {
    if (this.type === 'checkbox') {
      return this.renderCheckbox();
    } else if (this.type === 'color') {
      return this.renderColorPicker();
    } else if (this.type === 'select' || this.type === 'multi-select') {
      return this.renderSelect();
    } else if (this.type === 'textarea') {
      return this.renderTextArea();
    } else {
      return this.renderText();
    }
  }

  private renderCheckbox() {
    const display = this.help || this.hint || this.label || this.path || 'No Help or Hint';
    return html `
      <sl-checkbox
        class="u-input"
        size=${this.size}
        ?disabled=${this.disabled}
        ?checked=${this.value || false}
        ?required=${this.required}
        @sl-change=${this.handleChanged}
      >${display}</sl-checkbox>
    `;
  }

  private renderColorPicker() {
    const presets = `#d0021b; #f5a623; #f8e71c; #8b572a; #7ed321; #417505; #bd10e0; #9013fe;
    #4a90e2; #50e3c2; #b8e986; #000; #444; #888; #ccc; #fff;`
    return html `
      <sl-color-picker
        class="u-input"
        size=${this.size}
        value=${ifDefined(this.value)}
        ?disabled=${this.disabled}
        ?required=${this.required}
        format="hex"
        swatches=${presets}
        opacity
        hoist
        @sl-change=${this.handleChanged}
      ></sl-color-picker>
    `;
  }

  private renderSelect() {
    return html `
      <sl-select
        class="u-input"
        size=${this.size}
        value=${ifDefined(this.value)}
        label=${ifDefined(this.label)}
        placeholder=${ifDefined(this.hint)}
        helpText=${ifDefined(this.help)}
        ?required=${this.required}
        ?multiple=${this.type === 'multi-select'}
        ?filled=${this.filled}
        ?pill=${this.rounded}
        ?disabled=${this.disabled}
        ?clearable=${this.clearable}
        hoist
        @sl-change=${this.handleChanged}
      >
        ${this.icon ? html`<u-icon slot="prefix" name=${this.icon}></u-icon>` : ''}
        ${this.selectItems?.map((item: UInputSelectItem) => {
          return html `
            <sl-option 
              .value=${item.value}
              ?disabled=${item.disabled}
            >
              ${item.display}
            </sl-option>`;
        })}
      </sl-select>
    `;
  }

  private renderTextArea() {
    return html `
      <sl-textarea
        class="u-input"
        size=${this.size}
        value=${ifDefined(this.value)}
        label=${ifDefined(this.label)}
        placeholder=${ifDefined(this.hint)}
        helpText=${ifDefined(this.help)}
        minlength=${ifDefined(this.minLength)}
        maxlength=${ifDefined(this.maxLength)}
        ?required=${this.required}
        ?autofocus=${this.autofocus}
        ?filled=${this.filled}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        resize="auto"
        @sl-change=${this.handleChanged}
      ></sl-textarea>
    `;
  }

  private renderText() {
    return html `
      <sl-input
        class="u-input"
        type=${this.type as any}
        size=${this.size}
        value=${ifDefined(this.value)}
        label=${ifDefined(this.label)}
        placeholder=${ifDefined(this.hint)}
        helpText=${ifDefined(this.help)}
        minlength=${ifDefined(this.minLength)}
        maxlength=${ifDefined(this.maxLength)}
        min=${ifDefined(this.min)}
        max=${ifDefined(this.max)}
        pattern=${ifDefined(this.pattern)}
        ?required=${this.required}
        ?filled=${this.filled}
        ?pill=${this.rounded}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        ?clearable=${this.clearable}
        ?autofocus=${this.autofocus}
        ?password-toggle=${this.type === 'password'}
        autocomplete="off"
        @sl-change=${this.handleChanged}
      >
        ${this.icon ? html`<u-icon slot="prefix" name=${this.icon}></u-icon>` : ''}
      </sl-input>
    `;
  }

  private async handleChanged(e: Event) {
    const target = e.target as SlInput | SlCheckbox | SlColorPicker | SlSelect | SlTextarea;
    this.value = target instanceof SlCheckbox ? target.checked : target.value;
    console.log('UInput.handleChanged', this.value);
    if(this.context && this.path) {
      this.context[this.path] = this.convertValue(this.value);
    }
    const isValid = target.reportValidity();
    console.log('UInput.Validity', isValid);
    this.dispatchEvent(new CustomEvent('change', {
      detail: this.value
    }));
  }

  private convertValue(value: any) {
    if (this.type === 'number') {
      return parseFloat(value);
    } else if (this.type === 'date' || this.type === 'datetime-local') {
      return new Date(value);
    } else {
      return value;
    }
  }

  static styles = css`
    .u-input {
      
    }
  `;

  // import { isObservableObject, runInAction } from 'mobx';

  // import { EntityFieldUtils, type IEntityField } from '../data';

  // export enum InputTypes {
//   text,
//   email,
//   password,
//   tel,
//   url,
//   checkbox,
//   number,
//   date,
//   time,
//   datetime
// }

  // onChangeTextField(e: any) {

  //   const value = e.target.value;
  //   const pattern = e.target.pattern;
  //   if (this.validate(value, pattern)) {
  //     this.value = e.target.value.trim();
  //     this.onChange(this.value);
  //     e.cancelBubble = true;
  //   }
  // }

  // validate(value: any, pattern: any) {
  //   if (value && pattern) {
  //     const regex = new RegExp(pattern);
  //     if (!regex.test(value)) {
  //       this.errorMessage = '입력된 값이 유효하지 않습니다.';
  //       return false;
  //     }
  //   }
  //   this.errorMessage = null;
  //   return true;
  // }

  // onChange(value: any) {
  //   if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
  //     if (value == '') {
  //       value = null;
  //     }
  //   }
    
  //   const event = new CustomEvent('change', { detail: {value: value} }); //, bubbles: true, composed: true, cancelable: true
  //   this.dispatchEvent(event);

  //   if (this.skipUpdate != true && this.context && this.path) {
  //     if (isObservableObject(this.context)) {
  //       runInAction(() => {
  //         this.context[this.path!] = value;
  //       });
  //     } else {
  //       this.context[this.path] = value;
  //     }
  //   }

  //   if (this.updatedAction && this.path) {
  //     this.updatedAction(this.path, value, this.context);
  //   }
  // }
  
  // getPatternByType(type: string | null | undefined): string | null {
    
  //   if (type == null || type == undefined || type == 'text') {
  //     return null;
  //   } else if (type == 'email') {
  //     return '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  //   } else if (type == 'tel') {
  //     // 숫자, -, +, (, ) 만 입력 가능
  //     return '^[-+()0-9]+$';
  //   } else if (type == 'url') {
  //     return '^((http|https):\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}' + 
  //       '((:[0-9]{1,5})?\\/.*)?$';
  //   } else if (type == 'password') {
  //     // 숫자, 영문자, 특수문자(!@#$%^&*()-_=+) 만 입력 가능
  //     return '[0-9a-zA-Z!@#$%^&*()-_=+]';
  //   } else {
  //     return null;
  //   }
  // }

  // @property({type: Object})
  // entityField?: IEntityField;

  // @property({type: Boolean, attribute: 'skip-update'})
  // skipUpdate: boolean = false; // context[path] = value; 값이 변경될 때 업데이트하지 않습니다.
  
  // onChangedEntityField(field: IEntityField) {
  //   if (field == null) return;

  //   this.type = EntityFieldUtils.getInputType(field);
  //   if (field.label) {
  //     this.label = field.label;
  //   }
    
  //   if (field.hint) {
  //     this.hint = field.hint;
  //   }

  //   if (field.required) {
  //     this.required = field.required;
  //   }

  //   if (field.multiline) {
  //     this.multiline = field.multiline;
  //   }

  //   if (field.maxLength) {
  //     this.maxLength = field.maxLength;
  //   }
    
  //   if (field.format) {
  //     //this.format = EntityFieldUtils.getInputFormat(field);
  //   }

  //   if (field.name) {
  //     this.path = field.name;

  //     if (this.context && this.path) {
  //       this.autoWire(this.context, this.path);
  //     }
  //   }
  // }
}
import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { runInAction } from 'mobx';

import { getPropertyMeta } from '../../decorators/PropertyMeta';

import SlInput from '@shoelace-style/shoelace/dist/components/input/input.component.js';
import SlCheckbox from '@shoelace-style/shoelace/dist/components/checkbox/checkbox.component.js';
import SlColorPicker from '@shoelace-style/shoelace/dist/components/color-picker/color-picker.component.js';
import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.component.js';
import SlOption from '@shoelace-style/shoelace/dist/components/option/option.component.js';
import SlTextarea from '@shoelace-style/shoelace/dist/components/textarea/textarea.component.js';
SlInput.define('sl-input');
SlCheckbox.define('sl-checkbox');
SlColorPicker.define('sl-color-picker');
SlSelect.define('sl-select');
SlOption.define('sl-option');
SlTextarea.define('sl-textarea');

import type { 
  UInputModel,
  UInputType,
  UInputSize,
  UInputSelectItem,
  UInputMeta,
} from './UInputModel';

@customElement('u-input')
export class UInput extends LitElement implements UInputModel {

  @query('.input') input!: SlInput | SlCheckbox | SlColorPicker | SlSelect | SlTextarea;

  @property({ type: String }) type: UInputType = 'text';
  @property({ type: String }) size: UInputSize = 'medium';
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
  @property({ type: Array }) selectItems?: UInputSelectItem[];
  @property({ type: Object }) context?: any;
  @property({ type: String }) path?: string;
  @property({ attribute: false }) value?: any;
  @property({ attribute: false }) default?: any;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) pattern?: string;
  @property({ type: String }) invalidMessage?: string;
  @property({ attribute: false }) meta?: UInputMeta;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if ((changedProperties.has('context') || 
      changedProperties.has('path')) &&
      this.context && this.path) {
      this.autoBind(this.context, this.path);
    }
    if (changedProperties.has('meta') && this.meta) {
      this.applyMeta(this.meta);
    }
  }
  
  private autoBind(context: any, path: string) {
    const meta = getPropertyMeta(context, path);
    if (meta) {
      const { name, ...rest } = meta; // eslint-disable-line
      this.applyMeta(rest);
      this.value = context[path] = rest.default || context[path] || this.default;
    } else {
      this.value = context[path] || this.default;
    }
  }

  private applyMeta(meta: UInputMeta) {
    this.type = meta.type || 'text';
    this.size = meta.size || 'medium';
    this.disabled = meta.disabled || false;
    this.readonly = meta.readonly || false;
    this.filled = meta.filled || false;
    this.rounded = meta.rounded || false;
    this.clearable = meta.clearable || true;
    this.label = meta.label;
    this.help = meta.help;
    this.icon = meta.icon;
    this.hint = meta.hint;
    this.minLength = meta.minLength;
    this.maxLength = meta.maxLength;
    this.min = meta.min;
    this.max = meta.max;
    this.autofocus = meta.autofocus || false;
    this.selectItems = meta.selectItems;
    this.default = meta.default;
    this.required = meta.required || false;
    this.pattern = meta.pattern;
    this.invalidMessage = meta.invalidMessage;
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
        class="input"
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
        class="input"
        size=${this.size}
        value=${ifDefined(this.value || this.default)}
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
        class="input"
        size=${this.size}
        value=${ifDefined(this.value || this.default)}
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
        class="input"
        size=${this.size}
        value=${ifDefined(this.value || this.default)}
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
        class="input"
        type=${this.type as any}
        size=${this.size}
        value=${ifDefined(this.value || this.default)}
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
    const value = target instanceof SlCheckbox ? target.checked : target.value || undefined;
    if(value) this.value = value;
    runInAction(() => {
      if(this.context && this.path) {
        this.context[this.path] = this.convertValue(value);
      }
    });
    this.checkValidity();
    this.dispatchEvent(new CustomEvent('change', {
      detail: value
    }));
  }

  private convertValue(value: any) {
    if (value === undefined || value === null || value === '') {
      return undefined;
    }else if (this.type === 'number') {
      return parseFloat(value);
    } else if (this.type === 'date' || this.type === 'datetime-local') {
      return new Date(value);
    } else {
      return value;
    }
  }

  public checkValidity() {
    if(this.input.validity.patternMismatch) {
      this.input.setCustomValidity(this.invalidMessage || 'Invalid pattern');
    } else {
      this.input.setCustomValidity('');
    }
    const isValid = this.input.reportValidity();
    return isValid;
  }

  static styles = css`
    sl-input[data-user-invalid]::part(base),
    sl-textarea[data-user-invalid]::part(base),
    sl-select[data-user-invalid]::part(combobox),
    sl-checkbox[data-user-invalid]::part(control),
    sl-color-picker[data-user-invalid]::part(trigger) {
      border-color: var(--sl-color-danger-600);
    }

    sl-input[data-user-valid]::part(base),
    sl-textarea[data-user-valid]::part(base),
    sl-select[data-user-valid]::part(combobox),
    sl-checkbox[data-user-valid]::part(control),
    sl-color-picker[data-user-valid]::part(trigger) {
      border-color: var(--sl-color-success-600);
    }
  `;
}
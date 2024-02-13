import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js';

import { getPropertyMeta } from '../decorators/PropertyMeta';

import { isObservableObject, runInAction } from 'mobx';

import { EntityFieldUtils, type IEntityField } from '../data';

export enum InputTypes {
  text,
  email,
  password,
  tel,
  url,
  checkbox,
  number,
  date,
  time,
  datetime
}

@customElement('u-input')
export class UInputw extends LitElement {

  static styles = [
    css`
    :host {
      display: block;
    }

    :host(:focus-within) {
      outline: none;
    }

    fast-text-field {
      display: block;
      margin: 2px 0px;
    }

    fast-text-area {
      display: block;
      margin: 2px 0px;
    }

    fast-number-field {
      display: block;
      margin: 2px 0px;  
    }

    fast-checkbox {
      margin: 4px 0px 4px 0px;
    }

    fast-number-field::part(control) {
      text-align: right;
    }
    `
  ];

  @property({type: InputTypes})
  type: InputTypes | string = InputTypes.text;

  @property()
  value:any = null;
  
  @property({type: String})
  label: string | null = null;

  @property({type: String})
  hint: string | null = null;

  @property({type: Boolean})
  required = false;

  @property({type: Object})
  context: any = null;

  @property({type: String})
  path: string | null = null;

  @property({type: Boolean, attribute: 'skip-update'})
  skipUpdate: boolean = false; // context[path] = value; 값이 변경될 때 업데이트하지 않습니다.

  @property({type: Boolean})
  readonly: boolean = false;

  @property({type: Boolean, attribute: 'auto-focus'})
  autoFocus: boolean = false;

  @property({type: Boolean, attribute: true})
  multiline: boolean = false;

  @property({type: Number})
  minLength: number | null = null;

  @property({type: Number})
  maxLength: number | null = null;

  @property({type: String})
  pattern: string | null = null;

  @property({type: Number}) // number-field
  min: number | null = null;

  @property({type: Number}) // number-field
  max: number | null = null;

  @property({type: Function})
  updatedAction: ((path: string, value: any, context: any) => void) | null = null;
  
  @property({type: String})
  errorMessage: string | null = null;

  @property({type: Object})
  entityField?: IEntityField;
  
  private lastContext: any = null;
  private lastPath: string | null = null;
  
  onChangedEntityField(field: IEntityField) {
    if (field == null) return;

    this.type = EntityFieldUtils.getInputType(field);
    if (field.label) {
      this.label = field.label;
    }
    
    if (field.hint) {
      this.hint = field.hint;
    }

    if (field.required) {
      this.required = field.required;
    }

    if (field.multiline) {
      this.multiline = field.multiline;
    }

    if (field.maxLength) {
      this.maxLength = field.maxLength;
    }
    
    if (field.format) {
      //this.format = EntityFieldUtils.getInputFormat(field);
    }

    if (field.name) {
      this.path = field.name;

      if (this.context && this.path) {
        this.autoWire(this.context, this.path);
      }
    }
  }

  protected async updated(_changedProperties: any) {
    super.updated(_changedProperties);
    await this.updateComplete;
    
    if (this.context && this.path) {

      if (this.context == this.lastContext && this.path == this.lastPath) return;
      
      this.lastContext = this.context;
      this.lastPath = this.path;
      
      this.autoWire(this.context, this.path);
    }
  }
  
  autoWire(context: any, path: string) {
    const options = getPropertyMeta(context, path);
    if (options) {
      if (options.label) {
        this.label = options.label;
      }

      if (options.hint) {
        this.hint = options.hint;
      }
      
      if (options.required) {
        this.required = options.required;
      }

      if (options.type) {
        const typeName = (<any>options.type).name;

        if (typeName == "String") {
          this.type = InputTypes.text;
        }

        if (typeName == "Boolean") {
          this.type = InputTypes.checkbox;
        }

        if (typeName == "Number") {
          this.type = InputTypes.number;
        }
      }

      if (options.format) {
        const inputType = InputTypes[<any>options.format];
        
        if (inputType == undefined) {
          throw `not suppreted ${options.format}`
        } else {
          this.type = inputType;
        }
      }
    }
    
    if (this.hint == null) {
      if (this.label) {
        this.hint = this.label;
      } else {
        this.hint = path;
      }
    }
    
    const v = context[path];
    this.value = v == undefined ? '' : v;
  }
  
  render() {

    return html`
      ${this.renderInput()}
      ${this.renderError()}
    `;
  }
  
  renderInput() {
    if (this.type == InputTypes.checkbox || this.type == InputTypes[InputTypes.checkbox]) {
      return this.renderCheckbox();

    } else if (this.type == InputTypes.email || this.type == InputTypes[InputTypes.email]) {
      return this.renderText('email');

    } else if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      return this.renderNumber();

    } else if (this.type == InputTypes.date || this.type == InputTypes[InputTypes.date]) {
      return html`<input type="date">`;

    } else if (this.type == InputTypes.time || this.type == InputTypes[InputTypes.time]) {
      return html`<input type="time">`;      

    } else if (this.type == InputTypes.datetime || this.type == InputTypes[InputTypes.datetime]) {
      return html`<input type="datetime-local">`;
      
    } else {
      let inputType = this.type;
      if (typeof this.type == "number") {
        inputType = InputTypes[this.type];
      }
      if (this.multiline) {
        return this.renderTextArea(`${inputType}`);
      } else {
        return this.renderText(`${inputType}`);
      }
    }
  }
  
  renderError() {
    if (this.errorMessage) {
      return html`<div style="color: red; font-size: 12px;">${this.errorMessage}</div>`;
    }
    return html``;
  }
  
  renderText(type?: string | null) {
    const pattern = this.pattern ?? this.getPatternByType(type);
    return html `
    <fast-text-field @change=${this.onChangeTextField}
      .type=${type}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label} 
      .minLength=${this.minLength}
      .maxlength=${this.maxLength}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      pattern=${pattern}
      tabindex=0>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-text-field>
    `;
  }

  renderTextArea(type?: string | null) {
    
    return html `
    <fast-text-area @change=${(e: any) => {
        this.value = e.target.value.trim();
        this.onChange(this.value);
        e.cancelBubble = true;
      }} 
      .type=${type}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-text-area>
    `;
  }

  renderCheckbox() {
    return html `
    <fast-checkbox @change=${(e: any) => {
        this.value = e.target.currentChecked;
        this.onChange(this.value);
        e.cancelBubble = true;      
      }} 
      ?checked=${this.value}
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      tabindex=0>
      ${this.label}
    </fast-checkbox>`;
  }

  renderNumber() {
    // <fast-number-field appearance="filled" min="0" max="10"></fast-number-field>
    return html `
    <fast-number-field @change=${(e: any) => {
        this.value = e.target.value !== null ? Number(e.target.value) : null;
        this.onChange(this.value);
        e.cancelBubble = true;
      }}
      .value=${this.value} 
      .placeholder=${this.hint ?? this.label} 
      ?required=${this.required}
      ?readonly=${this.readonly}
      ?autofocus=${this.autoFocus}
      .min=${this.min}
      .max=${this.max}
      tabindex=0>
      ${this.label && this.required ? html`<span style="color:red;">&#42;</span>` : html``}
      ${this.label}
    </fast-number-field>
    `;
  }

  onChangeTextField(e: any) {

    const value = e.target.value;
    const pattern = e.target.pattern;
    if (this.validate(value, pattern)) {
      this.value = e.target.value.trim();
      this.onChange(this.value);
      e.cancelBubble = true;
    }
  }

  validate(value: any, pattern: any) {
    if (value && pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        this.errorMessage = '입력된 값이 유효하지 않습니다.';
        return false;
      }
    }
    this.errorMessage = null;
    return true;
  }

  onChange(value: any) {
    if (this.type == InputTypes.number || this.type == InputTypes[InputTypes.number]) {
      if (value == '') {
        value = null;
      }
    }
    
    const event = new CustomEvent('change', { detail: {value: value} }); //, bubbles: true, composed: true, cancelable: true
    this.dispatchEvent(event);

    if (this.skipUpdate != true && this.context && this.path) {
      if (isObservableObject(this.context)) {
        runInAction(() => {
          this.context[this.path!] = value;
        });
      } else {
        this.context[this.path] = value;
      }
    }

    if (this.updatedAction && this.path) {
      this.updatedAction(this.path, value, this.context);
    }
  }
  
  getPatternByType(type: string | null | undefined): string | null {
    
    if (type == null || type == undefined || type == 'text') {
      return null;
    } else if (type == 'email') {
      return '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
    } else if (type == 'tel') {
      // 숫자, -, +, (, ) 만 입력 가능
      return '^[-+()0-9]+$';
    } else if (type == 'url') {
      return '^((http|https):\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}' + 
        '((:[0-9]{1,5})?\\/.*)?$';
    } else if (type == 'password') {
      // 숫자, 영문자, 특수문자(!@#$%^&*()-_=+) 만 입력 가능
      return '[0-9a-zA-Z!@#$%^&*()-_=+]';
    } else {
      return null;
    }
  }
}
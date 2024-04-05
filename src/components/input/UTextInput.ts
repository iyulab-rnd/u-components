import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { UTextInputModel, type InputTextFormat } from "./UTextInput.model";
import { UBaseInput } from "./UBaseInput";

@customElement('u-text-input')
export class UTextInput extends UBaseInput implements UTextInputModel {
  
  @query('input') input!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;  
  @property({ type: Number }) length?: number;
  @property({ type: String }) format?: InputTextFormat;
  @property({ type: String }) pattern?: string | RegExp;
  @property({ type: String }) invalidMessage?: string;
  @property({ type: String }) placeholder?: string;
  @property({ type: String }) value?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('value')) {
      this.clearable = !!this.value;
    }
  }

  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <slot name="prefix"></slot>
          <input type=${this.format || 'text'}
            autocomplete="off"
            spellcheck="false"
            maxlength=${this.length || ''}
            value=${this.value || ''}
            placeholder=${this.placeholder || ''}
            ?required=${this.required}
            @input=${this.onInput}
            @change=${this.onChage}
          />
          <u-icon type="system" name="clear"
            @click=${this.handleClear}
          ></u-icon>
          <slot name="suffix"></slot>
        </u-input-border>
      </u-input-container>
    `;
  }

  private onInput = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private handleClear = () => {
    this.input.value = "";
    this.value = "";
    this.input.focus();
  }

  public async validate() {
    if(!this.input.validity.valid) {
      return this.setInvalid(this.input.validationMessage);
    }
    if(this.pattern && this.value) {
      const regExp = new RegExp(this.pattern);
      if(!regExp.test(this.value)) {
        return this.setInvalid(this.invalidMessage || "Invalid format");
      }
    }
    return this.setValid();
  }

  static styles = css`
    :host {
      width: 100%;
      --input-size: 14px;
    }
    :host([clearable]) u-icon {
      display: inline-flex;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0;
      background-color: transparent;
      font-size: var(--input-size);
      line-height: 1.5;
    }

    u-icon {
      display: none;
      font-size: var(--input-size);
      cursor: pointer;
    }
  `;
}
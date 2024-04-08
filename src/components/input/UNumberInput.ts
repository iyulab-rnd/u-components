import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { UNumberInputModel } from "./UNumberInput.model";
import { UBaseInput } from "./UBaseInput";

@customElement('u-number-input')
export class UNumberInput extends UBaseInput implements UNumberInputModel {
  
  @query('input') input!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;
  @property({ type: Boolean }) integerOnly?: boolean;
  @property({ type: Number }) min?: number = 0;
  @property({ type: Number }) max?: number = 10;
  @property({ type: String }) placeholder?: string;
  @property({ type: Number }) value?: number;

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
          <input type="number"
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            min=${ifDefined(this.min)}
            max=${ifDefined(this.max)}
            placeholder=${this.placeholder || ''}
            value=${this.value || ''}
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
    const value = target.value;
    if(this.min && Number(value) < this.min) {
      target.value = this.min.toString();
      this.value = this.min;
    } else if(this.max && Number(value) > this.max) {
      target.value = this.max.toString();
      this.value = this.max;
    } else if(this.integerOnly && value.includes('.')) {
      target.value = value.split('.')[0];
      this.value = Number(value.split('.')[0]);
    } else {
      this.value = Number(value);
    }
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private handleClear = () => {
    this.input.value = "";
    this.value = undefined;
    this.input.focus();
  }

  public async validate() {
    if(!this.input.validity.valid) {
      return this.setInvalid(this.input.validationMessage);
    }
    return this.setValid();
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }
    :host slot::slotted(*) {
      font-size: inherit;
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
      font-size: inherit;
      line-height: 1.5;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: textfield;
      margin: 0;
    }

    u-icon {
      display: none;
      font-size: inherit;
      cursor: pointer;
    }
  `;
}
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { UNumberInputModel, type NumberInputFormat } from "./UNumberInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";

@customElement('u-number-input')
export class UNumberInput extends UBaseInput implements UNumberInputModel {
  
  @query('input') inputEl!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable?: boolean;
  @property({ type: String }) format?: NumberInputFormat;
  @property({ type: Number }) min?: number;
  @property({ type: Number }) max?: number;
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
          <u-icon class="clear" type="system" name="x-circle-fill"
            @click=${this.handleClear}
          ></u-icon>
          <slot name="suffix"></slot>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if(this.inputEl.validity.valid) {
      return this.setValid();
    } else {
      return this.setInvalid(this.inputEl.validationMessage);
    }
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
    } else if(this.format === 'integer' && value.includes('.')) {
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
    this.inputEl.value = "";
    this.value = undefined;
    this.inputEl.focus();
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }
    :host slot::slotted(*) {
      font-size: inherit;
    }
    :host([clearable]) .clear {
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

    .clear {
      display: none;
      font-size: inherit;
      color: var(--sl-color-gray-500);
      cursor: pointer;
    }
    .clear:hover {
      color: var(--sl-color-gray-800);
    }
  `;
}
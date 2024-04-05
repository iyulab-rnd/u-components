import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { UCheckboxInputModel } from "./UCheckboxInput.model";
import { UBaseInput } from "./UBaseInput";

@customElement('u-checkbox-input')
export class UCheckboxInput extends UBaseInput implements UCheckboxInputModel {
  
  @query('input') input!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;
  @property({ type: Boolean }) requiredCheck: boolean = true;
  @property({ type: Boolean }) value?: boolean;

  render() {
    return html`
      <input type="checkbox"
        ?checked=${this.value || false}
        ?required=${this.requiredCheck}
        @change=${this.onChage}
      />
      <u-input-label
        .label=${this.label}
        .required=${this.requiredCheck}
        .description=${this.description}
      ></u-input-label>
      <u-input-error
        .error=${this.error}
      ></u-input-error>
    `;
  }

  private onChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value = target.checked;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
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
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-column-gap: 8px;

      --input-size: 14px;
      --checkbox-size: calc(var(--input-size) * 0.85 * 1.5);
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([readonly]) {
      pointer-events: none;
    }

    input {
      grid-column: 1;
      width: var(--checkbox-size);
      height: var(--checkbox-size);
      margin: 0;
      padding: 0;
    }

    u-input-label {
      grid-column: 2;
    }

    u-input-error {
      grid-column: 2;
    }
  `;
}
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { UTextInputModel, type InputTextType } from "./UTextInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";

@customElement('u-text-input')
export class UTextInput extends UBaseInput implements UTextInputModel {
  
  @query('input') input!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;  
  @property({ type: String }) type?: InputTextType;
  @property({ type: Number }) length?: number;
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
          <input type=${this.type || 'text'}
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            pattern=${ifDefined(this.pattern)}
            maxlength=${ifDefined(this.length)}
            placeholder=${ifDefined(this.placeholder)}
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

  public async validate() {
    if(this.input.validity.valid) {
      return this.setValid();
    } else if(this.input.validity.valueMissing) {
      return this.setInvalid(this.invalidMessage || "This field is required");
    } else {
      return this.setInvalid(this.input.validationMessage);
    }
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

    u-icon {
      display: none;
      font-size: inherit;
      cursor: pointer;
    }
  `;
}
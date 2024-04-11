import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { UPasswordInputModel } from "./UPasswordInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";

@customElement('u-password-input')
export class UPasswordInput extends UBaseInput implements UPasswordInputModel {
  
  @query('input') inputEl!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable?: boolean;  
  @property({ type: Boolean }) visible?: boolean;  
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
          <input type=${this.visible ? 'text' : 'password'}
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
          <u-icon class="visible" type="system" name=${this.visible ? 'visible' : 'invisible'}
            @click=${this.handleVisible}
          ></u-icon>
          <u-icon class="clear" type="system" name="clear"
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
    } else if(this.inputEl.validity.patternMismatch) {
      return this.setInvalid(this.invalidMessage || "Invalid pattern.");
    } else {
      return this.setInvalid(this.inputEl.validationMessage);
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

  private handleVisible = () => {
    this.visible = !this.visible;
  }

  private handleClear = () => {
    this.inputEl.value = "";
    this.value = "";
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

    .visible {
      display: inline-flex;
      font-size: inherit;
      color: var(--sl-color-gray-500);
      cursor: pointer;
      margin-right: 5px;
      box-sizing: border-box;
    }
    .visible:hover {
      color: var(--sl-color-gray-800);
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
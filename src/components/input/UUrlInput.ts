import { css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { UUrlInputModel } from "./UUrlInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";
import "./USelectInput";

@customElement('u-url-input')
export class UUrlInput extends UBaseInput implements UUrlInputModel {
  private static readonly pattern: RegExp = /^[a-zA-Z][a-zA-Z\d+\-.]*:(\/\/)?[\S]+$/;

  @query('input') inputEl!: HTMLInputElement;

  @state() scheme?: string;
  @state() path?: string;

  @property({ type: Boolean, reflect: true }) clearable?: boolean;  
  @property({ type: Array }) schemes?: string[] = ['Enter Manually', 
  'http://', 'https://', 'ftp://', 'file://', 'mailto:', 'tel:', 
  'sms:', 'geo:', 'urn:', 'data:', 'ws://', 'wss://'];
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
          <u-select-input
            required
            .options=${this.schemes}
            @change=${this.onSchemeChange}
          ></u-select-input>
          <input type="text"
            autocomplete="off"
            spellcheck="false"
            placeholder=${ifDefined(this.placeholder)}
            value=${this.path || ''}
            @input=${this.onInput}
            @change=${this.onChage}
          />
          <u-icon class="clear" type="system" name="clear"
            @click=${this.handleClear}
          ></u-icon>
          <slot name="suffix"></slot>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if(this.required && (!this.value || !UUrlInput.pattern.test(this.value))) {
      return this.setInvalid('Invalid URL');
    } else {
      return this.setValid();
    }
  }

  private onSchemeChange = (event: CustomEvent) => {
    this.scheme = event.detail === 'Enter Manually' ? '' : event.detail;
    this.value = `${this.scheme}${this.path}`;
  }

  private onInput = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.path = target.value;
    this.value = `${this.scheme}${this.path}`;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.path = target.value;
    this.value = `${this.scheme}${this.path}`;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private handleClear = () => {
    this.inputEl.value = "";
    this.value = this.scheme || '';
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

    u-select-input {
      width: 10em;
      font-size: 0.9em;
      --vertical-padding: 2px;
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
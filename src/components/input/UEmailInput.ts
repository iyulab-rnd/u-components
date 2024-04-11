import { css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { UEmailInputModel } from "./UEmailInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";
import "./USelectInput";

@customElement('u-email-input')
export class UEmailInput extends UBaseInput implements UEmailInputModel {
  private static readonly pattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

  @query('.username') nameInputEl!: HTMLInputElement;
  @query('.domain') domainInputEl!: HTMLInputElement;

  @state() userName?: string;
  @state() domain?: string;
  @state() manualDomain?: boolean;

  @property({ type: Boolean, reflect: true }) clearable?: boolean;  
  @property({ type: Array }) domains?: string[] = ['Enter Manually', 
  'gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com',
  'naver.com', 'daum.net', 'nate.com' ];
  @property({ type: String }) value?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('value')) {
      this.userName = this.value?.split('@')[0] || '';
      this.domain = this.value?.split('@')[1] || '';
      this.clearable = !!this.value;
    }
  }

  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <slot name="prefix"></slot>
          <input class="username"
            type="text"
            autocomplete="off"
            spellcheck="false"
            .value=${this.userName || ''}
            @input=${this.onUsernameInput}
            @change=${this.onUsernameChage}
          />
          <u-icon class="at" type="system" name="at"
            @click=${this.handleClear}
          ></u-icon>
          <input class="domain"
            type="text"
            autocomplete="off"
            spellcheck="false"
            ?disabled=${!this.manualDomain}
            .value=${this.domain || ''}
            @input=${this.onDomainInput}
            @change=${this.onDomainChage}
          />
          <u-select-input
            required
            .options=${this.domains}
            @change=${this.onDomainSelect}
          ></u-select-input>
          <u-icon class="clear" type="system" name="clear"
            @click=${this.handleClear}
          ></u-icon>
          <slot name="suffix"></slot>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if(this.required && (!this.value || !UEmailInput.pattern.test(this.value))) {
      return this.setInvalid('Please enter a valid email address');
    } else {
      return this.setValid();
    }
  }

  private onUsernameInput = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const userName = target.value;
    this.value = `${userName}@${this.domain || ''}`;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onUsernameChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const userName = target.value;
    this.value = `${userName}@${this.domain || ''}`;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private onDomainInput = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const domain = target.value || '';
    this.value = `${this.userName}@${domain}`;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onDomainChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    const domain = target.value || '';
    this.value = `${this.userName}@${domain}`;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private onDomainSelect = (event: CustomEvent) => {
    const domain = event.detail;
    if(domain === 'Enter Manually') {
      this.manualDomain = true;
      this.value = `${this.userName}@`;
      this.domainInputEl.value = '';
      this.domainInputEl.focus();
    } else {
      this.manualDomain = false;
      this.value = `${this.userName}@${domain}`;
      this.validate();
    }
  }

  private handleClear = () => {
    this.nameInputEl.value = "";
    this.domainInputEl.value = "";
    this.userName = "";
    this.domain = "";
    this.value = "";
    this.nameInputEl.focus();
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }
    :host(:focus-within) .at {
      color: var(--sl-color-gray-800);
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
    

    .at {
      font-size: inherit;
      color: var(--sl-color-gray-500);
    }

    u-select-input {
      width: 20em;
      font-size: 0.9em;
      --vertical-padding: 2px;
    }

    .clear {
      display: none;
      font-size: inherit;
      color: var(--sl-color-gray-500);
      margin-left: 5px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .clear:hover {
      color: var(--sl-color-gray-800);
    }
  `;
}
import { css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import { URestURLInputModel, type RestMethod, type RestURLValue } from "./URestURLInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";
import { convertReact } from "../../utils";

@customElement('u-rest-url-input')
export class URestURLInputElement extends UBaseInput implements URestURLInputModel {
  
  @query('input') input!: HTMLInputElement;

  @state() prefix: 'http://' | 'https://' = 'https://';

  @property({ type: Boolean, reflect: true }) clearable?: boolean;
  @property({ type: Array }) methods: RestMethod[] = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE", "PATCH", "CONNECT"];
  @property({ type: Object }) value?: RestURLValue;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if(changedProperties.has('value')) {
      this.clearable = !!this.value?.url;
    }
  }

  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <u-select-input
            required
            .size=${this.size}
            .value=${this.value?.method || "GET"}
            .options=${this.methods}
            @change=${this.onChangeMethod}
          ></u-select-input>
          <div class="prefix"
            @click=${this.onChangePrefix}>
            ${this.prefix}
          </div>
          <input type="text"
            autocomplete="off"
            spellcheck="false"
            value=${this.value?.url || ''}
            ?required=${this.required}
            @input=${this.onInputUrl}
            @change=${this.onChangeUrl}
          />
          <u-icon class="clear" type="system" name="x-circle-fill"
            @click=${this.onClearUrl}
          ></u-icon>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if(!this.input.validity.valid)  {
      return this.setInvalid(this.input.validationMessage);
    } else {
      return this.setValid();
    }
  }

  private onChangeMethod = (event: Event) => {
    event.stopPropagation();
    const target = event.target as any;
    this.value ||= { method: "GET", url: "" };
    this.value = { method: target.value, url: this.value.url };
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private onChangePrefix = () => {
    this.prefix = this.prefix === 'http://' ? 'https://' : 'http://';
    if(this.value?.url) {
      this.value = { method: this.value.method, url: this.prefix + this.value.url.replace(/^https?:\/\//, '') };
      this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
    }
  }

  private onInputUrl = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value ||= { method: "GET", url: "" };
    const fullUrl = target.value || `${this.prefix}${target.value}` || "";
    this.value = { method: this.value.method, url: fullUrl };
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChangeUrl = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value ||= { method: "GET", url: "" };
    const fullUrl = target.value || `${this.prefix}${target.value}` || "";
    this.value = { method: this.value.method, url: fullUrl };
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private onClearUrl = () => {
    this.input.value = "";
    this.value ||= { method: "GET", url: "" };
    this.value = { method: this.value.method, url: "" };
    this.input.focus();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }
    :host([clearable]) .clear {
      display: inline-flex;
    }

    u-input-border {
      gap: 0;
    }

    u-select-input {
      width: 10em;
      font-size: 0.9em;
      margin-right: 10px;
      --vertical-padding: 2px;
    }

    .prefix {
      font-size: inherit;
      line-height: 1.5;
      padding: 0px 1px;
      cursor: pointer;
    }
    .prefix:hover {
      color: var(--sl-color-primary-500);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0px 1px;
      background-color: transparent;
      font-family: inherit;
      font-size: inherit;
      line-height: 1.5;
      box-sizing: border-box;
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

export const URestURLInput = convertReact({
  elementClass: URestURLInputElement,
  tagName: 'u-rest-url-input',
  events: {
    onInput: 'input',
    onChange: 'change'
  }
});
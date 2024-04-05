import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { URestURLInputModel, type RestURLValue } from "./URestURLInput.model";
import { UBaseInput } from "./UBaseInput";

@customElement('u-rest-url-input')
export class URestURLInput extends UBaseInput implements URestURLInputModel {
  private methods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE", "PATCH", "CONNECT"];  

  @query('input') input!: HTMLInputElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;
  @property({ type: String }) placeholder?: string;
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
          <input type="url"
            autocomplete="off"
            spellcheck="false"
            value=${this.value?.url || ''}
            ?required=${this.required}
            placeholder=${this.placeholder || ''}
            @input=${this.onInputUrl}
            @change=${this.onChangeUrl}
          />
          <u-icon type="system" name="clear"
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

  private onInputUrl = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value ||= { method: "GET", url: "" };
    this.value = { method: this.value.method, url: target.value };
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChangeUrl = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value ||= { method: "GET", url: "" };
    this.value = { method: this.value.method, url: target.value };
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
      --input-size: 14px;
    }
    :host([clearable]) u-icon {
      display: inline-flex;
    }

    u-select-input {
      width: calc(var(--input-size) * 7);
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      padding: 0;
      background-color: transparent;
      font-size: var(--input-size);
      line-height: 1.5;
      border-bottom: 1px solid var(--sl-color-gray-300);
      box-sizing: border-box;
    }

    u-icon {
      display: none;
      font-size: var(--input-size);
      cursor: pointer;
    }
  `;
}
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { UInputBase } from "./UInputBase";

const Methods = ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "TRACE", "PATCH", "CONNECT"];
export interface RestURLValue {
  method: "GET" | "PUT" | "POST" | "DELETE" | "HEAD" | "OPTIONS" | "TRACE" | "PATCH" | "CONNECT";
  url: string;
}

import "../input-parts/UInputOption";

@customElement('u-rest-url-input')
export class URestURLInput extends UInputBase {

  @query('input') input!: HTMLInputElement;

  @property({ type: String }) placeholder?: string;
  @property({ type: Object }) value: RestURLValue = { method: "GET", url: "" };

  render() {
    return html`
      <u-input-container>
        <u-input-wrapper>
          <u-input-option 
            .value=${this.value.method} 
            .options=${Methods}
            @change=${this.onChangeMethod}
          ></u-input-option>
          <input type="url" @change=${this.onChangeUrl} />
        </u-input-wrapper>
      </u-input-container>
    `;
  }

  public async validate() {
    if(this.required && !this.value.url) {
      this.error = `This ${this.name} field is required`;
      return false;
    } else {
      this.error = "";
      return true;
    }
  }

  private onChangeMethod(event: Event) {
    const target = event.target as any;
    this.value = { ...this.value, method: target.value };
  }

  public async onChangeUrl() {
    const value = this.input.value;
    this.value = { ...this.value, url: value };
  }

  static styles = css`
    :host {
      display: block;
    }

    ds-input-option {
      width: 100px;
    }

    input {
      display: block;
      flex: 1;
      border: none;
      outline: none;
      background-color: transparent;
      padding: 0;
      font-size: 14px;
      line-height: 20px;
      border-bottom: 1px solid var(--sl-color-gray-300);
    }
  `;
}
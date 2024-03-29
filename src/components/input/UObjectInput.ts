import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from 'lit/directives/repeat.js';

import { UInputBase } from "./UInputBase";

@customElement('u-object-input')
export class UObjectInput extends UInputBase {

  @property({ type: String }) placeholder?: string;
  @property({ type: Object }) value?: object = {
    "content-type": "application/json",
    "accept": "application/json"
  };

  render() {
    console.log("value", this.value);
    const entries = this.value ? Object.entries(this.value) : [];
    return html`
      <u-input-container>
      ${repeat(entries, ([key, value]) => key, ([key, value]) => html`
        ${console.log("key", key, "value", value)}
          <div class="property">
            <u-text-input .value=${key}
              @change=${(e) => this.onChageKey(e, key)}>
              <u-tooltip slot="prefix" content="Key">
                <u-icon name="key"></u-icon>
              </u-tooltip>
            </u-text-input>
            <u-text-input .value=${value}
              @change=${(e) => this.onChageValue(e, key)}>
              <u-icon slot="prefix" name="value"></u-icon>
            </u-text-input>
            <u-icon name="trash" @click=${() => {
              //@ts-ignore
              delete this.value[key];
              this.value = { ...this.value };
            }}></u-icon>
          </div>
      `)}
        <div class="create" @click=${this.addProperty}>
          <u-icon name="plus-square"></u-icon>
        </div>
      </u-input-container>
    `;
  }

  public async validate() {
    return true;
  }

  private async addProperty() {
    this.value = { ...this.value, "": "" };
  }

  private async onChageKey(event: Event, prevKey: string) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as any;
    const newKey = target.value;
    if (prevKey === newKey) return;
    //@ts-ignore
    const oldValue =  this.value?.[prevKey];
    this.value = { ...this.value, [newKey]: oldValue };
    //@ts-ignore
    delete this.value[prevKey];
  }

  private async onChageValue(event: Event, key: string) {
    event.preventDefault();
    event.stopPropagation();
    const target = event.target as any;
    const value = target.value;
    this.value = { ...this.value, [key]: value };
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .property {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      width: 100%;
    }

    .create {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 5px;
      border: 1px dashed var(--sl-color-gray-300);
      box-sizing: border-box;
      cursor: pointer;
    }
    .create:hover {
      background-color: var(--sl-color-gray-100);
    }
  `;
}
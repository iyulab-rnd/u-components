import { css, html } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";
import { repeat } from 'lit/directives/repeat.js';
import { convertReact } from "../../utils";

import type { UTextInputElement } from "../input/UTextInput";
import { UArrayInputModel } from "./UArrayInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";
import { t } from "../../localization";

@customElement('u-array-input')
export class UArrayInputElement extends UBaseInput implements UArrayInputModel {

  @queryAll('u-text-input') inputs!: NodeListOf<UTextInputElement>;

  @property({ type: Array }) value?: string[];

  render() {
    return html`
      <u-input-container>
        <div class="container">
          ${this.value && this.value.length > 0 
            ? this.renderArray(this.value)
            : this.renderAddButton()
          }
        </div>
      </u-input-container>
    `;
  }

  private renderAddButton() {
    return html`
      <div class="create" @click=${() => this.addValue(0)}>
        <u-icon type="system" name="plus-square"></u-icon>
        <label>Add New</label>
      </div>
    `;
  }

  private renderArray(value: string[]) {
    return html`
      ${repeat(value,
        (value, index) => ({value, index}),
        (value, index) => html`
          <div class="value">
            <u-text-input required
              .value=${value}
              @change=${(e: any) => this.onChangeValue(e, index)}>
            </u-text-input>
            <u-icon type="system" name="plus-square" 
              @click=${() => this.addValue(index)}
            ></u-icon>
            <u-icon type="system" name="minus-square" 
              @click=${() => this.deleteValue(index)}
            ></u-icon>
          </div>
        `
      )}
    `;
  }

  public async validate() {
    if (this.required) {
      if (!this.value || this.value.length === 0) {
        return this.setInvalid(t("requiredField", {
          ns: "component",
          defaultValue: "This field is required."
        }));
      }
      if (this.value.some(v => !v)) {
        return this.setInvalid(t("missingField", {
          ns: "component",
          defaultValue: "Please fill in all fields"
        }));
      }
    }
    return this.setValid();
  }

  private addValue = (index: number) => {
    this.value ||= [];
    this.value.splice(index + 1, 0, '');
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private deleteValue = (index: number) => {
    this.value?.splice(index, 1);
    this.value = this.value?.length === 0 ? undefined : this.value;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private onChangeValue = (event: Event, index: number) => {
    event.stopPropagation();
    const target = event.target as any;
    target.validate();
    const value = target.value;
    this.value ||= [];
    this.value[index] = value;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }

    .container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .value {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      gap: 5px;

      u-text-input {
        font-size: inherit;
      }

      u-icon {
        font-size: calc(1.5em + 10px);
        color: var(--sl-color-gray-300);
        cursor: pointer;
      }
      u-icon:hover {
        color: var(--sl-color-gray-600);
      }
    }

    .create {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      margin-top: 5px;
      padding: 5px 0px;
      border: 1px dashed var(--sl-color-gray-300);
      box-sizing: border-box;
      cursor: pointer;

      u-icon {
        font-size: inherit;
        color: var(--sl-color-gray-300);
      }
      label {
        font-size: inherit;
        color: var(--sl-color-gray-300);
        cursor: pointer;
      }
    }
    .create:hover {
      border-color: var(--sl-color-gray-600);
      background-color: var(--sl-color-gray-100);

      u-icon {
        color: var(--sl-color-gray-600);
      }
      label {
        color: var(--sl-color-gray-600);
      }
    }
  `;
}

export const UArrayInput = convertReact({
  elementClass: UArrayInputElement,
  tagName: 'u-array-input',
  events: {
    onChange: 'change',
  }
});
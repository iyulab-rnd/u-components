import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { UInputBorderModel } from "./UInputBorder.model";

@customElement('u-input-border')
export class UInputBorder extends LitElement implements UInputBorderModel {

  @property({ type: Boolean, reflect: true }) invaild: boolean = false;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid var(--sl-color-gray-300);
      background-color: var(--sl-color-neutral-0);
      box-sizing: border-box;
    }
    :host(:focus-within) {
      border: 2px solid var(--sl-color-primary-500);
      padding: 4px 9px;
    }
    :host([invaild]) {
      border: 2px solid var(--sl-color-red-500);
      padding: 4px 9px;
    }
  `;
}
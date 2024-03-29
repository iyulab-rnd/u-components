import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('u-input-wrapper')
export class UInputWrapper extends LitElement {

  @property({ type: Boolean, reflect: true }) invaild: boolean = false;
  @property({ type: Boolean, reflect: true }) multiline: boolean = false;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      border: 1px solid var(--sl-color-gray-300);
      border-radius: 4px;
      padding: 5px;
      box-sizing: border-box;
      background-color: var(--sl-color-neutral-0);
    }
    :host(:focus-within) {
      border: 2px solid var(--sl-color-primary-500);
      padding: 4px;
    }
    :host([invaild]) {
      border: 2px solid var(--sl-color-red-500);
      padding: 4px;
    }
    :host([multiline]) {
      align-items: flex-start;
    }
  `;
}
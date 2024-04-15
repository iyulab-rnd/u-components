import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("u-wizard-step")
export class UWizardStep extends LitElement {
  
  @property({ type: Boolean }) active?: boolean;
  @property({ type: Boolean }) disabled?: boolean;
  @property({ type: String }) content?: string;

  render() {
    return html`      
      <slot name="icon"></slot>
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
    :host([active]) {
      font-weight: bold;
      color: var(--sl-color-primary-500);
    }
  `;

}
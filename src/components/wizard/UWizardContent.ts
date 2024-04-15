import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("u-wizard-content")
export class UWizardContent extends LitElement {

  @property({ type: String }) name?: string;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = css`
    
  `;

}
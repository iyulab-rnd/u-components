import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('u-input-error')
export class UInputError extends LitElement {

  @property({ type: String }) error?: string;

  render() {
    if(!this.error) return nothing;

    return html`<div class="text">${this.error}</div>`;
  }

  static styles = css`
    :host {
      display: inline-block;
    }

    .text {
      color: red;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      padding: 0px 5px;
    }
  `;
}
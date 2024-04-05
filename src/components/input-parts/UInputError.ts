import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('u-input-error')
export class UInputError extends LitElement {

  @property({ type: String }) error?: string;

  render() {
    if(!this.error) return nothing;

    return html`<div class="error">${this.error}</div>`;
  }

  static styles = css`
    :host {
      display: inline-block;

      --error-size: calc(var(--input-size, 14px) * 0.85);
    }

    .error {
      color: red;
      font-size: var(--error-size);
      font-weight: 400;
      line-height: 1.5;
      padding: 2px 5px;
    }
  `;
}
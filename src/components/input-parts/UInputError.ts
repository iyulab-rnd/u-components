import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { UInputErrorModel } from './UInputError.model';

@customElement('u-input-error')
export class UInputError extends LitElement implements UInputErrorModel {

  @property({ type: String }) error?: string;

  render() {
    if(!this.error) return nothing;

    return html`<div class="error">${this.error}</div>`;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-size: 0.85em;
    }

    .error {
      color: red;
      font-size: inherit;
      font-weight: 400;
      line-height: 1.5;
      padding: 2px 5px;
    }
  `;
}
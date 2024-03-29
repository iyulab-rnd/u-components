import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('u-input-label')
export class UInputLabel extends LitElement {

  @property({ type: Boolean, reflect: true }) required: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;

  render() {
    if(!this.label) return nothing;
    
    return html`
      <label class="label">${this.label}</label>
      ${this.renderDescription()}
    `;
  }

  private renderDescription() {
    if(!this.description) return nothing;
    
    return html`
      <u-tooltip .content=${this.description}>
        <u-icon name="question-circle"></u-icon>
      </u-tooltip>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
    }
    :host([required]) .label::before {
      content: ' *';
      padding-right: 4px;
      color: red;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `;
}
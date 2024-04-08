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
      <div class="container">
        <label>${this.label}</label>
        ${this.renderDescription()}
      </div>
    `;
  }

  private renderDescription() {
    if(!this.description) return nothing;
    
    return html`
      <div class="tooltip">
        <u-icon type="system" name="info"></u-icon>
        <pre>${this.description}</pre>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: inline-block;
      font-size: 0.85em;
    }
    :host([required]) label::before {
      content: ' *';
      padding-right: 4px;
      color: red;
    }

    .container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 5px;
      padding: 3px 0px;
    }

    label {
      font-size: inherit;
      font-weight: 600;
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tooltip {
      position: relative;
      display: inline-flex;

      u-icon {
        font-size: inherit;
        cursor: help;
      }
      u-icon:hover + pre {
        opacity: 1;
        transform: scale(1);
      }

      pre {
        display: block;
        pointer-events: none;
        position: absolute;
        z-index: 10;
        top: 0px;
        left: calc(100% + 5px);
        box-sizing: border-box;
        margin: 0;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: var(--sl-color-gray-800);
        color: var(--sl-color-neutral-0);
        font-family: var(--sl-font-sans);
        font-size: inherit;
        line-height: 1.5;
        opacity: 0;
        transform: scale(0.8);
        transform-origin: top left;
        transition: all 0.15s ease;
      }
    }

  `;
}
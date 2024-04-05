import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type LabelPosition = 'top' | 'left' | 'right' | 'bottom';

@customElement('u-input-container')
export class UInputContainer extends LitElement {

  @property({ type: String, reflect: true }) labelPosition: LabelPosition = 'top';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) readonly: boolean = true;
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;
  
  render() {
    return html`
      <div class="position">
        <u-input-label
          .required=${this.required}
          .label=${this.label}
          .description=${this.description}
        ></u-input-label>
        <slot></slot>
      </div>
      <u-input-error 
        .error=${this.error}
      ></u-input-error>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      --label-width: auto;
    }
    :host([labelPosition="top"]) .position{
      flex-direction: column;
    }
    :host([labelPosition="left"]) .position {
      flex-direction: row;
      --label-width: 20%;
    }
    :host([labelPosition="bottom"]) .position{
      flex-direction: column-reverse;
    }
    :host([labelPosition="right"]) .position {
      flex-direction: row-reverse;
    }
    :host([disabled]) .position slot::slotted(*) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([readonly]) .position slot::slotted(*) {
      pointer-events: none;
    }

    .position {
      width: 100%;
      display: flex;

      u-input-label {
        width: var(--label-width);
      }
    }
  `;
}
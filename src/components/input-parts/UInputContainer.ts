import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { UInputContainerModel, type LabelPosition } from "./UInputContainer.model";

@customElement('u-input-container')
export class UInputContainer extends LitElement implements UInputContainerModel {

  @property({ type: String, reflect: true }) labelPosition?: LabelPosition;
  @property({ type: Boolean, reflect: true }) disabled?: boolean;
  @property({ type: Boolean, reflect: true }) readonly?: boolean;
  @property({ type: Boolean }) required?: boolean;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;
  
  render() {
    return html`
      <div class="label-position">
        <u-input-label
          .required=${this.required || false}
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
    :host([labelPosition="top"]) .label-position{
      flex-direction: column;
    }
    :host([labelPosition="left"]) .label-position {
      flex-direction: row;
      --label-width: 20%;
    }
    :host([disabled]) .label-position slot::slotted(*) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([readonly]) .label-position slot::slotted(*) {
      pointer-events: none;
    }

    .label-position {
      width: 100%;
      display: flex;
      flex-direction: column;

      u-input-label {
        width: var(--label-width);
      }
    }
  `;
}
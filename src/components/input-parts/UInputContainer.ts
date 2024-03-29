import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

type LabelPosition = 'top' | 'left' | 'right' | 'bottom';

@customElement('u-input-container')
export class UInputContainer extends LitElement {

  @property({ type: String, attribute: "label-position", reflect: true }) 
  labelPosition: LabelPosition = 'top';

  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;

  render() {
    return html`
      <div class="position">
        <ds-input-label 
          .required=${this.required}
          .label=${this.label}
          .description=${this.description}
        ></ds-input-label>
        <slot></slot>
      </div>
      <ds-input-error 
        .error=${this.error}
      ></ds-input-error>
    `;
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      --input-label-width: 20%;
    }
    :host([label-position="top"]) .position{
      flex-direction: column;
    }
    :host([label-position="left"]) .position {
      flex-direction: row;
    }
    :host([label-position="bottom"]) .position{
      flex-direction: column-reverse;
    }
    :host([label-position="right"]) .position {
      flex-direction: row-reverse;
    }

    .position {
      width: 100%;
      display: flex;
      gap: 5px;

      ds-input-label {
        width: var(--input-label-width);
      }
    }
  `;
}
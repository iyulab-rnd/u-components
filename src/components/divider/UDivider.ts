import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import type { UDividerModel } from "./UDividerModel";

@customElement('u-divider')
export class UDivider extends LitElement implements UDividerModel {

  @property({ type: Boolean })
  vertical: boolean = false;

  @property({ type: String })
  color?: string;

  @property({ type: String })
  width?: string;

  @property({ type: String })
  spacing?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('color') && this.color) {
      this.style.setProperty('--color', this.color);
    }
    if (changedProperties.has('width') && this.width) {
      this.style.setProperty('--width', this.width);
    }
    if (changedProperties.has('space') && this.spacing) {
      this.style.setProperty('--spacing', this.spacing);
    }
  }

  static styles = css`
    :host {
      --color: var(--sl-panel-border-color);
      --width: var(--sl-panel-border-width);
      --spacing: var(--sl-spacing-medium);
      box-sizing: border-box;
    }

    :host([vertical]) {
      display: inline-block;
      height: 100%;
      border-left: solid var(--width) var(--color);
      margin: 0 var(--spacing);
    }

    :host(:not([vertical])) {
      display: block;
      width: 100%;
      border-top: solid var(--width) var(--color);
      margin: var(--spacing) 0;
    }
  
  `;
}
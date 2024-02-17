import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import SlDivider from '@shoelace-style/shoelace/dist/components/divider/divider.component.js';
SlDivider.define('sl-divider');

import type { UDividerModel } from "./UDividerModel";

@customElement('u-divider')
export class UDivider extends LitElement implements UDividerModel {
  
  @query("sl-divider")
  divider!: SlDivider;

  @property({ type: String })
  color?: string;

  @property({ type: Number })
  width?: number;

  @property({ type: Number })
  space?: number;

  @property({ type: String })
  orientation: 'vertical' | 'horizontal' = 'horizontal';

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('color') && this.color) {
      this.divider.style.setProperty('--color', this.color);
    }
    if (changedProperties.has('width') && this.width) {
      this.divider.style.setProperty('--width', `${this.width}px`);
    }
    if (changedProperties.has('space') && this.space) {
      this.divider.style.setProperty('--spacing', `${this.space}px`);
    }
  }

  render() {
    return html`
      <sl-divider
        .vertical=${this.orientation === 'vertical'}
      ></sl-divider>
    `;
  }
}
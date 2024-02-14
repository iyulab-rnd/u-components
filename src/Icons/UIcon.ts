import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.js';

import { UIconModel } from "./UIconModel";

@customElement('u-icon')
export class UIcon extends LitElement implements UIconModel {

  @query("sl-icon")
  icon!: SlIcon;

  @property({ type: String })
  name?: string;

  @property({ type: String })
  src?: string;

  @property({ type: Number })
  size?: number;

  @property({ type: String })
  color?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('color') && this.color) {
      this.icon.style.color = this.color;
    }
    if (changedProperties.has('size') && this.size) {
      this.icon.style.fontSize = `${this.size}px`;
    }
  }

  render() {
    return html`
      <sl-icon 
        .name=${this.name}
        .src=${this.src}
      ></sl-icon>
    `;
  }
  
}
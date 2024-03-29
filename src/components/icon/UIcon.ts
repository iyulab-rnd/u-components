import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import SlIcon from '@shoelace-style/shoelace/dist/components/icon/icon.component.js';
SlIcon.define('sl-icon');

import type { UIconModel } from "./UIconModel";

@customElement('u-icon')
export class UIcon extends LitElement implements UIconModel {

  @query("sl-icon")icon!: SlIcon;

  @property({ type: String }) name?: string;
  @property({ type: String }) src?: string;
  @property({ type: String }) size?: string;
  @property({ type: String }) color?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('color') && this.color) {
      this.icon.style.color = this.color;
    }
    if (changedProperties.has('size') && this.size) {
      this.icon.style.fontSize = this.size;
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
  
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

}
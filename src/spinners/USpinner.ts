import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "@shoelace-style/shoelace/dist/components/spinner/spinner.js";
import SlSpinner from "@shoelace-style/shoelace/dist/components/spinner/spinner.js";

import { USpinnerModel } from "./USpinnerModel";

@customElement('u-spinner')
export class USpinner extends LitElement implements USpinnerModel {

  @query('sl-spinner') 
  spinner!: SlSpinner;

  @property({ type: Number })
  size?: number;

  @property({ type: String })
  width?: string;

  @property({ type: String })
  indicatorColor?: string;

  @property({ type: String })
  trackColor?: string;

  protected updated(changedProperties: any) {
    super.updated(changedProperties);

    if (changedProperties.has('size') && this.size) {
      this.spinner.style.fontSize = `${this.size}px`;
    }
    if (changedProperties.has('width') && this.width) {
      this.spinner.style.setProperty('--track-width', `${this.width}px`);
    }
    if (changedProperties.has('indicatorColor') && this.indicatorColor) {
      this.spinner.style.setProperty('--indicator-color', this.indicatorColor);
    }
    if (changedProperties.has('trackColor') && this.trackColor) {
      this.spinner.style.setProperty('--track-color', this.trackColor);
    }
  }

  render() {
    return html`
      <sl-spinner></sl-spinner>
    `;
  }

}
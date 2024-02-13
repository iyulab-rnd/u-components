import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js";

import '../icons';

export type AlertType = "primary" | "neutral" | "success" | "warning" | "danger";

@customElement('u-alert')
export class UAlert extends LitElement {
  
  @query('sl-alert') 
  alert!: SlAlert;

  @property({ type: String }) 
  type: AlertType = "primary";

  @property({ type: Number })
  duration: number = 3000;

  @property({ type: String })
  text?: string;

  render() {
    return html`
      <sl-alert 
        .variant=${this.type} 
        .duration=${this.duration}
        closable>
        ${this.renderIcon()}
        ${this.text ?? html`<slot></slot>`}
      </sl-alert>
    `;
  }

  renderIcon() {
    const type = {
      primary: "info-circle",
      neutral: "gear",
      success: "check2-circle",
      warning: "exclamation-triangle",
      danger: "exclamation-octagon"
    }

    return html`
      <u-icon 
        slot="icon"
        name="${type[this.type]}"
      ></u-icon>
    `;
  }

  public async showAsync() {
    if(!document.body.contains(this)) {
      document.body.appendChild(this);  
    }
    await this.alert.toast();
  }

}
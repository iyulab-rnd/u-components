import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.component.js";
SlAlert.define('sl-alert');

import type {
  UAlertModel,
  AlertType,
  AlertContent 
} from "./UAlertModel";

import '../icon';

@customElement('u-alert')
export class UAlert extends LitElement implements UAlertModel {
  
  @query('sl-alert') alert!: SlAlert;

  @state() duration: number = 3000;
  @state() content?: AlertContent;

  @property({ type: String }) type: AlertType = "primary";
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) closable: boolean = true;

  render() {
    return html`
      <sl-alert
        .variant=${this.type}
        .duration=${this.duration}
        ?open=${this.open}
        ?closable=${this.closable}>
        ${this.renderIcon()}
        ${this.content || html`<slot></slot>`}
      </sl-alert>
    `;
  }

  private renderIcon() {
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

  public async toastAsync(type: AlertType, content: AlertContent, duration: number = 3000) {
    try {
      document.body.appendChild(this);
      this.type = type;
      this.content = content;
      this.duration = duration;
      await this.updateComplete;
      await this.alert.toast();
    } finally {
      document.body.removeChild(this);
    }
  }

  public show () {
    this.alert.show();
  }

  public hide () {
    this.alert.hide();
  }

}
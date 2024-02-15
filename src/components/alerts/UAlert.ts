import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import "@shoelace-style/shoelace/dist/components/alert/alert.js";
import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.js";

import type {
  UAlertModel,
  AlertType,
  AlertContent 
} from "./UAlertModel";

import '../icons';

@customElement('u-alert')
export class UAlert extends LitElement implements UAlertModel {
  
  @query('sl-alert')
  alert!: SlAlert;

  @property({ type: String }) 
  type: AlertType = "primary";

  @property({ type: Number })
  duration: number = 3000;

  @property({ attribute: false })
  content?: AlertContent;

  // TODO: toast사용시 <slot>이 렌더링 되지 않음, show/hide로 변경 필요
  render() {
    return html`
      <sl-alert 
        .variant=${this.type} 
        .duration=${this.duration}
        closable>
        ${this.renderIcon()}
        ${this.content}
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

  public async showAsync(type: AlertType, content: AlertContent, duration: number = 3000) {
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

}
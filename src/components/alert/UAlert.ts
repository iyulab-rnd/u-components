import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.component.js";
SlAlert.define('sl-alert');

import type {
  UAlertModel,
  AlertType,
  AlertContent 
} from "./UAlert.model";

import '../icon/UIcon';

@customElement('u-alert')
export class UAlert extends LitElement implements UAlertModel {
  
  @query('sl-alert') alert!: SlAlert;

  @property({ type: String }) type: AlertType = "primary";
  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) closable: boolean = true;
  @property({ type: Number }) duration: number = 3000;
  @property({ type: Object }) content?: AlertContent;

  render() {
    return html`
      <sl-alert
        .variant=${this.type}
        .duration=${this.duration}
        ?open=${this.open}
        ?closable=${this.closable}>
        <u-icon 
          slot="icon" 
          type="system" 
          name=${`alert-${this.type}`}
        ></u-icon>
        ${this.content || html`<slot></slot>`}
      </sl-alert>
    `;
  }

  // 일회성 토스트
  public async toastAsync(type: AlertType, content: AlertContent, duration: number = 3000) {
    this.type = type;
    this.content = content;
    this.duration = duration;
    await this.updateComplete;
    await this.alert.toast();
  }

  public show () {
    this.alert.show();
  }

  public hide () {
    this.alert.hide();
  }

}
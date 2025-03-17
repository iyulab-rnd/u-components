import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { convertReact } from "../../utils";

// Updated import method for Shoelace v2.20+
import '@shoelace-style/shoelace/dist/components/alert/alert.js';

import type { UAlertModel, AlertType, AlertContent } from "./UAlert.model";
import '../icon/UIcon';

@customElement('u-alert')
export class UAlertElement extends LitElement implements UAlertModel {
  
  @query('sl-alert') alert!: HTMLElement;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) closable: boolean = true;
  @property({ type: String }) type: AlertType = "primary";
  @property({ type: String }) label?: string;
  @property({ type: Object }) content?: AlertContent;

  render() {
    return html`
      <sl-alert
        .variant=${this.type}
        ?open=${this.open}
        ?closable=${this.closable}>
        <u-icon
          slot="icon"
          type="system" 
          name=${`alert-${this.type}`}
        ></u-icon>
        ${this.label ? html`<strong>${this.label}</strong><br>` : nothing}
        ${this.content || html`<slot></slot>`}
      </sl-alert>
    `;
  }

  public async showAsync () {
    // alert.show()에 타입 캐스팅 추가
    await (this.alert as any).show();
  }

  public async hideAsync () {
    // alert.hide()에 타입 캐스팅 추가
    await (this.alert as any).hide();
  }
}

export const UAlert = convertReact({
  elementClass: UAlertElement,
  tagName: 'u-alert',
});
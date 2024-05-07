import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { convertReact } from "../../utils";

import SlAlert from "@shoelace-style/shoelace/dist/components/alert/alert.component.js";
SlAlert.define('sl-alert');

import type { UAlertModel, AlertType, AlertContent } from "./UAlert.model";
import '../icon/UIcon';

@customElement('u-alert')
export class UAlertElement extends LitElement implements UAlertModel {
  
  @query('sl-alert') alert!: SlAlert;

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
        ${this.label ? html`<strong>${this.label}</strong>` : nothing}
        ${this.content || html`<slot></slot>`}
      </sl-alert>
    `;
  }

  public async showAsync () {
    await this.alert.show();
  }

  public async hideAsync () {
    await this.alert.hide();
  }

}

export const UAlert = convertReact({
  elementClass: UAlertElement,
  tagName: 'u-alert',
});

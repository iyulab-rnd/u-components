import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t } from "../../localization/ULocalizer";

import type { PropertyMetaData, PropertyMetaType } from "../../decorators/PropertyMeta.model";
import { UInputDialogModel, UInputDialogResult } from './UInputDialog.model';
import "./UDialog";
import "../input/UInput";
import "../button/UButtonGroup";
import "../button/UButton";

@customElement("u-input-dialog")
export class UInputDialog extends LitElement implements UInputDialogModel {
  private resolveHandler?: (value: UInputDialogResult) => void;
  
  @property({ type: Boolean }) open?: boolean;
  @property({ type: String }) label?: string;
  @property({ type: String }) type?: PropertyMetaType;
  @property({ type: Object }) meta?: PropertyMetaData;
  @property({ attribute: false }) value?: any;

  render() {
    return html`
      <u-dialog
        ?open=${this.open}
        .label=${this.label || t("component::inputTitle")}
      >
        <u-input
          .type=${this.type || "text"}
          .meta=${this.meta}
          .value=${this.value}
          @change=${this.handleChangeValue}
        ></u-input>
        <u-button-group gap="10px">
          <u-button
            theme="default"
            @click=${this.handleCancel}
          >${t("component::cancel")}</u-button>
          <u-button
            theme="primary"
            @click=${this.handleConfirm}
          >${t("component::confirm")}</u-button>
        </u-button-group>
      </u-dialog>
    `;
  }

  public async showAsync(): Promise<UInputDialogResult> {
    this.open = true;
    await this.updateComplete;
    return new Promise<UInputDialogResult>((resolve) => {
      this.resolveHandler = resolve;
    });
  }

  public async hideAsync() {
    this.open = false;
    await this.updateComplete;
    this.resolveHandler = undefined;
  }

  private handleConfirm = () => {
    if (this.resolveHandler) {
      this.resolveHandler({
        confirmed: true,
        value: this.value
      });
    }
    this.hideAsync();
  };

  private handleCancel = () => {
    if (this.resolveHandler) {
      this.resolveHandler({
        confirmed: false,
        value: this.value
      });
    }
    this.hideAsync();
  };

  private handleChangeValue = (e: any) => {
    this.value = e.target?.value;
  }

  static styles = css`
    u-input {
      margin-bottom: 20px;
    }
  `;
  
}
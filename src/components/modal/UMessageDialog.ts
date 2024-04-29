import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { t } from "../../localization/ULocalizer";

import { UMessageDialogModel } from './UMessageDialog.model';
import "./UDialog";
import "../button/UButtonGroup";
import "../button/UButton";

@customElement("u-message-dialog")
export class UMessageDialog extends LitElement implements UMessageDialogModel {
  private resolveHandler?: (value: boolean) => void;
  
  @query(".message") messageEl!: HTMLDivElement;

  @property({ type: Boolean }) open?: boolean;
  @property({ type: String }) label?: string;
  @property({ type: String }) message?: string;
  @property({ type: String }) color?: string;
  @property({ type: String }) size?: string;
  @property({ type: String }) weight?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has("color") && this.color) {
      this.messageEl.style.color = this.color;
    }
    if (changedProperties.has("size") && this.size) {
      this.messageEl.style.fontSize = this.size;
    }
    if (changedProperties.has("weight") && this.weight) {
      this.messageEl.style.fontWeight = this.weight;
    }
  }

  render() {
    return html`
      <u-dialog
        ?open=${this.open}
        .label=${this.label || t("component::messageTitle")}
      >
        <p class="message">
          ${this.message}
        </p>
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

  public async showAsync() {
    this.open = true;
    await this.updateComplete;
    return new Promise<boolean>((resolve) => {
      this.resolveHandler = resolve;
    });
  }

  public async hideAsync() {
    this.open = false;
    await this.updateComplete;
  }

  public handleConfirm = async () => {
    if (this.resolveHandler) {
      this.resolveHandler(true);
    }
    await this.hideAsync();
    this.resolveHandler = undefined;
  };

  public handleCancel = async () => {
    if (this.resolveHandler) {
      this.resolveHandler(false);
    }
    await this.hideAsync();
    this.resolveHandler = undefined;
  };

  static styles = css`
    .message {
      margin: 0;
      margin-bottom: 20px;
      font-size: 14px;
      line-height: 1;
      font-weight: 300;
      font-family: var(--sl-font-sans);
    }
  `;
  
}
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { t } from "../../localization/ULocalizer";

import { UCopyButtonModel } from "./UCopyButton.model";
import "../tooltip/UTooltip";
import "../icon/UIcon";

@customElement('u-copy-button')
export class UCopyButton extends LitElement implements UCopyButtonModel {

  @property({ type: Boolean, reflect: true }) copied: boolean = false;
  @property({ type: String }) size: string = '16px';
  @property({ type: String }) value?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('size') && this.size) {
      this.style.fontSize = this.size;
    }
  }

  render() {
    return html`
      <u-tooltip 
        position="bottom"
        .content=${this.copied 
          ? t('copied', { ns: 'component', defaultValue: 'Copied to clipboard' }) 
          : t('copy', { ns: 'component', defaultValue: 'Copy to clipboard' })}
      >
        <u-icon
          type="system"
          name=${this.copied ? 'check' : 'copy'}
          @click=${this.copy}
        ></u-icon>
      </u-tooltip>
    `;
  }

  private async copy() {
    if (this.copied || !this.value) return;
    await navigator.clipboard.writeText(this.value);
    this.copied = true;
    setTimeout(() => this.copied = false, 1_500);
  }
  
  static styles = css`
    :host {
      position: relative;
      display: inline-flex;
      font-size: 16px;
    }
    :host([copied]) u-icon {
      pointer-events: none;
      color: green;
      cursor: default;
    }
    u-icon {
      font-size: inherit;
      cursor: pointer;
    }
  `;
}
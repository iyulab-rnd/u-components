import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import SlButton from '@shoelace-style/shoelace/dist/components/button/button.js';

import { UDialogContent } from './UDialogContent';
import { UDialogResult } from './UDialogModel';

interface UDialogButton {
  text: string;
  theme?: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
  href?: string;
  close?: boolean;
  action?: () => void;
}

interface UDialogOptions {
  type?: 'blank' | 'content' | 'input' | 'message';
  label?: string;
  buttons?: UDialogButton[];
}

@customElement('u-dialog')
export class UDialog extends LitElement {
  
  @query("sl-dialog") 
  dialog!: SlDialog;

  @property({ type: String })
  label?: string;

  @property({ type: Boolean })
  noHeader?: boolean;

  @property({ type: Boolean })
  open?: boolean;

  @property({ type: Array })
  buttons?: UDialogButton[];

  @property({ attribute: false })
  content?: HTMLElement | UDialogContent | LitElement | TemplateResult | string;
  
  render() {
    return html`
      <sl-dialog 
        ?noHeader=${this.noHeader}
        ?open=${this.open}
        label=${ifDefined(this.label)}
      >
        ${this.content ?? html`<slot></slot>`}
        ${this.renderButtons()}
      </sl-dialog>
    `;
  }

  private renderButtons() {
    if (!this.buttons) return null;

    return html`
      ${this.buttons.map((button) => html`
        <sl-button
          slot="footer"
          variant=${button.theme ?? 'primary'}
          href=${ifDefined(button.href)}
          @click=${() => {}}
        >${button.text}
        </sl-button>
      `)}
    `;
  }
  
  async showAsync(options?: UDialogOptions) : Promise<UDialogResult> {
    await this.updateComplete;
    options = options ?? { type: 'blank' };
    this.dialog.show();

    return new Promise<UDialogResult>((resolve, reject) => {
      if (this.content instanceof UDialogContent) {
        this.content.dialogTask(resolve, reject);
      } else {
        resolve({ success: true, value: undefined });
      }
    });
  }

  async hideAsync() : Promise<void> {
    this.dialog.hide();
  }

  static styles = css`
    sl-dialog {
      --header-spacing: var(--sl-spacing-medium);
      --body-spacing: var(--sl-spacing-medium);
      --footer-spacing: var(--sl-spacing-medium);
    }
  `;

}
import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

import { UModalContent } from './UModalContent';
import type { UModalResult } from './UModalModel';

@customElement('u-dialog')
export class UDialog extends LitElement {
  
  @query("sl-dialog") 
  dialog!: SlDialog;

  @property({ type: Boolean })
  open: boolean = false;

  @property({ type: String })
  label?: string;

  @property({ type: Boolean })
  noHeader: boolean = false;

  @property({ attribute: false })
  headerActions?: HTMLElement;

  @property({ attribute: false })
  content?: UModalContent;
  
  render() {
    return html`
      <sl-dialog 
        label=${ifDefined(this.label)}
        .noHeader=${this.noHeader}
        ?open=${this.open}
      >
        ${this.renderContent()}  
      </sl-dialog>
    `;
  }

  private renderContent() {
    return html`
      ${this.headerActions ? html`<div slot="header-actions">${this.headerActions}</div>` : ''}
      ${this.content ?? html`<slot></slot>`}
    `;
  }
  
  public async showAsync(content?: UModalContent) : Promise<UModalResult> {
    this.content = content ?? this.content;
    await this.updateComplete;
    this.dialog.show();

    return new Promise<UModalResult>((resolve) => {
      if (this.content instanceof UModalContent) {
        this.content.addEventListener('confirm', (e: any) => {
          resolve({ success: true, value: e.detail });
          this.dialog.hide();
        });
        this.content.addEventListener('cancel', (e: any) => {
          resolve({ success: false, value: e.detail });
          this.dialog.hide();
        });
      } else {
        resolve({ success: true, value: undefined });
      }
    });
  }

  public async hideAsync() : Promise<void> {
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
import { css, html, LitElement } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';
import { DirectiveResult } from 'lit/async-directive.js';

import SlDialog from '@shoelace-style/shoelace/dist/components/dialog/dialog.component.js';
SlDialog.define('sl-dialog');

import { UDialogModel } from './UDialog.model';
import { UModalContent } from './UModalContent';
import type { UModalResult } from './UModalContent.model';

@customElement('u-dialog')
export class UDialog extends LitElement implements UDialogModel {
  
  @query("sl-dialog") dialog!: SlDialog;

  @state() content?: UModalContent;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) noHeader: boolean = false;
  @property({ type: String }) label?: string | DirectiveResult;
  
  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('content') && this.content) {
      if (!(this.content instanceof UModalContent)) return;
      this.content.addEventListener('label', (e: any) => {
        this.label = e.detail;
      });
    }
  }
    
  render() {
    return html`
      <sl-dialog 
        ?open=${this.open}
        ?noHeader=${this.noHeader}
        label=${ifDefined(this.label)}
      >
        <slot name="action" slot="header-actions"></slot>
        ${this.content ?? html`<slot></slot>`}
      </sl-dialog>
    `;
  }
  
  public async showAsync<T>(content?: UModalContent) : Promise<UModalResult<T>> {
    this.content = content ?? this.content;
    await this.updateComplete;
    await this.dialog.show();

    return new Promise<UModalResult<T>>((resolve) => {
      if (this.content instanceof UModalContent) {
        this.content.addEventListener('confirm', (e: any) => {
          resolve({ success: true, value: e.detail as T });
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
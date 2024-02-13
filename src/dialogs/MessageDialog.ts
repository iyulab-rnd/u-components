import { css, html, LitElement } from 'lit'
import { customElement, query, property } from 'lit/decorators.js'
import { createComponent } from '@lit/react';
import React from 'react';

export interface IMessageDialogProps {
  title: string;
  message: string;
  positiveText?: string;
  negativeText?: string;
  useNegative?: boolean;
}

@customElement('message-dialog')
export class MessageDialog extends LitElement implements IMessageDialogProps {

  positiveText = "Ok";
  negativeText = "Cancel";
  useNegative = false;
  boundCancel = () => {};

  @query("#dialog") dialog?: Dialog;

  @property() title: string = "";
  @property() message: string = "";
  
  resolve?: (value: boolean | PromiseLike<boolean>) => void;
  reject?: (reason?: any) => void;
  
  constructor() {
    super();
    this.boundCancel = this.cancel.bind(this);
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.hidden = true;
    this.dialog?.addEventListener("cancel", this.boundCancel);
  }

  disconnectedCallback() {
    this.dialog?.removeEventListener("cancel", this.boundCancel);
    super.disconnectedCallback();
  }

  static styles = [
    css`
      :host {
        z-index: 999; 
        position: absolute;
      }
          
      fast-dialog {
        --dialog-height: auto;
        --dialog-width: 640px;
      }

      .row {
        display: flex;
        justify-content: space-between;
        justify-content: end;
      }
      
      fast-button {
        min-width: 80px;
        margin: 0px 4px;
      }

      #title {
        font-weight: initial;
        opacity: 0.6;
        font-size: large;
      }

      p {
        opacity: 0.8;
        font-size: smaller;
      }
    `
  ];

  render() {
    return html`
      <fast-dialog id="dialog" modal="true" hidden>
        <div style="padding: 10px; color: var(--neutral-foreground-rest);">
          <label id="title">${this.title}</label>
          <p>${this.message}</p>
          <div class="row">
            <fast-button @click=${() => this.ok()}>${this.positiveText}</fast-button>
            ${this.useNegative ? html`<fast-button @click=${() => this.cancel()}>${this.negativeText}</fast-button>` : null}
          </div>
        </div>
      </fast-dialog>
    `;
  }
  
  initOk() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = false;
  }

  initOkCancel() {
    this.positiveText = "Ok";
    this.negativeText = "Cancel";
    this.useNegative = true;
  }

  initYesNo() {
    this.positiveText = "Yes";
    this.negativeText = "No";
    this.useNegative = true;
  }

  initCustom(positiveText: string, negativeText: string, useNegative?: boolean) {
    this.positiveText = positiveText;
    this.negativeText = negativeText;
    this.useNegative = useNegative ?? true;
  }
  
  ok() {
    this.close();

    if (this.resolve) {
      this.resolve(true);
    }
  }

  cancel() {
    this.close();

    if (this.reject) {
      this.reject('cancel');
    }
  }

  showAsync(title: string, message: string) : Promise<boolean> {
  
    this.title = title;
    this.message = message;
    
    this.visible();
    
    return new Promise<boolean>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }).catch(() => {
      return false;
    });
  }

  visible() {
    if (this.dialog) {
      this.dialog.show();
    }

    this.hidden = false;
  }

  close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    
    this.hidden = true;
  }
}

export const MessageDialogComponent = createComponent({
  tagName: 'message-dialog',
  elementClass: MessageDialog,
  react: React
});
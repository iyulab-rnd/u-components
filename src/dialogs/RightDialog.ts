import { css, html, LitElement, unsafeCSS } from 'lit'
import { customElement, property ,query } from 'lit/decorators.js'

// import baseStyle from '../../../styles/tailwind.css?inline';

import { IResultValue } from '../data/IResultValue';
import type { IDialogContent } from './IDialogContent';

@customElement('right-dialog')
export class RightDialog extends LitElement {
  
  static styles = [
    // unsafeCSS(baseStyle),
    css`
    :host {
      z-index: 999;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  
    fast-dialog {
      --dialog-height: 100%;
      --dialog-width: 320px;
      
      position: fixed;
      right: 0;
    }
    
    fast-dialog::part(control) {
      margin: auto;
      position: fixed;
      right: 0;
      top: 0;
      height: 100%;
    }
  
    #close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      background: transparent;
      border: none;
      color: var(--fill-color);
      font-size: 1.5rem;
      padding: 0px 8px;
      cursor: pointer;
    }

    #title {
      font-size: 1.2rem;
      font-weight: 600;
      padding: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: calc(100% - 30px);
    }    
    
    #content {
      overflow-y: auto;
      max-height: calc(100% - 60px);
      padding: 12px;

      height: 100%;
      overflow: auto;
    }
    `
  ];

  @query("#dialog") dialog?: Dialog;

  @property() title: string = '';
  @property() content?: IDialogContent;
  
  resolve?: (value: IResultValue | PromiseLike<IResultValue>) => void;
  reject?: (reason?: any) => void;
  
  render() {
    return html`
      <fast-dialog id="dialog" modal="true" hidden>
        <div id="title">
          ${this.title}
        </div>
        <div id="content">
          ${this.content}
        </div>
        <button id="close-button" @click=${this.cancel} tabindex="-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24px" height="24px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>
        </button>
      </fast-dialog>
    `;
  }

  ok(result?: IResultValue) {
    this.close();

    if (this.resolve) {
      result ??= {
        success: true,
        value: this.content
      };
      this.resolve(result);
    }
  }

  cancel(result?: IResultValue) {
    this.close();

    if (this.reject) {
      this.reject(result);
    }
  }
  
  async showAsync() : Promise<IResultValue> {
    await this.updateComplete;
    
    this.visible();
    
    return new Promise<IResultValue>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
      if (this.content) {
        if (this.content.dialogTask) {
          this.content.dialogTask(resolve, reject);
        }
        
        if (this.content.title) {
          this.title = this.content.title;
        }

        // content 의 close event 를 받아서 처리합니다.
        this.content.addEventListener('close', (e: Event) => {
          const customEvent = e as CustomEvent;
          const result: IResultValue = customEvent.detail;
          if (result.success) {
            this.ok(result);
          } else {
            this.cancel(result);
          }
        });
      }
    }).catch((_error) => {
      return { success: false, value: _error };
    });
  }

  private visible() {
    if (this.dialog) {
      this.dialog.show();
    }

    this.hidden = false;
  }

  private close() {
    if (this.dialog) {
      this.dialog.hide();
    }
    
    this.hidden = true;
  }
  
}
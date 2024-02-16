import { LitElement } from "lit";
import { property } from "lit/decorators.js";

/**
 * u-dialog 및 u-drawer 컴포넌트의 컨텐츠를 정의하는 추상 클래스입니다.
 * requestConfirm, requestCancle 메서드를 사용하여 컨텐츠에서 다이얼로그나 드로어에 value를 전달하고, 닫을 수 있습니다.
 * @example
 * import { UModalContent } from '@iyulab/u-components';
 * 
 * .@customElement('u-modal-content-element')
 * export class UModalContentElement extends UModalContent {
 *  render() {
 *     return html`
 *       <button .@click=${this.confirm}>Confirm</button>
 *       <button .@click=${this.cancel}>Cancel</button>
 *     `;
 *   }
 * 
 *   confirm() {
 *     this.requestConfirm('contents confirm!');
 *   }
 * 
 *   cancel() {
 *     this.requestCancle('contents cancel!');
 *   }
 * }
 */
export class UModalContent extends LitElement {
  
  @property({ attribute: false })
  confirmValue?: any;

  @property({ attribute: false })
  cancelValue?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    
    if (changedProperties.has('confirmValue') && this.confirmValue) {
      this.dispatchEvent(new CustomEvent('confirm', {
        detail: this.confirmValue
      }));
    }
    if (changedProperties.has('cancelValue') && this.cancelValue) {
      this.dispatchEvent(new CustomEvent('cancel', {
        detail: this.cancelValue
      }));
    }
  }

  protected requestConfirm(value: any) {
    this.confirmValue = value;
  }

  protected requestCancle(value: any) {
    this.cancelValue = value;
  }

}
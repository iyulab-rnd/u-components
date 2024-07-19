import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";

import { UModalContentModel } from "./UModalContent.model";

/**
 * u-dialog 및 u-drawer 컴포넌트의 컨텐츠를 정의하는 클래스입니다.
 * requestConfirm, requestCancel 메서드를 사용하여 컨텐츠에서 다이얼로그나 드로어에 value를 전달하고, 닫을 수 있습니다.
 * @example
 * import { UModalContent } from '@iyulab/u-components';
 *
 
 * \@customElement("xxxxx")
 * export class UModalContentElement extends UModalContent {
 *   render() {
 *     return html`
 *      <u-button @click=${this.cancel}>Cancel</u-button>
 *      <u-button @click=${this.confirm} theme="primary">Confirm</u-button>
 *       `;
 *   }
 * 
 *   confirm() {
 *     this.requestConfirm("contents confirm!");
 *   }
 * 
 *   cancel() {
 *     this.requestCancel("contents cancel!");
 *   }
 */
export class UModalContent extends LitElement implements UModalContentModel {
  @property({ type: String }) label?: string;

  public requestConfirm(value?: any) {
    this.dispatchEvent(
      new CustomEvent("confirm", {
        detail: value,
      })
    );
  }

  public requestCancel(value?: any) {
    this.dispatchEvent(
      new CustomEvent("cancel", {
        detail: value,
      })
    );
  }

  render() {
    return html` <slot></slot> `;
  }
}

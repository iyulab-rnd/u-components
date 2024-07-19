import { LitElement } from "lit";
/**
 * u-dialog 및 u-drawer 컴포넌트의 컨텐츠를 정의하는 추상 클래스입니다.
 * requestConfirm, requestCancel 메서드를 사용하여 컨텐츠에서 다이얼로그나 드로어에 value를 전달하고, 닫을 수 있습니다.
 * @example
 * import { UModalContent } from '@iyulab/u-components';
 *
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
 *     this.requestCancel('contents cancel!');
 *   }
 * }
 */
export declare class UModalContent extends LitElement {
    confirmValue?: any;
    cancelValue?: any;
    protected updated(changedProperties: any): Promise<void>;
    protected requestConfirm(value: any): void;
    protected requestCancel(value: any): void;
}

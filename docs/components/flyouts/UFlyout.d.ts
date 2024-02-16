import { LitElement } from "lit";
/**
 * 위치하고 싶은 기준
 * 공간이 충분하지 않을 경우 자동 위치 조정
 */
export type UFlyoutPosition = ("TopLeft" | "TopCenter" | "TopRight" | "BottomLeft" | "BottomCenter" | "BottomRight" | "LeftTop" | "LeftCenter" | "LeftBottom" | "RightTop" | "RightCenter" | "RightBottom" | "Auto");
/**
 * UFlyout 클래스는 플라이아웃(flyout) 컴포넌트의 추상 클래스입니다.
 * @example
 * export class UTooltip extends UFlyout {
 *  keepHover = true;
 *  position = "TopCenter";
 *
 *  render() {
 *    return html`
 *      <!-- HTML -->
 *    `;
 *  }
 * }
 */
export declare abstract class UFlyout extends LitElement {
    private open;
    private target?;
    /**
     * 현재 컨텐츠가 보여지고 있는지 여부
     */
    get isOpen(): boolean;
    /**
     * 현재 컨텐츠에 연결되어 있는 타겟 엘리먼트
    */
    get targetElement(): HTMLElement | undefined;
    /**
     * 호버링 방식의 이벤트에서 툴팁에 진입할 경우 호버링을 유지할지 여부
     */
    abstract keepHover: boolean;
    /**
     * 컨텐츠를 보여줄 기준이 되는 위치
     */
    abstract position: UFlyoutPosition;
    connectedCallback(): void;
    /**
     * 토글 방식의 이벤트를 사용할 경우 사용합니다(with onClick event)
    */
    toggleAsync(event: Event): Promise<void>;
    /**
     * 클릭 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onClick event)
     */
    showClickAsync(event: Event): Promise<void>;
    /**
     * 클릭 이벤트를 사용할때 컨텐츠를 감춥니다. (with onClick event)
    */
    hideClickAsync(): Promise<void>;
    /**
     * 호버링 방식의 이벤트를 사용할 경우 사용합니다(with onMouseEnter event)
     */
    hoverAsync(event: Event): Promise<void>;
    /**
     * 호버링 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onMouseEnter event)
     */
    showHoverAsync(event: Event): Promise<void>;
    /**
     * 호버링 이벤트를 사용할때 컨텐츠를 감춥니다. (with onMouseLeave event)
    */
    hideHoverAsync(): Promise<void>;
    private showAsync;
    private handleOutsideClickBind;
    private handleEscapeKeyBind;
    private handleHoverTargetBind;
    private handleHoverThisBind;
    private adjustPositionBind;
    private handleOutsideClick;
    private handleEscapeKey;
    private handleHoverTarget;
    private handleHoverThis;
    private adjustPosition;
}

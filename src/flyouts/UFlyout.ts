import { LitElement } from "lit";

// 위치하고 싶은 기준
// 공간이 충분하지 않을 경우 자동 위치 조정
export type UFlyoutPosition = (
  "TopLeft" | 
  "TopCenter" |
  "TopRight" |
  "BottomLeft" |
  "BottomCenter" |
  "BottomRight" |
  "LeftTop" |
  "LeftCenter" |
  "LeftBottom" |
  "RightTop" |
  "RightCenter" |
  "RightBottom" |
  "Auto"
)

export abstract class UFlyout extends LitElement {
  private open:boolean = false;
  private target?: HTMLElement;
  
  /**
   * 현재 컨텐츠가 보여지고 있는지 여부
   */
  get isOpen() {
    return this.open;
  }

  /**
   * 현재 컨텐츠에 연결되어 있는 타겟 엘리먼트 
  */
  get targetElement() {
    return this.target;
  }

  /**
   * 호버링 방식의 이벤트에서 툴팁에 진입할 경우 호버링을 유지할지 여부
   */
  abstract keepHover:boolean;

  /**
   * 컨텐츠를 보여줄 기준이 되는 위치
   */
  abstract position: UFlyoutPosition;

  connectedCallback() {
    super.connectedCallback();
    this.style.position = "absolute";
    this.style.zIndex = "5";
    this.hidden = true;
  }

  /** 
   * 토글 방식의 이벤트를 사용할 경우 사용합니다(with onClick event)
  */
  public async toggleAsync(event: Event) {
    const target = event.currentTarget as HTMLElement;
    if(!target) throw new Error("event target is null");

    if(event.currentTarget === this.target && this.open) {
      await this.hideClickAsync();
    } else {
      await this.showClickAsync(event);
    }
  }

  /**
   * 클릭 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onClick event)
   */
  public async showClickAsync(event: Event) {
    await this.showAsync(event);

    document.removeEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.removeEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.removeEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.removeEventListener("resize", this.adjustPositionBind);
    
    document.addEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.addEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.addEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.addEventListener("resize", this.adjustPositionBind);

    this.target?.classList.add("active");
    // 동시성 문제로 인해 setTimeout을 사용합니다.(hideClickAsync 동시 실행, 보통 hide 먼저 실행)
    setTimeout(() => {
      this.open = true;
    }, 100);
  }

  /** 
   * 클릭 이벤트를 사용할때 컨텐츠를 감춥니다. (with onClick event)
  */
  public async hideClickAsync() {
    this.hidden = true;
    
    document.removeEventListener("click", this.handleOutsideClickBind, { capture: true });
    document.removeEventListener("keydown", this.handleEscapeKeyBind, { capture: true });
    document.removeEventListener("scroll", this.adjustPositionBind, { capture: true });
    window.removeEventListener("resize", this.adjustPositionBind);
    
    this.target?.classList.remove("active");
    // 동시성 문제로 인해 setTimeout을 사용합니다.(showClickAsync 동시 실행, 보통 hide 먼저 실행)
    setTimeout(() => {
      this.open = false;
    }, 100);
  }

  /**
   * 호버링 방식의 이벤트를 사용할 경우 사용합니다(with onMouseEnter event)
   */
  public async hoverAsync(event: Event) {
    await this.showHoverAsync(event);
  }

  /**
   * 호버링 이벤트를 사용할때 컨텐츠를 보여줍니다. (with onMouseEnter event)
   */
  public async showHoverAsync(event: Event) {
    await this.showAsync(event);
    
    if(this.target) this.target.removeEventListener("mouseleave", this.handleHoverTargetBind);
    this.removeEventListener("mouseleave", this.handleHoverThisBind);
    
    if(this.target) this.target.addEventListener("mouseleave", this.handleHoverTargetBind);
    this.addEventListener("mouseleave", this.handleHoverThisBind);
    
    this.open = true;
  }

  /** 
   * 호버링 이벤트를 사용할때 컨텐츠를 감춥니다. (with onMouseLeave event)
  */
  public async hideHoverAsync() {
    this.hidden = true;
    
    if(this.target) this.target.removeEventListener("mouseleave", this.handleHoverTargetBind);
    this.removeEventListener("mouseleave", this.handleHoverThisBind);
    
    this.open = false;
  }

  // 컨텐츠를 보여줍니다.
  private async showAsync(event: Event) {
    const target = event.currentTarget as HTMLElement;
    if(!target) throw new Error("event target is null");
    this.target = target;

    // 컨텐츠를 넣어 한번 렌더링을 시킵니다.(컨텐츠의 크기를 구하기 위함)
    this.style.opacity = "0";
    this.hidden = false;
    await this.updateComplete;

    // 컨텐츠의 위치를 조정하고 보여줍니다.
    await this.adjustPosition();
    this.style.opacity = "1";
  }

  // event bind Start
  private handleOutsideClickBind = this.handleOutsideClick.bind(this);
  private handleEscapeKeyBind = this.handleEscapeKey.bind(this);
  private handleHoverTargetBind = this.handleHoverTarget.bind(this);
  private handleHoverThisBind = this.handleHoverThis.bind(this);
  private adjustPositionBind = this.adjustPosition.bind(this);
  // event bind End

  // event methods Start
  private async handleOutsideClick(event: Event) {
    const target = event.target as Element;
    const isInside = this.contains(target);
    const isTarget = this.target?.contains(target);

    // 현재 엘리먼트 및 클릭한 대상을 제외한 다른 곳을 클릭했을 경우 감춥니다.
    if(!isInside && !isTarget) {
      this.hideClickAsync();
    }
  }

  private async handleEscapeKey(event: KeyboardEvent) {
    if(event.key === "Escape") {
      this.hideClickAsync();
    }
  }

  private async handleHoverTarget(event: MouseEvent) {
    // 타겟 엘리먼트를 벗어났을 경우 벗어난 대상이 현재 엘리먼트가 아닐 경우 감춥니다.
    if(event.relatedTarget === this && this.keepHover) return;
    this.hideHoverAsync();
  }

  private async handleHoverThis() {
    this.hideHoverAsync();
  }
  // event methods End

  // 컨텐츠의 위치를 조정합니다.
  private async adjustPosition() {

    // 1. 현재 브라우저의 크기를 구한다.
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 2. 현재 타겟을 기준으로 남은 공간을 구한다.
    if(!this.target) return;
    const targetRect = this.target.getBoundingClientRect();
    const spaceTop = targetRect.top;
    const spaceBottom = windowHeight - targetRect.bottom;
    const spaceLeft = targetRect.left;
    const spaceRight = windowWidth - targetRect.right;

    // 3. 남은 공간이 위/아래, 좌/우 중 어느쪽이 더 큰지 구한다.
    const isTopLarger= spaceTop > spaceBottom;
    const isLeftLarger = spaceLeft > spaceRight;

    // 4. 현재 컨텐츠의 크기를 구한다.
    // Problem: await this.updateComplete 시에도 크기가 제대로 안나오는 경우가 있음
    const contentRect = this.getBoundingClientRect();
    const { width, height } = contentRect;

    // 5. 위/아래, 좌/우 컨텐츠가 들어갈 공간이 충분한지 확인한다.
    const isTopEnough = spaceTop > height;
    const isBottomEnough = spaceBottom > height;
    const isLeftEnough = spaceLeft > width;
    const isRightEnough = spaceRight > width;

    // 6. 위의 정보들과 현재 포지션을 기준으로 컨텐츠의 위치를 구한다.
    let top, left, right, bottom;

    switch (this.position) {
      case "TopLeft": {
        if(isTopEnough || isTopLarger) {
          bottom = spaceBottom + targetRect.height;
        } else {
          top = spaceTop + targetRect.height;
        }

        if(((spaceLeft + targetRect.width) > width)) {
          if(width > targetRect.width) right = spaceRight;
          else left = spaceLeft;
        } else {
          left = 1;
        }
        break;
      } case "TopCenter": {
        if(isTopEnough || isTopLarger) {
          bottom = spaceBottom + targetRect.height;
        } else {
          top = spaceTop + targetRect.height;
        }

        const spaceNeed = (width - targetRect.width) / 2;
        const leftNotEnough = spaceLeft < spaceNeed;
        const rightNotEnough = spaceRight < spaceNeed;
        if(leftNotEnough) left = 1;
        else if (rightNotEnough) right = 1;
        else left = spaceLeft - spaceNeed;
        break;
      } case "TopRight": {
        if(isTopEnough || isTopLarger) {
          bottom = spaceBottom + targetRect.height;
        } else {
          top = spaceTop + targetRect.height;
        }
        
        if(((spaceRight + targetRect.width) > width)) {
          if(width > targetRect.width) left = spaceLeft;
          else right = spaceRight;
        } else {
          right = 1;
        }
        break;
      } case "BottomLeft": {
        if(isBottomEnough || !isTopLarger) {
          top = spaceTop + targetRect.height;
        } else {
          bottom = spaceBottom + targetRect.height;
        }

        if(((spaceLeft + targetRect.width) > width)) {
          right = spaceRight;
        } else {
          left = 1;
        }
        break;
      } case "BottomCenter": {
        if(isBottomEnough || !isTopLarger) {
          top = spaceTop + targetRect.height;
        } else {
          bottom = spaceBottom + targetRect.height;
        }

        const spaceNeed = (width - targetRect.width) / 2;
        const leftNotEnough = spaceLeft < spaceNeed;
        const rightNotEnough = spaceRight < spaceNeed;
        if(leftNotEnough) left = 1;
        else if (rightNotEnough) right = 1;
        else left = spaceLeft - spaceNeed;
        break;
      } case "BottomRight": {
        if(isBottomEnough || !isTopLarger) {
          top = spaceTop + targetRect.height;
        } else {
          bottom = spaceBottom + targetRect.height;
        }

        if(((spaceRight + targetRect.width) > width)) {
          left = spaceLeft;
        } else {
          right = 1;
        }
        break;
      } case "LeftTop": {
        if(isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right = spaceRight - width;
        }

        if(spaceTop > (height - targetRect.height)) {
          if(height > targetRect.height) bottom = spaceBottom;
          else top = spaceTop;
        } else {
          top = 1;
        }
        break;
      } case "LeftCenter": {
        if(isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right = spaceRight - width;
        }

        const spaceNeed = (height - targetRect.height) / 2;
        const topNotEnough = spaceTop < spaceNeed;
        const bottomNotEnough = spaceBottom < spaceNeed;
        if(topNotEnough) top = 1;
        else if (bottomNotEnough) bottom = 1;
        else top = spaceTop - spaceNeed;
        break;
      } case "LeftBottom": {
        if(isLeftEnough || isLeftLarger) {
          left = spaceLeft - width;
        } else {
          right = spaceRight - width;
        }

        if(spaceBottom > (height - targetRect.height)) {
          if(height > targetRect.height) top = spaceTop;
          else bottom = spaceBottom;
        } else {
          bottom = 1;
        }
        break;
      } case "RightTop": {
        if(isRightEnough || !isLeftLarger) {
          right = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }

        if(spaceTop > (height - targetRect.height)) {
          if(height > targetRect.height) bottom = spaceBottom;
          else top = spaceTop;
        } else {
          top = 1;
        }
        break;
      } case "RightCenter": {
        if(isRightEnough || !isLeftLarger) {
          right = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }

        const spaceNeed = (height - targetRect.height) / 2;
        const topNotEnough = spaceTop < spaceNeed;
        const bottomNotEnough = spaceBottom < spaceNeed;
        if(topNotEnough) top = 1;
        else if (bottomNotEnough) bottom = 1;
        else top = spaceTop - spaceNeed;
        break;
      } case "RightBottom": {
        if(isRightEnough || !isLeftLarger) {
          right = spaceRight - width;
        } else {
          left = spaceLeft - width;
        }

        if(spaceBottom > (height - targetRect.height)) {
          if(height > targetRect.height) top = spaceTop;
          else bottom = spaceBottom;
        } else {
          bottom = 1;
        }
        break;
      } case "Auto":
        if(isTopLarger) {
          top = spaceTop - height;
        } else {
          bottom = spaceBottom - height;
        }

        if(isLeftLarger) {
          right = spaceRight;
        } else {
          left = spaceLeft;
        }
        break;
    }

    // 7. 컨텐츠를 적절한 위치에 배치합니다.
    this.style.top = top ? `${top}px` : "unset";
    this.style.bottom = bottom ? `${bottom}px` : "unset";
    this.style.left = left ? `${left}px` : "unset";
    this.style.right = right ? `${right}px` : "unset";
  }

}
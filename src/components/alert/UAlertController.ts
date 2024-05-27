import type { ToastOption, ToastPosition } from "./UAlert.model";
import { UAlertElement } from "./UAlert";

export class UAlertController {
  private static readonly container: Map<ToastPosition, HTMLDivElement> = new Map();
  private static readonly alerts: Set<UAlertElement> = new Set();

  public static async toastAsync(option: ToastOption): Promise<void> {
    const duration = (option.duration && option.duration > 0) ? option.duration : 3000;

    // 토스트 알림을 생성합니다.
    const alert = new UAlertElement();
    alert.label = option.label;
    alert.type = option.type;
    alert.content = option.content;
    this.alerts.add(alert);
    
    // 토스트 알림을 컨테이너에 추가합니다.
    const position = option.position || 'top-right';
    const container = this.getContainer(position);
    container.appendChild(alert);
    await alert.updateComplete;
    alert.showAsync();

    setTimeout(async () => {
      // duration 시간이 지나면 알림을 닫습니다.
      await alert.hideAsync();
      alert.remove();
      this.alerts.delete(alert);

      // 컨테이너에 자식이 없으면 컨테이너를 제거합니다.
      if (!container.hasChildNodes()) {
        container.remove();
        this.container.delete(position);
      }
    }, duration);
  }

  private static getContainer(position: ToastPosition) {
    return this.container.get(position) || this.createContainer(position);
  }

  private static createContainer(position: ToastPosition) {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.zIndex = '1000';
    container.style.display = 'flex';
    container.style.gap = '10px';

    // 세로 정렬
    if (position.includes('top')) {
      container.style.top = '20px';
      container.style.flexDirection = 'column'; // 세로 정렬
    } else if (position.includes('bottom')) {
      container.style.bottom = '20px';
      container.style.flexDirection = 'column-reverse'; // 세로 reverse 정렬
    }
    
    // 가로 정렬
    if (position.includes('center')) {
      container.style.left = '50%';
      container.style.transform = 'translateX(-50%)';
      container.style.alignItems = 'center'; // 가로 중앙 정렬을 위해 추가
    } else if (position.includes('left')) {
      container.style.left = '20px';
      container.style.alignItems = 'flex-start'; // 왼쪽 정렬
    } else if (position.includes('right')) {
      container.style.right = '20px';
      container.style.alignItems = 'flex-end'; // 오른쪽 정렬
    }

    document.body.appendChild(container);
    this.container.set(position, container);
    return container;
  }
}
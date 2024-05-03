import type { UModalContent } from "./UModalContent";
import type { DrawerPosition } from "./UDrawer.model";
import type { UMessageDialogModel } from "./UMessageDialog.model";
import type { UInputDialogConfig } from "./UInputDialog.model";
import { UDrawer } from "./UDrawer";
import { UDialog } from "./UDialog";
import { UMessageDialog } from "./UMessageDialog";
import { UInputDialog } from "./UInputDialog";

export class UModalController {
  
  /**
   * 메시지 다이얼로그를 표시합니다.
   * @param message 메시지
   * @param option 다이얼로그 옵션
   */
  public static async showMessageDialogAsync(message: string, option?: UMessageDialogModel) {
    const dialog = new UMessageDialog();
    dialog.message = message;    
    Object.assign(dialog, option);
    document.body.appendChild(dialog);
    dialog.addEventListener('sl-hide', () => {
      dialog.handleCancel();
    });
    const result = await dialog.showAsync();
    dialog.remove();
    return result;
  }

  /**
   * 입력 다이얼로그를 표시합니다.
   * @param option 다이얼로그 옵션
   */
  public static async showInputDialogAsync(option?: UInputDialogConfig) {
    const dialog = new UInputDialog();
    dialog.config = option || { type: 'text' };
    Object.assign(dialog, option);
    document.body.appendChild(dialog);
    dialog.addEventListener('sl-hide', () => {
      dialog.handleCancel();
    });
    const result = await dialog.showAsync();
    dialog.remove();
    return result;
  }

  /**
   * 다이얼로그를 표시합니다.
   * @param content {@link UModalContent} 상속 다이얼로그 컨텐츠
   */
  public static async showDialogAsync<T>(content: UModalContent) {
    const dialog = new UDialog();
    document.body.appendChild(dialog);
    dialog.addEventListener('sl-hide', () => {
      dialog.handleCancel();
    });
    const result = await dialog.showAsync<T>(content);
    dialog.remove();
    return result;
  }

  /**
   * 드로어를 표시합니다.
   * @param content {@link UModalContent} 상속 다이얼로그 컨텐츠
   * @param position 드로어 위치, 기본값은 "end"
   */
  public static async showDrawerAsync<T>(content: UModalContent, position?: DrawerPosition) {
    const drawer = new UDrawer();
    drawer.position = position || "end";
    document.body.appendChild(drawer);
    drawer.addEventListener('sl-hide', () => {
      drawer.handleCancel();
    });
    const result = await drawer.showAsync<T>(content);
    drawer.remove();
    return result;
  }

}
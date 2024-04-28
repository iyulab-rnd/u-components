import type { UModalContent } from "./UModalContent";
import type { DrawerPosition } from "./UDrawer.model";
import type { UMessageDialogModel } from "./UMessageDialog.model";
import type { UInputDialogModel } from "./UInputDialog.model";
import type { PropertyMetaType } from "../../decorators/PropertyMeta.model";
import { UDrawer } from "./UDrawer";
import { UDialog } from "./UDialog";
import { UMessageDialog } from "./UMessageDialog";
import { UInputDialog } from "./UInputDialog";

export class UModalController {
  
  public static async showMessageDialogAsync(message: string, option?: UMessageDialogModel) {
    const dialog = new UMessageDialog();
    dialog.message = message;    
    dialog.label = option?.label;
    dialog.color = option?.color;
    dialog.size = option?.size;
    dialog.weight = option?.weight;
    document.body.appendChild(dialog);
    const result = await dialog.showAsync();
    dialog.remove();
    return result;
  }

  public static async showInputDialogAsync(type?: PropertyMetaType, option?: UInputDialogModel) {
    const dialog = new UInputDialog();
    dialog.type = type;
    dialog.label = option?.label;
    dialog.meta = option?.meta;
    dialog.value = option?.value;
    document.body.appendChild(dialog);
    const result = await dialog.showAsync();
    dialog.remove();
    return result;
  }

  public static async showDialogAsync<T>(content: UModalContent) {
    const dialog = new UDialog();
    document.body.appendChild(dialog);
    const result = await dialog.showAsync<T>(content);
    dialog.remove();
    return result;
  }

  public static async showDrawerAsync<T>(content: UModalContent, position?: DrawerPosition) {
    const drawer = new UDrawer();
    drawer.position = position || "end";
    document.body.appendChild(drawer);
    const result = await drawer.showAsync<T>(content);
    drawer.remove();
    return result;
  }

}
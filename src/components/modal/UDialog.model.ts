/**
 * Represents the model for the UDialog component.
 */
export interface UDialogModel {
  /**
   * Specifies whether the dialog is open or not.
   * @default false
   */
  open: boolean;

  /**
   * Specifies whether the dialog has a header or not.
   * @default false
   */
  noHeader: boolean;

  /**
   * The label for the dialog.
   */
  label?: string;
}
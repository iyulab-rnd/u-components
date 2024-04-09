/**
 * Represents the result of a modal operation.
 */
export interface UModalResult {
  /**
   * Indicates whether the modal operation was successful.
   */
  success: boolean;

  /**
   * The value returned by the modal operation.
   */
  value?: any;

  /**
   * The error that occurred during the modal operation.
   */
  error?: any;
}

/**
 * Represents the model for the content of a UModal component.
 */
export interface UModalContentModel {
  /**
   * The label for the modal content.
   */
  label?: string;
  
  /**
   * The value to be passed when the confirm button is clicked.
   */
  confirmValue?: any;
  
  /**
   * The value to be passed when the cancel button is clicked.
   */
  cancelValue?: any;
  
  /**
   * Callback function to be called when the confirm button is clicked.
   * @param value The value passed when the confirm button is clicked.
   */
  requestConfirm(value?: any): void;
  
  /**
   * Callback function to be called when the cancel button is clicked.
   * @param value The value passed when the cancel button is clicked.
   */
  requestCancel(value?: any): void;
}
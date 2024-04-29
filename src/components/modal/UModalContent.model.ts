/**
 * Represents the result of a modal operation.
 */
export interface UModalResult<T> {
  /**
   * Indicates whether the modal operation was confirmed.
   */
  confirmed: boolean;

  /**
   * The value returned by the modal operation.
   */
  value?: T;
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
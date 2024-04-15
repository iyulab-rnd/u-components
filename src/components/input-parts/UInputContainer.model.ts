import { UInputLabelModel } from './UInputLabel.model';
import { UInputErrorModel } from './UInputError.model';

export type LabelPosition = 'top' | 'left';

/**
 * Represents the model for the UInputContainer component.
 */
export interface UInputContainerModel extends UInputLabelModel, UInputErrorModel {
  /**
   * The position of the label relative to the input field.
   * @default 'top'
   */
  labelPosition?: LabelPosition;
  
  /**
   * Specifies whether the input field is disabled.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Specifies whether the input field is read-only.
   * @default false
   */
  readonly?: boolean;
}
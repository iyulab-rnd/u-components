export type DropdownPlacement = (
  'top' | 'top-start' | 'top-end' | 
  'bottom' | 'bottom-start' | 'bottom-end' | 
  'right' | 'right-start' | 'right-end' | 
  'left' | 'left-start' | 'left-end'
);

/**
 * Represents the model for the UDropdown component.
 */
export interface UDropdownModel {
  /**
   * Specifies whether the dropdown is open or closed.
   * @default false
   */
  open?: boolean;

  /**
   * Specifies the placement of the dropdown.
   * @default 'bottom-start'
   */
  placement?: DropdownPlacement;

  /**
   * Specifies whether the dropdown is disabled or not.
   * @default false
   */
  disabled?: boolean;

  /**
   * Specifies the distance of the dropdown from its target element.
   * @default 5
   */
  distance?: number;

  /**
   * Specifies the skidding of the dropdown.
   * @default 0
   */
  skidding?: number;

  /**
   * Specifies whether the dropdown should be hoisted to the body element.
   * @default false
   */
  hoist?: boolean;
}
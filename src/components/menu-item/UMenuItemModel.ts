/**
 * Represents a menu item model.
 */
export interface UMenuItemModel {
  /**
   * The type of the menu item.
   * - 'normal': A normal menu item.
   * - 'checkbox': A checkbox menu item.
   */
  type: 'normal' | 'checkbox';

  /**
   * The value of the menu item.
   */
  value?: string;

  /**
   * Indicates whether the checkbox is checked.
   */
  checked: boolean;

  /**
   * Indicates whether the menu item is in a loading state.
   */
  loading: boolean;

  /**
   * Indicates whether the menu item is disabled.
   */
  disabled: boolean;
}
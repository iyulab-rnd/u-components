/**
 * Represents a menu item model.
 */
export interface UMenuItem {
  /**
   * The type of the menu item.
   * - 'normal': A normal menu item.
   * - 'checkbox': A checkbox menu item.
   */
  type?: 'normal' | 'checkbox';

  /**
   * The icon of the menu item.
   */
  icon?: string;

  /**
   * The display of the menu item.
   */
  display?: string;

  /**
   * The value of the menu item.
   */
  value?: string;

  /**
   * The sub menu items of the menu item.
   */
  subMenu?: UMenuItem[];

  /**
   * Indicates whether the checkbox is checked.
   */
  checked?: boolean;

  /**
   * Indicates whether the menu item is in a loading state.
   */
  loading?: boolean;

  /**
   * Indicates whether the menu item is disabled.
   */
  disabled?: boolean;
}
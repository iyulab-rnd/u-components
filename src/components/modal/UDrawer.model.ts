export type DrawerPosition = 'top' | 'end' | 'bottom' | 'start';

/**
 * Represents the model for a UDrawer component.
 */
export interface UDrawerModel {
  /**
   * Indicates whether the drawer is open or closed.
   * @default false
   */
  open: boolean;

  /**
   * Indicates whether the drawer has a header or not.
   * @default false
   */
  noHeader: boolean;

  /**
   * Indicates whether the content of the drawer is contained within the component or not.
   * @default false
   */
  contained: boolean;

  /**
   * Specifies the position of the drawer.
   * @default "end"
   */
  position: DrawerPosition;

  /**
   * The label for the drawer.
   */
  label?: string;
}
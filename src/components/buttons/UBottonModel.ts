export type UButtonType = 'button' | 'link' | 'dropdown';
export type UButtonTheme = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
export type UButtonSize = 'small' | 'medium' | 'large';

export interface UButtonLink {
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  download?: string;
}
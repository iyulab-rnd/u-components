export type UButtonType = 'button' | 'icon';
export type UButtonTheme = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
export type UButtonTarget = '_blank' | '_parent' | '_self' | '_top';
export type UButtonSize = 'small' | 'medium' | 'large';

export interface UButtonLink {
  href: string;
  target?: UButtonTarget;
  download?: string;
}
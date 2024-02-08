export interface CommandModel {
  execute(parameter?: any): void;
  canExecute(parameter?: any): boolean;
}

export type UButtonType = 'button' | 'link' | 'dropdown';
export type UButtonTheme = 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
export type UButtonSize = 'small' | 'medium' | 'large';

export interface UButtonLink {
  href: string;
  target?: '_blank' | '_parent' | '_self' | '_top';
  download?: string;
}

// import { observable } from "mobx";

// export class RelayCommand implements CommandModel {
  
//   @observable content: any = null;
//   execute: (parameter?: any) => void;
//   canExecute: (parameter?: any) => boolean;

//   constructor(x: {
//     content: any, 
//     execute: (parameter?: any) => void, 
//     canExecute?: (parameter?: any) => boolean
//   }) {
//     this.content = x.content;
//     this.execute = x.execute;
//     this.canExecute = x.canExecute || (() => true);
//   }

// }

export interface CommandModel {
  execute(parameter?: any): void;
  canExecute(parameter?: any): boolean;
}

export class RelayCommand implements CommandModel {
  
  content: any = null;
  execute: (parameter?: any) => void;
  canExecute: (parameter?: any) => boolean;

  constructor(x: {
    content: any, 
    execute: (parameter?: any) => void, 
    canExecute?: (parameter?: any) => boolean
  }) {
    this.content = x.content;
    this.execute = x.execute;
    this.canExecute = x.canExecute || (() => true);
  }

}
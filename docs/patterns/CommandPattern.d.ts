export interface CommandModel {
    execute(parameter?: any): void;
    canExecute(parameter?: any): boolean;
}
export declare class RelayCommand implements CommandModel {
    content: any;
    execute: (parameter?: any) => void;
    canExecute: (parameter?: any) => boolean;
    constructor(x: {
        content: any;
        execute: (parameter?: any) => void;
        canExecute?: (parameter?: any) => boolean;
    });
}

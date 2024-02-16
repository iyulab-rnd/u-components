import { LitElement } from "lit";
export interface IWizardStep {
    onLeave(direction: 'back' | 'next'): any;
    onGot(direction: 'back' | 'next', data: any): void;
    validate(): boolean;
    canBack(): boolean;
    canNext(): boolean;
}
export declare abstract class WizardStep extends LitElement implements IWizardStep {
    validate(): boolean;
    canBack(): boolean;
    canNext(): boolean;
    onLeave(direction: "back" | "next"): this;
    onGot(direction: "back" | "next", data: any): void;
}

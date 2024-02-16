import { LitElement } from "lit";
import { RelayCommand } from "../../patterns/CommandPattern";
import { IWizardStep } from "./WizardStep";
export declare abstract class WizardBase extends LitElement {
    static styles: never[];
    steps: Array<HTMLElement | IWizardStep>;
    currentStepIndex: number;
    backCommand: RelayCommand;
    nextCommand: RelayCommand;
    resolve?: (value: {
        success: boolean;
        value: any;
    } | PromiseLike<{
        success: boolean;
        value: any;
    }>) => void;
    reject?: (reason?: any) => void;
    constructor();
    abstract initSteps(): Array<HTMLElement>;
    render(): import("lit").TemplateResult<1>;
    currentStep(): IWizardStep;
    canBack(): boolean;
    canNext(): boolean;
    canFinish(): boolean;
    fisish(): void;
    returnValue(): any;
}

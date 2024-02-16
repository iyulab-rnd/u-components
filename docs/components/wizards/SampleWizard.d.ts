import { WizardBase } from "./WizardBase";
import { WizardStep } from "./WizardStep";
export declare class SampleWizard extends WizardBase {
    initSteps(): (Step1 | Step2 | Step3)[];
    returnValue(): string;
}
declare class Step1 extends WizardStep {
    render(): import("lit").TemplateResult<1>;
    validate(): boolean;
}
declare class Step2 extends WizardStep {
    render(): import("lit").TemplateResult<1>;
    count: number;
    validate(): boolean;
}
declare class Step3 extends WizardStep {
    render(): import("lit").TemplateResult<1>;
}
export {};

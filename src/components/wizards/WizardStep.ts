import { LitElement } from "lit";

export interface IWizardStep {
  onLeave(direction: 'back' | 'next'): any;
  onGot(direction: 'back' | 'next', data: any): void;
  validate(): boolean;
  canBack(): boolean;
  canNext(): boolean;
}

export abstract class WizardStep extends LitElement implements IWizardStep {

  validate() {
    return true;
  }

  canBack() {
    return this.validate();
  }

  canNext() {
    return this.validate();
  }

  onLeave(direction: "back" | "next") {
    console.log("onLeave", direction);
    return this;
  }

  onGot(direction: "back" | "next", data: any): void {
    console.log("onGot", direction, data);
    return;
  }
}

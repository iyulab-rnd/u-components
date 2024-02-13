/*
let wizard = new SampleWizard();
let r = await wizard.showAsync();
*/

import { html } from "lit";
import { customElement } from "lit/decorators.js";

import { WizardBase } from "./WizardBase";
import { WizardStep } from "./WizardStep";

@customElement("sample-wizard")
export class SampleWizard extends WizardBase {
  initSteps() {
    return [
      new Step1(),
      new Step2(),
      new Step3(),
    ];
  }

  override returnValue() {
    return "hello-world...";
  }
}

@customElement("step-1")
class Step1 extends WizardStep {
  render() {
    return html`
      <div style="width: 400px; height: 400px">This is step 1</div>
    `;
  }

  override validate() {
    console.log("validate step 1");
    return true;
  }
}

@customElement("step-2")
class Step2 extends WizardStep {
  render() {
    return html`
      <div>This is step 2</div>
    `;
  }
  
  count: number = 0;

  override validate() {
    this.count++;
    console.log("validate step 2");
    return this.count > 3;
  }
}

@customElement("step-3")
class Step3 extends WizardStep {
  render() {
    return html`
      <div>This is step 3</div>
    `;
  }
}
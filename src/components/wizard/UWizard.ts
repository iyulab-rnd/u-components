import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { t } from '../../localization/ULocalizer';
import '../button/UButton';

export type WizardState = "init" | "inProgress" | "completed";

@customElement("u-wizard")
export class UWizard extends LitElement {

  @state() stepElList?: Element[];
  @state() contentElList?: Element[];

  @state() totalSteps: number = 0;
  @state() currentStep: number = 0;

  @property({ type: String, reflect: true }) state: WizardState = "init";

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
    
    this.stepElList = this.getSteps();
    this.contentElList = this.getContents();
    console.log(this.totalSteps);
    console.log(this.stepElList);
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    console.log(this.stepElList);
    console.log(this.contentElList);
  }

  render() {
    return html`
      <div class="header">
        ${this.renderHeader()}
      </div>
      <div class="content">

      </div>
      <div class="footer">
        ${this.renderFooter()}
      </div>
    `;
  }

  private renderHeader() {
    return this.stepElList?.map((step, index) => {
      console.log(step, index);
      return html`
        
      `;
    })
  }

  private renderFooter() {
    return html`
      <u-button theme="default"
        @click=${this.previous}>
        ${t('component::previous')}
      </u-button>
      <u-button theme="primary"
        @click=${this.next}>
        ${t('component::next')}
      </u-button>
      <u-button theme="success"
        @click=${this.done}>
        ${t('component::done')}
      </u-button>
    `;
  }

  private getSteps() {
    const steps = this.querySelectorAll('u-wizard-step') || [];
    this.totalSteps = steps.length;
    steps.forEach((step, index) => {
      console.log(step.assignedSlot);
      console.log(index);
    });
    return Array.from(steps);
  }

  private getContents() {
    const contents = this.querySelectorAll('u-wizard-content') || [];
    return Array.from(contents);
  }

  private previous() {
    this.currentStep--;
    this.chageState();
  }

  private next() {
    this.currentStep++;
    this.chageState();
  }

  private done() {
    this.currentStep = 0;
    this.chageState();
  }

  private chageState() {
    this.state = this.currentStep === 0 ? "init" 
    : this.currentStep === this.totalSteps - 1  ? "completed" 
    : "inProgress";
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    :host([state="init"]) .footer {
      justify-content: flex-end;
      u-button[theme="default"], u-button[theme="success"] { display: none; }
    }
    :host([state="inProgress"]) .footer u-button[theme="success"] {
      display: none;
    }
    :host([state="completed"]) .footer u-button[theme="primary"] {
      display: none;
    }

    .header {
      width: 100%;
    }

    .content {
      width: 100%;
    }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  `;

}
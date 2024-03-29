import { LitElement } from "lit";
import { property, query } from "lit/decorators.js";
import type { UInputContainer } from "../input-parts/UInputContainer";
import type { UInputWrapper } from "../input-parts/UInputWrapper";

import "../input-parts/UInputLabel";
import "../input-parts/UInputError";
import "../input-parts/UInputContainer";
import "../input-parts/UInputWrapper";

export abstract class UInputBase extends LitElement {

  @query('u-input-container') container?: UInputContainer;
  @query('u-input-wrapper') wrapper?: UInputWrapper;

  @property({ type: Boolean }) required: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;

  @property({ type: Object }) context?: any;
  @property({ type: String }) name?: string;
  @property() value?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(this.container) {
      if (changedProperties.has('required')) {
        this.container.required = this.required || false;
      }
      if (changedProperties.has('label')) {
        this.container.label = this.label;
      }
      if (changedProperties.has('description')) {
        this.container.description = this.description;
      }
      if (changedProperties.has('error')) {
        this.container.error = this.error;
      }
    }
    if(this.wrapper) {
      if (changedProperties.has('error')) {
        this.wrapper.invaild = this.error ? true : false;
      }
    }
    if ((changedProperties.has('context') || changedProperties.has('name')) && this.context && this.name) {
      this.value = this.context[this.name];
    }
    if (changedProperties.has('value')) {
      if (this.context && this.name) {
        this.context[this.name] = this.value;
      }
      this.dispatchEvent(new CustomEvent('change', { 
        detail: this.value 
      }));
    }
  }

  public abstract validate(): Promise<boolean>;

}
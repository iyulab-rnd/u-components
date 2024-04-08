import { LitElement } from "lit";
import { property, query } from "lit/decorators.js";

import { UBaseInputModel } from "./UBaseInput.model";
import type { UInputContainer } from "../input-parts/UInputContainer";
import type { UInputBorder } from "../input-parts/UInputBorder";
import "../input-parts/UInputLabel";
import "../input-parts/UInputError";
import "../input-parts/UInputContainer";
import "../input-parts/UInputBorder";
import "../icon/UIcon";

export abstract class UBaseInput extends LitElement implements UBaseInputModel {

  @query('u-input-container') inputContainer?: UInputContainer;
  @query('u-input-border') inputBorder?: UInputBorder;

  @property({ type: Boolean }) required: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;
  @property({ type: String }) size?: string;

  @property({ type: Object }) context?: any;
  @property({ type: String }) name?: string;
  @property() value?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    // Label and error update
    if(this.inputContainer) {
      if (changedProperties.has('required')) {
        this.inputContainer.required = this.required || false;
      }
      if (changedProperties.has('disabled')) {
        this.inputContainer.disabled = this.disabled || false;
      }
      if (changedProperties.has('readonly')) {
        this.inputContainer.readonly = this.readonly || false;
      }
      if (changedProperties.has('label')) {
        this.inputContainer.label = this.label;
      }
      if (changedProperties.has('description')) {
        this.inputContainer.description = this.description;
      }
      if (changedProperties.has('error')) {
        this.inputContainer.error = this.error;
      }
    }

    // Error update on border line
    if(this.inputBorder) {
      if (changedProperties.has('error')) {
        this.inputBorder.invaild = this.error ? true : false;
      }
    }

    if (changedProperties.has('size')) {
      this.style.fontSize = this.size || '14px';
    }

    // Context bind to value
    if ((changedProperties.has('context') || changedProperties.has('name'))) {
      if(this.context && this.name) {
        this.value = this.context[this.name];
      }
    }

    // Value bind to context
    if (changedProperties.has('value')) {
      if (this.context && this.name) {
        this.context[this.name] = this.value;
      }
    }

  }

  public abstract validate(): Promise<boolean>;

  protected setValid(): true {
    this.error = '';
    return true;
  }

  protected setInvalid(error: string): false {
    this.error = error;
    return false;
  }

}
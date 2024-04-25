import { LitElement } from "lit";
import { property, query } from "lit/decorators.js";

import { UBaseInputModel } from "./UBaseInput.model";
import type { UInputContainer } from "./UInputContainer";
import type { LabelPosition } from "././UInputContainer.model";
import type { UInputBorder } from "./UInputBorder";
import "./UInputLabel";
import "./UInputError";
import "./UInputContainer";
import "./UInputBorder";
import "../icon/UIcon";

export abstract class UBaseInput extends LitElement implements UBaseInputModel {

  @query('u-input-container') inputContainer?: UInputContainer;
  @query('u-input-border') inputBorder?: UInputBorder;

  @property({ type: Boolean }) required?: boolean;
  @property({ type: Boolean }) disabled?: boolean;
  @property({ type: Boolean }) readonly?: boolean;
  @property({ type: String }) label?: string;
  @property({ type: String }) labelPosition?: LabelPosition;
  @property({ type: String }) description?: string;
  @property({ type: String }) error?: string;
  @property({ type: String }) size?: string;

  @property({ type: Object }) context?: any;
  @property({ type: String }) name?: string;
  @property({ attribute: false }) value?: any;
  @property({ attribute: false }) meta?: any;

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
      if (changedProperties.has('labelPosition')) {
        this.inputContainer.labelPosition = this.labelPosition;
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

    // Meta Data update
    if (changedProperties.has('meta') && this.meta) {
      try {
        Object.assign(this, this.meta);
      } catch (error) {
        console.error(error);
      }
    }

  }

  /**
   * Validate function this input value
   */
  public abstract validate(): Promise<boolean>;

  /**
   * Set clear error message and retrun true
   */
  protected setValid(): true {
    this.error = '';
    return true;
  }

  /**
   * Set error message and return false
   * @param error 
   */
  protected setInvalid(error: any): false {
    this.error = error;
    return false;
  }

}
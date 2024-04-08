import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { UTextareaInputModel } from "./UTextareaInput.model";
import { UBaseInput } from "./UBaseInput";

@customElement('u-textarea-input')
export class UTextareaInput extends UBaseInput implements UTextareaInputModel {
  
  @query('textarea') input!: HTMLTextAreaElement;

  @property({ type: Boolean, reflect: true }) clearable: boolean = false;  
  @property({ type: String }) placeholder?: string;
  @property({ type: String }) value?: string;
  @property({ type: Number }) minRow?: number;
  @property({ type: Number }) maxRow?: number;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('value')) {
      this.clearable = !!this.value;
      this.adjustHeight();
    }
    if(changedProperties.has('maxRow')) {
      this.input.style.maxHeight = this.maxRow ? `${this.maxRow * 1.5}em` : 'none';
    }
  }

  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <textarea
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            placeholder=${this.placeholder || ''}
            rows=${this.minRow || 3}
            .value=${this.value || ''}
            @input=${this.onInput}
            @change=${this.onChage}
          ></textarea>
          <u-icon type="system" name="clear"
            @click=${this.handleClear}
          ></u-icon>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if(!this.input.validity.valid) {
      return this.setInvalid(this.input.validationMessage);
    }
    return this.setValid();
  }

  private onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
  }

  private onChage = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  private handleClear = () => {
    this.input.value = "";
    this.value = "";
    this.input.focus();
  }

  private async adjustHeight() {
    this.input.style.height = 'auto';
    const height = this.input.scrollHeight;
    if(height) {
      this.input.style.height = `${height}px`;
    } else {
      this.input.style.height = `${this.minRow || 3 * 1.5}em`;
    }
  }

  static styles = css`
    :host {
      width: 100%;
      font-size: 14px;
    }
    :host([clearable]) u-icon {
      display: inline-flex;
    }

    textarea {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      padding: 0;
      background-color: transparent;
      font-family: var(--sl-font-sans);
      font-size: inherit;
      line-height: 1.5;
      -webkit-appearance: none;
    }
    textarea::-webkit-scrollbar {
      width: 5px;
    }
    textarea::-webkit-scrollbar-thumb {
      background-color: var(--sl-color-gray-300);
    }
    textarea::-webkit-scrollbar-track {
      background-color: transparent;
    }

    u-icon {
      position: absolute;
      z-index: 1;
      right: 10px;
      top: 10px;
      display: none;
      font-size: inherit;
      cursor: pointer;
    }
  `;
}
import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { UEditorInputModel } from "./UEditorInput.model";
import { UBaseInput } from "./UBaseInput";
import "../editor/MonacoEditor";

@customElement('u-editor-input')
export class UEditorInput extends UBaseInput implements UEditorInputModel {

  @property({ type: String }) language?: string;
  @property({ type: Number }) fontSize?: number;
  @property({ type: String }) value?: string;
  
  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <monaco-editor noHeader
            .language=${this.language || 'json'}
            .readOnly=${this.readonly}
            .value=${this.value || ''}
            .fontSize=${this.fontSize || 14}
            @change=${this.onChange}
          ></monaco-editor>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if (this.required && !this.value) {
      return this.setInvalid('This field is required');
    } else {
      return this.setValid();
    }
  }

  private onChange = (event: CustomEvent) => {
    this.value = event.detail.trim();
    this.validate();
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  static styles = css`
    :host {
      width: 100%;
      --input-size: 14px;
    }

    u-input-border {
      height: calc(var(--input-size) * 10);
      overflow: hidden;
      resize: vertical;
    }

  `;
}
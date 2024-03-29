import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UInputBase } from "./UInputBase";

@customElement('u-editor-input')
export class UEditorInput extends UInputBase {

  @property({ type: String }) language?: string;
  @property({ type: Boolean }) readOnly: boolean = false;
  @property({ type: String }) placeholder?: string;
  @property({ type: String }) value?: string;
  
  render() {
    return html`
      <ds-input-container>
        <ds-input-wrapper>
          <monaco-editor ></monaco-editor>
        </ds-input-wrapper>
      </ds-input-container>
    `;
  }

  public async validate() {
    return true;
  }

  static styles = css`
    :host {
      display: block;
    }

    ds-input-wrapper {
      height: 100px;
      overflow: hidden;
      resize: vertical;
    }
    .editor {
      width: 100%;
      height: 100%;
    }
  `;
}
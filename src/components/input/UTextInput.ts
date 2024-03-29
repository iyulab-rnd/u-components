import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { UInputBase } from "./UInputBase";

@customElement('u-text-input')
export class UTextInput extends UInputBase {
  
  @property({ type: String }) type: string = "text";
  @property({ type: String }) placeholder?: string;
  @property({ type: String }) value?: string;

  render() {
    return html`
      <u-input-container>
        <u-input-wrapper>
          <slot name="prefix"></slot>
          <input type="text" 
            value=${this.value || ''} 
            @change=${this.onChage} 
          />
          <slot name="suffix"></slot>
        </u-input-wrapper>
      </u-input-container>
    `;
  }

  private async onChage(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.validate();
  }

  public async validate() {
    if(this.required && !this.value) {
      this.error = `This ${this.name} field is required`;
      return false;
    } else {
      this.error = "";
      return true;
    }
  }

  static styles = css`
    :host {
      width: 100%;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      line-height: 20px;
      background-color: transparent;
    }
  `;
}
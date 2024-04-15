import { LitElement, css, html } from "lit";
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { customElement, property, queryAll, state } from 'lit/decorators.js';
import { localized, msg } from "@lit/localize";

import { UFormModel } from "./UForm.model";
import { getPropertyMeta, type PropertyMetaData } from "../../decorators";
import type { LabelPosition } from '../input-parts/UInputContainer.model';
import type { UBaseInput } from "../input-parts/UBaseInput";
import type { UButtonSize } from "../button/UButton.model";
import "../input";
import "../button/UButton";

@localized()
@customElement('u-form')
export class UForm extends LitElement implements UFormModel {

  @queryAll('.input') inputs!: NodeListOf<UBaseInput>;
  
  @state() keys: string[] = [];
  @state() loading: boolean = false;
  
  @property({ type: Boolean, reflect: true }) noHeader?: boolean;
  @property({ type: Boolean, reflect: true }) noFooter?: boolean;
  @property({ type: String }) size?: string;
  @property({ type: String }) buttonSize?: UButtonSize;
  @property({ type: String }) headLine?: string;
  @property({ type: String }) labelPosition?: LabelPosition;

  @property({ type: Object }) context?: any;
  @property({ type: Array }) meta?: PropertyMetaData[];
  @property({ type: Array }) include?: string[];
  @property({ type: Array }) exclude?: string[];

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('size') && this.size) {
      this.style.fontSize = this.size;
    }
    
    if (changedProperties.has('context')) {
      if(this.context) {
        const keys = Object.keys(this.context);
        this.keys = [...new Set([...this.keys, ...keys])];
      } else {
        this.context = {};
      }
      this.meta = getPropertyMeta(this.context) || this.meta;
    }
    if (changedProperties.has('meta') && this.meta) {
      const names = this.meta.filter(m => m.name != undefined).map(m => m.name!);
      this.keys = [...new Set([...this.keys, ...names])];
    }

    if (changedProperties.has('include') && this.include && this.include.length > 0) {
      this.keys = this.keys.filter(key => this.include?.includes(key));
    }
    if (changedProperties.has('exclude') && this.exclude && this.exclude.length > 0) {
      this.keys = this.keys.filter(key => !this.exclude?.includes(key));
    }
  }

  render() {
    return html`
      ${this.renderHeader()}
      ${this.renderForm()}
      ${this.renderFooter()}
    `;
  }

  private renderHeader() {
    if(!this.headLine) return;
    return html`
      <div class="header">
        ${this.headLine}
      </div>
    `;
  }

  private renderForm() {
    return html`
      <div class="form">
        ${this.keys.map((key) => {
          const meta = this.meta?.find(m => m.name === key);
          if(!meta) return;
          const { type, ...rest } = meta;
          const tag = `u-${type}-input`;
          return staticHtml`
            <${unsafeStatic(tag)}
              class="input"
              .labelPosition=${this.labelPosition}
              .meta=${rest}
              .context=${this.context}
            ></${unsafeStatic(tag)}>
          `;
        })}
      </div>
    `;
  }

  private renderFooter() {
    return html`
      <div class="footer">
        <u-button
          theme="default"
          .size=${this.buttonSize || 'small'}
          @click=${this.handleCancel}
        >${msg('취소')}</u-button>
        <u-button
          theme="primary"
          .size=${this.buttonSize || 'small'}
          .loading=${this.loading || false}
          @click=${this.handleSubmit}
        >${msg('확인')}</u-button>
      </div>
    `;
  }

  public async validate() {
    const inputs = Array.from(this.inputs);
    const results = await Promise.all(
      inputs.map(input => input.validate())
    );
    return results.every(result => result);
  }

  private handleSubmit = async () => {
    const isValid = await this.validate();
    if(!isValid) return;
    this.dispatchEvent(new CustomEvent('submit', { 
      detail: this.context 
    }));
  }

  private handleCancel = () => {
    this.dispatchEvent(new CustomEvent('cancel', {
      detail: this.context
    }));
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      font-size: 14px;

      --header-padding: 10px;
      --form-padding: 10px;
      --footer-padding: 10px;

      --form-gap: 10px;
      --footer-gap: 10px;
    }
    :host([noHeader]) .header {
      display: none;
    }
    :host([noFooter]) .footer {
      display: none;
    }

    .header {
      width: 100%;
      font-size: 1.8em;
      line-height: 1.2;
      font-weight: 600;
      padding: var(--header-padding);
      box-sizing: border-box;
    }

    .form {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--form-gap);
      padding: var(--form-padding);
      box-sizing: border-box;

      .input {
        font-size: inherit;
      }
    }

    .footer {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      gap: var(--footer-gap);
      padding: var(--footer-padding);
      box-sizing: border-box;
    }
  `;

}
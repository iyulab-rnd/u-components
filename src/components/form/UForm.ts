import { LitElement, css, html } from "lit";
import { customElement, property, queryAll, query, state } from 'lit/decorators.js';

import type { PropertyMetaData } from "../../decorators";
import { UInput } from "../input";
import { UButton } from "../button";
import { UAlert } from "../alert";
import "../input";
import "../button";

@customElement('u-form')
export class UForm extends LitElement {
  private alert = new UAlert();

  @queryAll('u-input') inputs!: NodeListOf<UInput>;
  @query('.submit') submit!: UButton;
  
  @state() keys: string[] = [];
  
  @property({ type: String }) label?: string;
  @property({ type: Boolean }) noHeader = false;
  @property({ type: Boolean }) noFooter = false;
  @property({ attribute: false }) context: any = {};
  @property({ attribute: false }) meta: PropertyMetaData[] = [];
  @property({ attribute: false }) onSubmit?: (context: any) => Promise<void>;
  @property({ type: Array }) include: string[] = [];
  @property({ type: Array }) exclude: string[] = [];

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('context')) {
      if(this.context) {
        const keys = Object.keys(this.context);
        this.keys = [...new Set([...this.keys, ...keys])];
      } else {
        this.context = {};
      }
    }
    if (changedProperties.has('meta') && this.meta) {
      const keys = this.meta.filter(m => m.name != undefined).map(m => m.name!);
      this.keys = [...new Set([...this.keys, ...keys])];
    }
    if (changedProperties.has('include') && this.include.length > 0) {
      this.keys = this.keys.filter(key => this.include.includes(key));
    }
    if (changedProperties.has('exclude') && this.exclude.length > 0) {
      this.keys = this.keys.filter(key => !this.exclude.includes(key));
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
    if (this.noHeader || !this.label) return;
    return html`
      <div class="header">
        ${this.label ? html`
          <div class="title">${this.label}</div>`
        : ''}
        <slot name="header"></slot>
      </div>
    `;
  }

  private renderForm() {
    return html`
      <div class="form">
        ${this.keys.map((key) => {
          const meta = this.meta.find(m => m.name === key);
          if(!meta) return;
          const { name, ...rest } = meta; // eslint-disable-line
          return html`
            <u-input
              .meta=${rest}
              .context=${this.context}
              path=${key}
            ></u-input>
          `;
        })}
      </div>
    `;
  }

  private renderFooter() {
    if (this.noFooter) return;
    return html`
      <u-button-group 
        class="footer" 
        position="end" 
        gap="5px"
      >
        <slot name="footer"></slot>
        <u-button
          size="medium"
          theme="default"
          @click=${this.handleCancel}
        >취소</u-button>
        <u-button
          class="submit"
          size="medium"
          theme="primary"
          @click=${this.handleSubmit}
        >등록</u-button>
      </u-button-group>
    `;
  }

  private async handleSubmit() {
    try {
      this.submit.loading = true;
      const isValid = await this.checkValidity();
      if (isValid) {
        await this.onSubmit?.(this.context);
        this.dispatchEvent(new CustomEvent('submit', {
          detail: this.context
        }));
      }
    } catch(error: any) {
      this.alert.toastAsync("danger", error);
    } finally {
      this.submit.loading = false;
    }
  }

  private handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  public async checkValidity() {
    const inputs = Array.from(this.inputs);
    const results = await Promise.all(
      inputs.map(input => input.checkValidity())
    );
    return results.every(result => result);
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      --header-padding: 10px;
      --form-padding: 10px;
      --form-gap: 10px;
      --footer-padding: 10px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--header-padding);

      .title {
        font-size: 32px;
        line-height: 32px;
        font-weight: 600;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: var(--form-gap);
      padding: var(--form-padding);
    }

    .footer {
      padding: var(--footer-padding);
    }
  `;

}
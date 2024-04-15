import { LitElement, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { unsafeStatic, html } from 'lit/static-html.js';

import "./index";
import { UInputModel } from './UInput.model';
import type { UBaseInput } from '../input-parts/UBaseInput';
import type { LabelPosition } from "../input-parts/UInputContainer.model";
import { 
  getPropertyMeta, 
  type PropertyMetaType, 
  type PropertyMetaData
} from "../../decorators";

@customElement('u-input')
export class UInput extends LitElement implements UInputModel {

  @query('.input') input!: UBaseInput;

  @state() tag?: string;

  @property({ type: String }) labelPosition?: LabelPosition;
  @property({ type: String }) size: string = "14px";

  @property({ type: Object }) meta?: PropertyMetaData;
  @property({ type: String }) type?: PropertyMetaType;
  @property({ type: Object }) context?: any;
  @property({ type: String }) name?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);

    if ((changedProperties.has('context') || changedProperties.has('name')) 
        && this.context && this.name) {
      this.meta = getPropertyMeta(this.context, this.name);
    }
    if (changedProperties.has('meta') && this.meta) {
      this.type = this.meta.type;
    }
    if (changedProperties.has('type') && this.type) {
      this.tag = `u-${this.type}-input`;
    }
  }

  render() {
    if (!this.tag) return nothing;
      
    return html`
      <${unsafeStatic(this.tag)} 
        class="input"
        .labelPosition=${this.labelPosition}
        .size=${this.size}
        .context=${this.context}
        .name=${this.name}
        .meta=${this.meta}
      ></${unsafeStatic(this.tag)}>
    `;
  }

  public async validate() {
    return await this.input.validate();
  }

  static styles = css`
    :host {
      display: inline-block;
      width: 100%;
    }
  `
}
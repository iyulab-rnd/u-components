import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { UnsafeHTMLDirective, unsafeHTML } from "lit/directives/unsafe-html.js";
import type { DirectiveResult } from "lit/directive.js";

import { UIconModel, type UIconType } from "./UIcon.model";
import { UIconController } from "./UIconController";
import { SystemIcon } from "./UIcon.resource";

@customElement('u-icon')
export class UIcon extends LitElement implements UIconModel {

  @state() svg?: DirectiveResult<typeof UnsafeHTMLDirective> | TemplateResult<1>;

  @property({ type: String }) type: UIconType = 'default';
  @property({ type: String }) name?: string;
  @property({ type: String }) size?: string;
  @property({ type: String }) color?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('name') && this.name) {
      this.svg = await this.resolveFrom(this.name);
    }
    if (changedProperties.has('size')) {
      this.style.fontSize = this.size ?? '16px';
    }
    if (changedProperties.has('color')) {
      this.style.color = this.color ?? 'currentColor';
    }
  }

  protected render() {
    return this.svg ?? nothing;
  }

  private resolveFrom = async (name: string) => {
    if(this.type === 'default') {
      return await this.resovleFromFile(name);
    } else if(this.type === 'system') {
      return this.resolveFromVector(name);
    } else if(UIconController.renderers.has(this.type)) {
      const renderer = UIconController.renderers.get(this.type);
      return renderer?.call(this, name) ?? nothing;
    } else {
      return nothing;
    }
  }

  private resovleFromFile = async (name: string) => {
    const basePath = UIconController.basePath;
    const fullPath = `${basePath.endsWith('/') ? basePath.slice(0, -1) : basePath}/${name}.svg`;
    const result = await fetch(fullPath);
    const content = await result.text();
    return content.startsWith('<svg') ? unsafeHTML(content) : nothing;
  }
  
  private resolveFromVector = (name: string) => {
    const vector = SystemIcon[name];
    if(!vector) return nothing;
    return html`
      <svg viewBox="${vector.viewBox || '0 0 16 16'}">
        <path d=${vector.path}></path>
      </svg>
    `;
  }
  
  static styles = css`
    :host {
      display: inline-flex;
      font-size: 16px;
    }

    svg {
      width: 1em;
      height: 1em;
      fill: currentColor;
    }
  `;

}
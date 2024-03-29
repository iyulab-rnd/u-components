import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import SlDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.component.js';
SlDrawer.define('sl-drawer');

import { UModalContent } from "./UModalContent";
import type { UModalResult } from "./UModalModel";

export type DrawerPosition = 'top' | 'end' | 'bottom' | 'start';

@customElement('u-drawer')
export class UDrawer extends LitElement {
  
  @query("sl-drawer")drawer!: SlDrawer;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) label?: string;
  @property({ type: String }) position: DrawerPosition = "end";
  @property({ type: Boolean }) contained: boolean = false;
  @property({ type: Boolean }) noHeader: boolean = false;
  @property({ attribute: false }) headerActions?: HTMLElement;
  @property({ attribute: false }) content?: UModalContent;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('content') && this.content) {
      this.content.addEventListener('label', (e: any) => {
        this.label = e.detail;
      });
    }
  }

  render() {
    return html`
      <sl-drawer
        label=${ifDefined(this.label)}
        ?open=${this.open}
        .noHeader=${this.noHeader}
        ?contained=${this.contained}
        .placement=${this.position}
      >
        ${this.renderContent()}
      </sl-drawer>
    `;
  }

  private renderContent() {
    return html`
      ${this.headerActions ? html`<div slot="header-actions">${this.headerActions}</div>` : ''}
      ${this.content ?? html`<slot></slot>`}
    `;
  }

  public async showAsync(content?: UModalContent) : Promise<UModalResult> {
    this.content = content ?? this.content;
    await this.updateComplete;
    await this.drawer.show();

    return new Promise<UModalResult>((resolve) => {
      if (this.content instanceof UModalContent) {
        this.content.addEventListener('confirm', (e: any) => {
          resolve({ success: true, value: e.detail });
          this.drawer.hide();
        });
        this.content.addEventListener('cancel', (e: any) => {
          resolve({ success: false, value: e.detail });
          this.drawer.hide();
        });
      } else {
        resolve({ success: true, value: undefined });
      }
    });
  }

  public async hideAsync() {
    await this.drawer.hide();
  }

  static styles = css`
    sl-drawer {
      --header-spacing: var(--sl-spacing-small);
      --body-spacing: var(--sl-spacing-small);
      --footer-spacing: var(--sl-spacing-small);
    }
  `;

}
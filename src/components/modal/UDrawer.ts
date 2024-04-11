import { LitElement, css, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

import SlDrawer from '@shoelace-style/shoelace/dist/components/drawer/drawer.component.js';
SlDrawer.define('sl-drawer');

import { UDrawerModel, type DrawerPosition } from "./UDrawer.model";
import { UModalContent } from "./UModalContent";
import type { UModalResult } from "./UModalContent.model";

@customElement('u-drawer')
export class UDrawer extends LitElement implements UDrawerModel {
  
  @query("sl-drawer") drawer!: SlDrawer;

  @state() content?: UModalContent;

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: Boolean }) noHeader: boolean = false;
  @property({ type: Boolean }) contained: boolean = false;
  @property({ type: String }) position: DrawerPosition = "end";
  @property({ type: String }) label?: string;
  
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
        ?open=${this.open}
        ?noHeader=${this.noHeader}
        ?contained=${this.contained}
        label=${this.label || ''}
        .placement=${this.position}
      >
        <slot name="action" slot="header-actions"></slot>
        ${this.content ?? html`<slot></slot>`}
      </sl-drawer>
    `;
  }

  public async showAsync(content?: UModalContent) : Promise<UModalResult> {
    this.label = content?.label ?? undefined;
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
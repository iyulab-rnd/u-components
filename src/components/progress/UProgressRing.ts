import { LitElement, css, html, } from "lit";
import { customElement, property } from "lit/decorators.js";

import SlProgressRing from '@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.component.js';
SlProgressRing.define('sl-progress-ring');

import { UProgressRingModel } from './UProgressRing.model';

@customElement('u-progress-ring')
export class UProgressRing extends LitElement implements UProgressRingModel {

  @property({ type: Number }) value?: number;
  @property({ type: String }) size?: string;
  @property({ type: String }) thickness?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    if(changedProperties.has('size') && this.size) {
      this.style.setProperty('--ring-size', this.size);
    }
    if(changedProperties.has('thickness') && this.thickness) {
      this.style.setProperty('--ring-thickness', this.thickness);
    }
  }

  render() {
    return html`
      <sl-progress-ring
        .value=${this.value || 0}>
        ${this.value} %
      </sl-progress-ring>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;

      --ring-size: 48px;
      --ring-thickness: 4px;
    }

    sl-progress-ring {
      --size: var(--ring-size);
      --track-width: var(--ring-thickness);
      --indicator-width: var(--ring-thickness);
    }
  `;
}
import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { convertReact } from "../../utils";

import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
SlProgressBar.define('sl-progress-bar');

import { UProgressBarModel } from './UProgressBar.model';

@customElement('u-progress-bar')
export class UProgressBarElement extends LitElement implements UProgressBarModel {

  @property({ type: Number }) value?: number;
  @property({ type: Boolean }) infinite: boolean = false;
  @property({ type: String }) thickness?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
    if(changedProperties.has('thickness') && this.thickness) {
      this.style.setProperty('--bar-thickness', this.thickness);
    }
  }

  render() {
    return html`
      <sl-progress-bar
        ?indeterminate=${this.infinite}
        .value=${this.value || 0}>
        ${this.infinite ? nothing : `${this.value}%`}
      </sl-progress-bar>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      width: 100%;

      --bar-thickness: 4px;
    }

    sl-progress-bar {
      width: 100%;
      --height: var(--bar-thickness);
    }
  `;
}

export const UProgressBar = convertReact({
  elementClass: UProgressBarElement,
  tagName: 'u-progress-bar'
});
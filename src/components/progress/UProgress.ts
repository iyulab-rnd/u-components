import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import SlProgressRing from '@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.component.js';
import SlProgressBar from '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.component.js';
SlProgressRing.define('sl-progress-ring');
SlProgressBar.define('sl-progress-bar');

import type { UProgressModel } from './UProgress.model';

@customElement('u-progress')
export class UProgress extends LitElement implements UProgressModel {
  
  @property({ type: String }) type: 'ring' | 'bar' = 'ring';
  @property({ type: Number }) value?: number;
  @property({ type: String }) label?: string;
  @property({ type: Boolean }) infinite: boolean = false;
  @property({ type: String }) thickness?: string;
  @property({ type: String }) trackColor?: string;
  @property({ type: String }) indicatorColor?: string;

  protected updated(changedProperties: any) {
    super.updated(changedProperties);
    if(changedProperties.has('thickness') && this.thickness) {
      if(this.type === 'bar') {
        this.style.setProperty('--bar-thickness', this.thickness);
      } else {
        this.style.setProperty('--ring-thickness', this.thickness);
      }
    }
    if(changedProperties.has('trackColor') && this.trackColor) {
      this.style.setProperty('--progress-track-color', this.trackColor);
    }
    if(changedProperties.has('indicatorColor') && this.indicatorColor) {
      this.style.setProperty('--progress-indicator-color', this.indicatorColor);
    }
    // if(changedProperties.has('infinite') && this.type === 'ring' && this.infinite) {
    //   setInterval(() => {
    //     this.value = (this.value + 0.001);
    //   }, 100);
    // }
  }

  render() {
    return html`
      ${this.renderLabel()}
      ${this.renderProgress()}
    `;
  }

  private renderLabel() {
    if(!this.label) return;
    return html`<label>${this.label}</label>`;
  }

  private renderProgress() {
    if(this.type === 'bar') {
      return html`
        <sl-progress-bar
          value="${ifDefined(this.value)}"
          ?indeterminate=${this.infinite}
        ><slot></slot></sl-progress-bar>
      `;
    } else {
      return html`
        <sl-progress-ring 
          value="${ifDefined(this.value)}"
        ><slot></slot></sl-progress-ring>
      `;
    }
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      --bar-thickness: 1rem;
      --ring-thickness: 4px;
      --progress-track-color: var(--sl-color-neutral-200);
      --progress-indicator-color: var(--sl-color-primary-600);
    }

    sl-progress-bar {
      width: 100%;
      --track-color: var(--progress-track-color);
      --indicator-color: var(--progress-indicator-color);
      --height: var(--bar-thickness);
    }

    sl-progress-ring {
      --track-color: var(--progress-track-color);
      --indicator-color: var(--progress-indicator-color);
      --track-width: var(--ring-thickness);
      --indicator-width: var(--ring-thickness);
    }

    sl-progress-ring slot {
      display: block;
    }
  `;
  
}
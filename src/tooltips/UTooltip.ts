import { LitElement, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import SlTooltip from '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

import { UTooltipModel } from "./UTooltipModel";

@customElement('u-tooltip')
export class UTooltip extends LitElement implements UTooltipModel {

  @query("sl-tooltip")
  tooltip!: SlTooltip;

  @property({ type: String })
  content?: string | HTMLElement | LitElement;

  @property({ type: String })
  position: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' = 'top';

  @property({ type: Boolean })
  arrow: boolean = false;

  @property({ type: Number })
  distance?: number;

  @property({ type: Number })
  maxWidth?: number;

  protected update(changedProperties: any) {
    super.update(changedProperties);

    if (changedProperties.has('maxWidth')) {
      this.tooltip.style.setProperty('--max-width', `${this.maxWidth}px`);
    }

    if (changedProperties.has('arrow')) {
      this.tooltip.style.setProperty('--sl-tooltip-arrow-size', `${this.arrow ? '6px' : '0'}`);
    }
  }

  render() {
    return html`
      <sl-tooltip 
        ?hoist=${true}  
        .position=${this.position}
        distance=${ifDefined(this.distance)}
      >
        <div slot="content">
          ${this.content ?? html`<slot name="content"></slot>`}
        </div>
        <slot></slot>
      </sl-tooltip>
    `;
  }

}
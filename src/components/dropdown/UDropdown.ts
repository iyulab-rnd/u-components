import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import SlDropdown from "@shoelace-style/shoelace/dist/components/dropdown/dropdown.component.js";
SlDropdown.define('sl-dropdown');

export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end'

@customElement("u-dropdown")
export class UDropdown extends LitElement {

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) placement: DropdownPlacement = 'bottom-start';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Number }) distance: number = 0;
  @property({ type: Number }) skidding: number = 0;

  render() {
    return html`
      <sl-dropdown
        ?open=${this.open}
        ?disabled=${this.disabled}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        hoist
        @sl-show=${() => this.open = true}
        @sl-hide=${() => this.open = false}
      >
        <slot name="trigger" slot="trigger"></slot>
        <slot @select=${this.onSelect}></slot>
      </sl-dropdown>
    `;
  }

  public toggle() {
    this.open = !this.open;
  }

  private async onSelect(event: CustomEvent) {
    event.stopPropagation();
    this.dispatchEvent(new CustomEvent('select', { 
      detail: event.detail
    }));
    this.toggle();
  }
}
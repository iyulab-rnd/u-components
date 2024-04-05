import { css, html, LitElement } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import type { UIconType } from '../icon/UIcon.model';
import type { UTooltipPosition } from '../tooltip/UTooltip.model';
import type { CommandModel } from '../../patterns/CommandPattern';
import { UIconButtonModel } from "./UIconButton.model";

import '../icon/UIcon';
import '../spinner/USpinner';
import '../tooltip/UTooltip';

@customElement('u-icon-button')
export class UIconButton extends LitElement implements UIconButtonModel {

  @query('a') anchor!: HTMLAnchorElement;

  @property({ type: String }) type: UIconType = 'default';
  @property({ type: String }) name?: string;
  @property({ type: String }) color?: string;
  @property({ type: String }) size?: string = "16px";
  @property({ type: String }) href?: string;
  @property({ type: String }) target: string = '_self';
  @property({ type: String }) download?: string;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) tooltip?: string;
  @property({ type: String }) tooltipPosition: UTooltipPosition = 'top';
  @property({ type: Object }) command?: CommandModel;
  @property() commandParam?: any;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;
  }

  render() {
    if (this.loading) {
      return this.renderLoadingSpinner();
    } else {
      return html`
        <a target=${ifDefined(this.target)}
          href=${ifDefined(this.href)} 
          download=${ifDefined(this.download)}
        ></a>
        ${this.tooltip
          ? this.renderIconButtonWithTooltip()
          : this.renderIconButton()}
      `;
    }
  }

  private renderLoadingSpinner() {
    return html`
      <u-spinner
        .size=${this.size}
      ></u-spinner>
    `;
  }

  private renderIconButtonWithTooltip() {
    return html`
      <u-tooltip
        .content=${this.tooltip}
        .position=${this.tooltipPosition}>
        ${this.renderIconButton()}
      </u-tooltip>
    `;
  }

  private renderIconButton() {
    return html`
      <u-icon
        .type=${this.type}
        .name=${this.name}
        .color=${this.color}
        .size=${this.size}
        @click=${this.handleButtonClick}
      ></u-icon>
    `;
  }

  private handleButtonClick = async (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.href || this.download) {
      this.anchor.click();
    }
    if (this.command && this.command.canExecute(this.commandParam)) {
      try {
        this.loading = true;
        this.command.execute(this.commandParam);
      } catch (error) {
        /* istanbul ignore next */
      } finally {
        this.loading = false;
      }
    }
    this.dispatchEvent(new CustomEvent('click', { 
      bubbles: true, composed: true
    }));
  }

  static styles = css`
    :host {
      display: inline-flex;
      cursor: pointer;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([loading]) {
      cursor: wait;
    }

    a {
      display: none;
    }
  `;

}
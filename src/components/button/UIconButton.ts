import { css, html, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js';

import type { UIconType } from '../icon/UIcon.model';
import type { UTooltipPosition } from '../tooltip/UTooltip.model';
import type { CommandModel } from '../../patterns/CommandPattern';
import type { UButtonTarget } from './UButton.model';
import { UIconButtonModel } from "./UIconButton.model";

import '../spinner/USpinner';
import '../tooltip/UTooltip';
import '../icon/UIcon';

@customElement('u-icon-button')
export class UIconButton extends LitElement implements UIconButtonModel {

  @property({ type: String }) type: UIconType = 'default';
  @property({ type: String }) name?: string;
  @property({ type: String }) color?: string;
  @property({ type: String }) size?: string = "16px";

  @property({ type: String }) href?: string;
  @property({ type: String }) target: UButtonTarget = '_self';
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

    if (changedProperties.has('size') && this.size) {
      this.style.fontSize = this.size;
    }
  }

  render() {
    if (this.loading) {
      return html`<u-spinner></u-spinner>`;
    } 
    let content = this.renderIcon();

    if (this.href || this.download) {
      content = this.renderAnchorWith(content);
    }
    if (this.tooltip) {
      content = this.renderTooltipWith(content);
    }
    return content;
  }

  private renderAnchorWith(content: TemplateResult<1>) {
    return html`
      <a target=${ifDefined(this.target)}
        href=${ifDefined(this.href)} 
        download=${ifDefined(this.download)}
      >${content}</a>
    `;
  }

  private renderTooltipWith(content: TemplateResult<1>) {
    return html`
      <u-tooltip
        .content=${this.tooltip}
        .position=${this.tooltipPosition}
      >${content}</u-tooltip>
    `;
  }

  private renderIcon() {
    return html`
      <u-icon
        .type=${this.type}
        .name=${this.name}
        .color=${this.color}
        @click=${this.handleButtonClick}
      ></u-icon>
    `;
  }

  private handleButtonClick = async (event: Event) => {
    if (this.href || this.download) return;
    event.preventDefault();
    event.stopPropagation();
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
      font-size: 16px;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.5;
    }
    :host([loading]) {
      cursor: wait;
    }
    
    u-spinner {
      font-size: inherit;
    }

    u-icon {
      color: var(--sl-color-gray-600);
      font-size: inherit;
    }
    u-icon:hover {
      color: var(--sl-color-primary-600);
    }
    
  `;

}
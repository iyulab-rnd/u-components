import { css, html, nothing } from "lit";
import { customElement, property, queryAll } from "lit/decorators.js";

import { USelectInputModel, type USelectOption } from "./USelectInput.model";
import { UBaseInput } from "../input-parts/UBaseInput";
import { msg } from "@lit/localize";

@customElement('u-select-input')
export class USelectInput extends UBaseInput implements USelectInputModel {

  @queryAll('.option') optionEl!: NodeListOf<HTMLDivElement>;

  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) placeholder?: string;
  @property({ type: Array }) options?: string[] | USelectOption[];
  @property({ type: String }) default?: string;
  @property({ type: String }) display?: string;
  @property({ type: String, reflect: true }) value?: string;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if (changedProperties.has('default') && this.default) {
      this.value = this.default;
    }
    if (changedProperties.has('open') && this.open) {
      this.open === true ? this.showPopover() : this.hidePopover();
    }
  }

  render() {
    return html`
      <u-input-container>
        <u-input-border>
          <div class="container" @click=${() => this.open = !this.open}>
            <slot name="prefix"></slot>
            <div class="value">${this.display || this.value || this.placeholder}</div>
            <u-icon type="system" name="arrow-down"></u-icon>
          </div>
          <div class="popover">
            ${this.renderNoneOption()}
            ${this.renderOption()}
          </div>
        </u-input-border>
      </u-input-container>
    `;
  }

  public async validate() {
    if (this.required && !this.value) {
      return this.setInvalid(msg('이 입력란은 필수입니다.'));
    } else {
      return this.setValid();
    }
  }

  private renderNoneOption() {
    if (this.required) return nothing;
    return html`
      <div class="option" tabindex="0" data-value=""
        @click=${() => this.onSelect('')}
        @keydown=${(e:any) => this.handleOptionKeyEvent(e, '')}>
        None
      </div>
    `;
  }

  private renderOption() {
    return this.options?.map((option) => {
      const value = typeof option === 'string' ? option : option.value;
      return html`
        <div class="option" tabindex="0" data-value=${value}
          @click=${() => this.onSelect(option)}
          @keydown=${(e:any) => this.handleOptionKeyEvent(e, option)}>
          ${this.renderOptionItem(option)}
        </div>
    `});
  }

  private renderOptionItem(option: string | USelectOption) {
    if (typeof option === 'string') {
      return option;
    } else {
      return html`
        ${option.icon ? html`<u-icon .name="${option.icon}"></u-icon>` : nothing }
        ${option.display || option.value}
      `;
    }
  }

  private onSelect = (option: string | USelectOption) => {
    if(typeof option === 'string') {
      this.value = option;
    } else {
      this.display = option.display;
      this.value = option.value;
    }
    this.open = false;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }

  public showPopover = () => {
    document.addEventListener('mousedown', this.handlePopoverMouseEvent);
    document.addEventListener('keydown', this.handlePopoverKeyEvent);
    if(this.value) {
      this.optionEl.forEach((el) => {
        const isSelected = el.getAttribute('data-value') === this.value;
        isSelected ? el.focus() : el.blur();
      });
    } else if(!this.required && !this.value) {
      this.optionEl[0].focus();
    }
  }

  public hidePopover = () => {
    document.removeEventListener('mousedown', this.handlePopoverMouseEvent);
    document.removeEventListener('keydown', this.handlePopoverKeyEvent);
  }

  private handlePopoverMouseEvent = (event: MouseEvent) => {
    if (event.composedPath().includes(this)) return;
    this.open = false;
  }

  private handlePopoverKeyEvent = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.open = false;
    }
  }

  private handleOptionKeyEvent = (event: KeyboardEvent, option: string | USelectOption) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = (target.nextElementSibling || this.optionEl[0]) as HTMLDivElement;
      next.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const prev = (target.previousElementSibling || this.optionEl[this.optionEl.length - 1]) as HTMLDivElement;
      prev.focus();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      this.onSelect(option);
    }
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;

      font-size: 14px;
      --vertical-padding: 5px;
      --option-limit: 5;
    }
    :host slot::slotted(*) {
      font-size: inherit;
    }
    :host u-input-border {
      padding: var(--vertical-padding) 10px;
    }
    :host([open]) .popover {
      display: block;
    }
    :host([open]) u-input-border {
      border: 2px solid var(--sl-color-primary-500);
      padding: calc(var(--vertical-padding) - 1px) 10px;
      border-radius: 4px 4px 0 0;
      border-bottom: none;
    }
    :host([open]) .container u-icon {
      transform: rotate(-180deg);
    }
    :host([value=""]) .container .value,
    :host(:not([value])) .container .value {
      color: var(--sl-color-gray-600);
    }

    .container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      font-size: inherit;
      height: 1.5em;
      cursor: pointer;

      u-icon {
        font-size: inherit;
        transition: transform 0.2s ease;
      }
    }

    .popover {
      display: none;
      position: absolute;
      z-index: 100;
      overflow-y: auto;
      width: calc(100% + 3.5px);
      max-height: calc(var(--option-limit) * (1.5em + 5px));
      top: 100%;
      left: -2px;
      background: var(--sl-color-neutral-0);
      border: 2px solid var(--sl-color-primary-500);
      border-top: none;
      box-sizing: border-box;
      font-size: inherit;
      line-height: 1.5;

      .option {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        outline: none;
        padding: 2px 10px;
        box-sizing: border-box;
        font-size: inherit;
        line-height: 1.5;
        cursor: pointer;

        u-icon {
          font-size: inherit;
        }
      }
      .option:hover {
        background: var(--sl-color-gray-100);
      }
      .option:focus {
        background: var(--sl-color-primary-600);
        color: var(--sl-color-neutral-0);
      }
    }
    .popover::-webkit-scrollbar {
      width: 5px;
    }
    .popover::-webkit-scrollbar-thumb {
      background: var(--sl-color-gray-200);
    }
    .popover::-webkit-scrollbar-track {
      background: transparent;
    }
  `;
}
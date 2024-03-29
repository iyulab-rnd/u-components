import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('u-input-option')
export class UInputOption extends LitElement {
  
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) value?: string;
  @property({ type: Array }) options?: string[];

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mousedown', this.handleMousedownEvent);
    document.addEventListener('keydown', this.handleKeydownEvent);
  }

  disconnectedCallback() {
    document.removeEventListener('mousedown', this.handleMousedownEvent);
    document.removeEventListener('keydown', this.handleKeydownEvent);
    super.disconnectedCallback();
  }

  protected async firstUpdated(changedProperties: any) {
    super.firstUpdated(changedProperties);
    await this.updateComplete;
  }

  render() {
    return html`
      <div class="container" @click=${() => this.open = !this.open}>
        <div class="value">${this.value}</div>
        <u-icon name="chevron-down"></u-icon>
      </div>
      <div class="popover">
        ${this.options?.map(option => html`
          <div class="option" @click=${() => this.onSelect(option)}>
            ${option}
          </div>
        `)}
      </div>
    `;
  }

  private handleMousedownEvent = (event: MouseEvent) => {
    if (event.composedPath().includes(this)) return;
    this.open = false;
  }

  private handleKeydownEvent = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.open = false;
    }
  }

  private onSelect(option: string) {
    this.value = option;
    this.open = false;
    this.dispatchEvent(new CustomEvent('change', { detail: option }));
  }

  static styles = css`
    :host {
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;
      font-size: 12px;
      line-height: 1.5;

      --option-limit: 5;
    }
    :host([open]) .popover {
      display: block;
    }

    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      padding: 0px 5px;
      background-color: var(--sl-color-gray-200);
      box-sizing: border-box;
    }

    .popover {
      display: none;
      position: absolute;
      overflow-y: auto;
      width: 100%;
      height: calc(var(--option-limit) * (1.5em + 10px));
      top: 100%;
      left: 0;
      background: white;
      border: 1px solid #ccc;
      box-sizing: border-box;
      z-index: 100;

      .option {
        padding: 5px;
        box-sizing: border-box;
      }
      .option:hover {
        background: #f0f0f0;
      }
    }
    .popover::-webkit-scrollbar {
      width: 5px;
    }
    .popover::-webkit-scrollbar-thumb {
      background: #ccc;
    }
  `;
}
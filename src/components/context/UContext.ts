import { LitElement, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * @example
 * export class MyElement extends UContext {
 *  render() {
  *  return html`
  *    <div>Hello</div>
  *  `;
 *  }
 * }
 */
@customElement("u-context")
export class UContext extends LitElement {
  
  @property({ type: Boolean, reflect: true }) open = false;
  // @property({ type: Number }) posX = 0;
  // @property({ type: Number }) posY = 0;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('contextmenu', this.handleContextMenu);
  }

  disconnectedCallback() {
    document.removeEventListener('contextmenu', this.handleContextMenu);
    super.disconnectedCallback();
  }

  private handleContextMenu = (event: MouseEvent) => {
    event.preventDefault(); // 기본 컨텍스트 메뉴를 방지
    this.style.top = `${event.clientX}px`;
    this.style.left = `${event.clientY}px`;
    this.open = true;
  };

  protected async showAsync() {
    document.body.appendChild(this);
    this.open = true;
    await this.updateComplete;
  }

  protected async hideAsync(event: MouseEvent) {
    if(this.open && !this.contains(event.target as Node)) {
      this.open = false;
      await this.updateComplete;
    }
  }

  protected async disposeAsync() {
    this.remove();
    await this.updateComplete;
  }

  static styles = css`
    :host {
      display: none;
      position: fixed;
      z-index: 1000;
      pointer-events: none;
    }
    :host([open]) {
      display: block;
      pointer-events: all;
    }
  `;
}
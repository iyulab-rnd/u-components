import { html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

import { UFlyout, UFlyoutPosition } from "../flyouts";
import { SearchColumn } from "./TableElement";

@customElement("table-sort-menu")
export class TableSortMenu extends UFlyout {
  keepHover: boolean = true;
  position: UFlyoutPosition = 'BottomRight';

  @property({ type: String })
  name?: string;

  @property({ type: String })
  orderby?: 'asc' | 'desc';

  render() {
    return html`
      <div class="container">
        <div class="row ${this.orderby === undefined ? 'selected' : ''}" 
          @click=${() => this.handleSortClick()}>
          None
        </div>
        <div class="row ${this.orderby === 'asc' ? 'selected' : ''}"
          @click=${() => this.handleSortClick("asc")}>
          Ascending
        </div>
        <div class="row ${this.orderby === 'desc' ? 'selected' : ''}"
          @click=${() => this.handleSortClick("desc")}>
          Descending
        </div>
      </div>
    `;
  }

  public async showSortAsync(event: MouseEvent, search?: SearchColumn) {
    this.name = search?.name;
    this.orderby = search?.orderby;
    await this.updateComplete;
    this.toggleAsync(event);
  }

  private async handleSortClick(orderby?: 'asc' | 'desc') {
    this.dispatchEvent(new CustomEvent("orderby", {
      detail: {
        name: this.name,
        orderby: orderby
      },
    }));
    this.hideClickAsync();
  }

  static styles = css`
      .container {
        margin-top: 13px;
        width: 80px;
        background-color: var(--surface-card);
        border: 1px solid var(--ui-outline);
      }

      .row {
        text-align: right;
        padding: 5px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background-color: var(--ui-subtle-hover);
        }

        &.selected {
          background-color: var(--ui-subtle-active);
        }
      }
    `;
}
import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { convertReact } from "../../utils";
import '../icon/UIcon'; 
import type { DataViewColumnDefinition, UDataViewModel } from "./UDataView.model";
import styles from './UDataView.scss?inline';

@customElement("u-data-view")
export class UDataViewElement extends LitElement implements UDataViewModel {
  @property({ type: Array }) data: any[] = [];
  @property({ type: String }) layout: "list" | "grid" | "table" = "grid";
  @property({ type: Object }) renderItem?: (item: any) => HTMLElement;
  @property({ type: Object }) renderImage?: (item: any) => HTMLElement;
  @property({ type: Object }) renderFields?: (item: any) => HTMLElement;
  @property({ type: Number }) itemsPerPage?: number;
  @property({ type: String }) imageField: string = 'image';
  @property({ type: String }) itemMargin: string = '1rem';
  @property({ type: String }) minItemWidth: string = '250px';
  @property({ type: Array }) columns?: DataViewColumnDefinition[];

  @property({ type: Object }) onItemSelect?: (item: any) => void;
  @property({ type: Object }) onItemDoubleClick?: (item: any) => void;

  @state() private selectedItem: any = null;
  @state() private currentLayout: "list" | "grid" | "table" = "grid";
  @state() private loading: boolean = true;
  @state() private imageLoadErrors: Set<string> = new Set();

  connectedCallback() {
    super.connectedCallback();
    // 데이터 로딩 시뮬레이션
    setTimeout(() => {
      this.loading = false;
      this.requestUpdate();
    }, 2000); // 2초 후 로딩 완료
  }

  private handleImageError(item: any) {
    this.imageLoadErrors.add(item[this.imageField]);
    this.requestUpdate();
  }

  private renderTable() {
    const columns = this.columns || this.getDefaultColumns();
    return html`
      <table class="default-table">
        <thead>
          <tr>
            <th>Image</th>
            ${columns.map(column => html`<th>${this.getDisplayName(column)}</th>`)}
          </tr>
        </thead>
        <tbody>
          ${this.loading 
            ? Array(5).fill(0).map(() => html`
                <tr>
                  <td><u-skeleton effect="sheen" width="50px" height="50px"></u-skeleton></td>
                  ${columns.map(() => html`
                    <td><u-skeleton effect="sheen" width="80%" height="1em"></u-skeleton></td>
                  `)}
                </tr>
              `)
            : this.data?.map(item => html`
                <tr class="default-item ${this.selectedItem === item ? 'selected' : ''}"
                    @click=${() => this.handleItemClick(item)}
                    @dblclick=${() => this.handleItemDoubleClick(item)}>
                  <td class="image-cell">
                    ${this.defaultRenderImage(item)}
                  </td>
                  ${columns.map(column => html`<td>${item[column.name]}</td>`)}
                </tr>
              `)
          }
        </tbody>
      </table>
    `;
  }

  private getDefaultColumns(): DataViewColumnDefinition[] {
    if (this.data && this.data.length > 0) {
      return Object.keys(this.data[0])
        .filter(key => key !== this.imageField)
        .map(key => ({ name: key }));
    }
    return [];
  }

  private getDisplayName(column: DataViewColumnDefinition): string {
    return column.display || this.toPascalCase(column.name);
  }

  private toPascalCase(str: string): string {
    const words = str.split(/(?=[A-Z])|\s+|[-_]+/);
    
    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  private defaultRenderFields(item: any) {
    const columns = this.columns || this.getDefaultColumns();
    return html`
      <div class="default-fields">
        ${columns.map(column => html`
          <div class="field">
            <strong>${this.getDisplayName(column)}:</strong>
            ${this.loading 
              ? html`<u-skeleton effect="sheen" width="60%" height="1em" style="margin-left: 0.5em;"></u-skeleton>`
              : html`<span style="margin-left: 0.5em;">${item[column.name]}</span>`}
          </div>
        `)}
      </div>
    `;
  }

  private defaultRenderImage(item: any) {
    if (this.loading || this.imageLoadErrors.has(item[this.imageField])) {
      return html`<u-skeleton effect="sheen" width="100%" height="200px" style="margin-bottom: 1em;"></u-skeleton>`;
    }
    return html`
      <img 
        src=${item[this.imageField]} 
        alt="Item image" 
        class="default-image" 
        @error=${() => this.handleImageError(item)}
        style="margin-bottom: 1em;"
      />
    `;
  }

  protected render() {
    return html`
      <div class="u-data-view-container">
        <div class="layout-selector">
            <u-icon-button type="system" name="grid" size="24px"
              @click=${() => this.setLayout('grid')}
              color=${this.currentLayout === 'grid' ? `var(--sl-color-primary-600)` : `var(--sl-color-neutral-600)`}
            >
            </u-icon-button>
            <u-icon-button type="system" name="list-ul" size="24px"
              @click=${() => this.setLayout('list')}
              color=${this.currentLayout === 'list' ? `var(--sl-color-primary-600)` : `var(--sl-color-neutral-600)`}
            >
            </u-icon-button>
            <u-icon-button type="system" name="table" size="24px"
              @click=${() => this.setLayout('table')}
              color=${this.currentLayout === 'table' ? `var(--sl-color-primary-600)` : `var(--sl-color-neutral-600)`}
            >
            </u-icon-button>
        </div>
        <div class="u-data-view ${this.currentLayout}" style="--item-margin: ${this.itemMargin}; --min-item-width: ${this.minItemWidth};">
          ${this.currentLayout === 'table' ? this.renderTable() : this.renderItems()}
        </div>
      </div>
    `;
  }

  private renderItems() {
    if (this.loading) {
      return Array(5).fill(0).map(() => html`
        <div class="default-item" style="padding: 1em; border: 1px solid #eee; border-radius: 4px;">
          <u-skeleton effect="sheen" width="100%" height="200px" style="margin-bottom: 1em;"></u-skeleton>
          <div class="default-fields">
            ${Array(3).fill(0).map(() => html`
              <div class="field" style="margin-bottom: 0.5em;">
                <u-skeleton effect="sheen" width="30%" height="1em" style="margin-right: 0.5em;"></u-skeleton>
                <u-skeleton effect="sheen" width="60%" height="1em"></u-skeleton>
              </div>
            `)}
          </div>
        </div>
      `);
    }

    return this.data?.map((item) =>
      this.renderItem
        ? this.renderItem(item)
        : html`
            <div class="default-item ${this.selectedItem === item ? 'selected' : ''}"
                 @click=${() => this.handleItemClick(item)}
                 @dblclick=${() => this.handleItemDoubleClick(item)}>
              ${this.renderImage ? this.renderImage(item) : this.defaultRenderImage(item)}
              ${this.renderFields ? this.renderFields(item) : this.defaultRenderFields(item)}
            </div>
          `
    );
  }

  protected setLayout(newLayout: "list" | "grid" | "table") {
    this.currentLayout = newLayout;
    this.requestUpdate();
  }

  private handleItemClick(item: any) {
    this.selectedItem = item;
    if (this.onItemSelect) {
      this.onItemSelect(item);
    }
    this.requestUpdate();
  }

  private handleItemDoubleClick(item: any) {
    if (this.onItemDoubleClick) {
      this.onItemDoubleClick(item);
    }
  }

  static styles = css`${unsafeCSS(styles)}`;
}

export const UDataView = convertReact({
  elementClass: UDataViewElement,
  tagName: "u-data-view",
});
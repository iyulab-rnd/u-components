import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { UFileItemModel, type FileMetaValue } from './UFileItem.model';
import { FileTypeImage } from "./UFileItem.resource";
import { UFileController } from "./UFileController";

@customElement('u-file-item')
export class UFileItem extends LitElement implements UFileItemModel {

  @state() formattedSize?: string;

  /** Used when upload system **/
  @state() progress?: number;
  @state() error?: string;

  @property({ type: String }) type?: string;
  @property({ type: String }) name?: string;
  @property({ type: Number }) size?: number;
  @property({ type: Object }) value?: FileMetaValue;

  /** Used when upload system **/
  @property({ type: Object }) file?: File;
  @property({ type: Boolean }) hideButton: boolean = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    if(this.file) {
      UFileController.clear(this.file);
    }
  }

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('file') && this.file) {
      this.type = this.file.type;
      this.name = this.file.name;
      this.size = this.file.size;
      this.uploadFile(this.file);
    }
    if(changedProperties.has('value') && this.value) {
      this.type = this.value.type;
      this.name = this.value.name;
      this.size = this.value.size;
    }
    if(changedProperties.has('size') && this.size) {
      this.formattedSize = this.formatFileSize(this.size);
    }
  }

  render() {
    return html`
      ${this.renderImage()}
      <div class="main">
        <div class="name">${this.name}</div>
        <div class="size">${this.formattedSize}</div>
        ${this.renderProgress()}
      </div>
      ${this.renderButton()}
    `;
  }

  private renderImage() {
    const src = this.error ? FileTypeImage['error'] : this.resolveType();
    return html`<img class="prefix" src=${src} alt='file' />`;
  }

  private renderProgress() {
    if(!this.progress || this.progress >= 1) return nothing;
    return html`
      <div class="progress">
        <progress value=${this.progress} max="1"></progress>
      </div>
    `;
  }

  private renderButton() {
    if(this.error) {
      return html`
        <u-icon class="suffix" type="system" name="refresh"
          @click=${this.retryUpload}
        ></u-icon>
      `;
    } else {
      return html`
        <u-icon class="suffix" type="system" name="minus-square"
          @click=${this.requestRemove}
        ></u-icon>
      `;
    }
  }

  private resolveType() {
    if(this.type?.startsWith('image'))
      return FileTypeImage['image'];
    else if (this.type?.startsWith('audio'))
      return FileTypeImage['audio'];
    else if (this.type?.startsWith('video'))
      return FileTypeImage['video'];
    else if (this.type?.startsWith('application'))
      return FileTypeImage['application'];
    else if (this.type?.startsWith('text'))
      return FileTypeImage['text'];
    else
      return FileTypeImage['default'];
  }

  private async uploadFile(file: File) {
    try {
      this.error = '';
      const response = await UFileController.upload(file, (event) => {
        this.progress = event.loaded / event.total;
      });
      this.dispatchEvent(new CustomEvent('upload', { detail: response }));
    } catch (error: any) {
      this.error = error;
    }
  }

  private retryUpload = () => {
    if(!this.file) return;
    this.error = '';
    this.uploadFile(this.file);
  }

  private requestRemove = async () => {
    if(this.file) {
      await UFileController.clear(this.file);
    }
    this.dispatchEvent(new CustomEvent('remove'));
  }

  private formatFileSize(size: number) {
    if (size === 0) return "0 B";
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return `${(size / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      padding: 5px;
      border: 1px solid var(--sl-color-gray-300);
      box-sizing: border-box;
      font-size: 14px;
    }

    .prefix {
      width: 2em;
      height: 2em;
    }

    .main {
      position: relative;
      flex: 1;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto;

      .name {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        line-height: 1.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .size {
        grid-column: 2 / 3;
        grid-row: 1 / 2;
        line-height: 1.5;
        color: var(--sl-color-gray-700);
      }
      .progress {
        grid-column: 1 / 3;
        grid-row: 2 / 3;

        progress {
          width: 100%;
        }
      }
    }

    .suffix {
      font-size: 1.5em;
      cursor: pointer;
    }
    .suffix:hover {
      opacity: 0.4;
    }
  `;
}
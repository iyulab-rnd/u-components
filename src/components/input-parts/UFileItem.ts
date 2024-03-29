import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { API } from "@/services/APIClient";
import type { FileMeta } from "@/data-provider/models";

@customElement('u-file-item')
export class UFileItem extends LitElement {

  @state() progress?: number;

  @property({ type: String }) type?: string;
  @property({ type: String }) name?: string;
  @property({ type: Number }) size?: number;

  @property({ type: Object }) file?: File;
  @property({ type: Object }) value?: FileMeta;

  protected async updated(changedProperties: any) {
    super.updated(changedProperties);
    await this.updateComplete;

    if(changedProperties.has('file') && this.file) {
      this.value = { name: this.file.name, size: this.file.size, type: this.file.type };
      this.uploadFile(this.file);
    }
    if(changedProperties.has('value') && this.value) {
      this.name = this.value.name;
      this.size = this.value.size;
      this.type = this.value.type;
    }
  }

  render() {
    return html`
      <img class="prefix"
        src=${this.resolveType()}
        alt="file"
      />
      <div class="main">
        <span>${this.name}</span>
        ${this.renderProgress()}
      </div>
      <div class="suffix" @click=${this.removeFile}>
        X
      </div>
    `;
  }

  private resolveType() {
    if(this.type === 'image/png') {
      return "png";
    } else if(this.type === 'image/jpeg') {
      return "jpeg";
    } else {
      return "file";
    }
  }

  private renderProgress() {
    if(!this.progress || this.progress >= 1) return nothing;
    return html`
      <progress value=${this.progress} max="1"></progress>
    `;
  }

  private async uploadFile(file: File) {
    const path = await API.uploadFile(file, (event) => {
      if(!event.progress) return;
      this.progress = event.progress;
    });
    this.dispatchEvent(new CustomEvent('upload', { 
      detail: { ...this.value, path }
    }));
  }

  private async removeFile() {
    this.dispatchEvent(new CustomEvent('remove', { 
      detail: this.value
    }));
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 5px;
      border: 1px solid #ccc;
      box-sizing: border-box;
    }

    .prefix {
      width: 32px;
      height: 32px;
    }

    .main {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      flex: 1;
    }

    .suffix {
      width: 32px;
      height: 32px;
      cursor: pointer;
    }
  `;
}
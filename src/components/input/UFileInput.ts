import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { UInputBase } from "./UInputBase";

import type { FileMeta } from "@/data-provider/models/FileSourceModel";

import "../input-parts/UFileItem";

const upload = "M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"

@customElement('u-file-input')
export class UFileInput extends UInputBase {

  @query('input') input!: HTMLInputElement;
  @query('.overlay') overlay!: HTMLElement;
  
  @property({ type: Boolean, reflect: true }) dragover: boolean = false;
  @property({ type: Array }) accept?: string[];
  @property({ type: Array }) files?: File[];
  @property({ type: Array }) value?: FileMeta[];

  render() {
    return html`
      <input type="file" @change=${this.onClick} multiple />
      <u-input-container>
        <u-input-wrapper>
          <div class="dropbox"
            @dragover=${this.onDragOver}
            @dragenter=${this.onDragEnter}
            @dragleave=${this.onDragLeave}
            @drop=${this.onDrop}
          >
            ${this.renderPlaceholder()}
            ${this.renderOvelay()}
            ${this.renderFileUpload()}
            ${this.renderFiles()}
          </div>
        </u-input-wrapper>
      </u-input-container>
    `;
  }

  private renderFileUpload() {
    if(!this.files || this.files.length === 0) return;
    return this.files.map(file => html`
      <u-file-item class="upload"
        .file=${file}
        @upload=${(e: any) => this.onUpload(e)}
      ></u-file-item>
    `);
  }

  private renderFiles() {
    if(!this.value || this.value.length === 0) return;
    return this.value.map(value => html`
      <u-file-item class="file"
        .value=${value}
        @remove=${(e: any) => this.onReomve(e)}
      ></u-file-item>
    `);
  }

  private renderPlaceholder() {
    if(this.value && this.value.length > 0) return;
    if(this.files && this.files.length > 0) return;
    return html`
      <div class="placeholder">
        <svg viewBox="0 0 16 16" width=32 height=32>
          <path d=${upload}></path>
        </svg>
        <div class="text">Drag your files here or</div>
        <div class="text button" @click=${() => this.input.click()}>
          Click to browse your files
        </div>
      </div>
    `;
  }

  private renderOvelay() {
    return html`
      <div class="overlay">
        <svg viewBox="0 0 16 16" width=32 height=32>
          <path d=${upload}></path>
        </svg>
        <div class="text">Drop your files here</div>
      </div>
    `;
  }

  public async validate() {
    return true;
  }

  private async onUpload(event: CustomEvent) {
    const target = event.target as HTMLElement;
    const value = event.detail as FileMeta;
    this.value = [...(this.value || []), value ];
    if(target) target.remove();
  }

  private onReomve(event: CustomEvent) {
    const value = event.detail as FileMeta;
    this.value = this.value?.filter(f => f !== value);
  }

  private async onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  private async onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragover = true;
  }

  private async onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const isNode = event.relatedTarget instanceof Node;
    if(isNode && 
      !this.overlay.contains(event.relatedTarget as Node) &&
      this.overlay === event.target) {
      this.dragover = false;
    }
  }

  private async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.files = Array.from(event.dataTransfer?.files || []);
    this.dragover = false;
  }

  private async onClick(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files) return;
    this.files = Array.from(input.files);
  }

  static styles = css`
    :host {
      display: block;
    }
    :host([dragover]) .dropbox {
      .overlay {
        display: flex;
      }
    }

    input[type="file"] {
      display: none;
    }

    .dropbox {
      position: relative;
      width: 100%;
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
      gap: 10px;
      cursor: default;
    }
    .dropbox::-webkit-scrollbar {
      width: 5px;
    }
    .dropbox::-webkit-scrollbar-thumb {
      background-color: var(--sl-color-gray-200);
    }

    u-file-item {
      width: 100%;
    }
    
    .placeholder {
      position: relative;
      z-index: 1;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;

      .text {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
      .text.button {
        color: var(--sl-color-primary-500);
        cursor: pointer;
      }
      .text.button:hover {
        color: var(--sl-color-primary-600);
        text-decoration: underline;
      }
    }

    .overlay {
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      background-color: var(--sl-color-gray-200);

      .text {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
    }
  `;
}
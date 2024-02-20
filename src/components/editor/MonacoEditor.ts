import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";

import SlCopyButton from "@shoelace-style/shoelace/dist/components/copy-button/copy-button.component.js";
SlCopyButton.define('sl-copy-button');

import "./MonacoWorker";
import * as monaco from "monaco-editor";
import styles from "monaco-editor/min/vs/editor/editor.main.css?inline";

export type EditorTheme = "light" | "dark";

@customElement("monaco-editor")
export class MonacoEditor extends LitElement {
  private container: Ref<HTMLElement> = createRef();
  private editor!: monaco.editor.IStandaloneCodeEditor;
  private observer: MutationObserver = new MutationObserver(() => {
    const theme = document.documentElement.classList.contains("sl-theme-dark") ? "dark" : "light";
    if (this.theme !== theme) this.theme = theme;
  });

  @property({ type: String }) label: string = "Editor";
  @property({ type: String }) theme: EditorTheme = "light";
  @property({ type: String }) code: string = "{}";
  @property({ type: String }) language: string = "json";
  @property({ type: Boolean }) noHeader: boolean = false;
  
  connectedCallback() {
    super.connectedCallback();
    this.theme = document.documentElement.classList.contains("sl-theme-dark") ? "dark" : "light";
    this.observer.observe(document.documentElement, { 
      attributes: true, attributeFilter: ["class"]
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  async firstUpdated(_changedProperties: any) {
    super.firstUpdated(_changedProperties);
    await this.updateComplete;
    
    this.editor = monaco.editor.create(this.container.value!, {
      language: this.language,
      theme: this.theme === "light" ? "vs-light" : "vs-dark",
      automaticLayout: true,
      minimap: { enabled: false },
      lineNumbersMinChars: 2,
      lineDecorationsWidth: 1,
      value: this.code,
    });

    this.editor.onDidChangeModelContent(() => {
      const value = this.editor.getValue();
      try {
        const json = JSON.parse(value);
        this.dispatchEvent(new CustomEvent("change", { 
          detail: json
        }));
      } catch(ex) {
        // console.error(ex);
      }
    });
  }

  async updated(_changedProperties: any) {
    super.updated(_changedProperties);
    await this.updateComplete;

    if (_changedProperties.has("code")
      && this.code !== this.editor.getValue()
      && !this.editor.hasWidgetFocus()) {
        this.editor.setValue(this.code);
    }

    if (_changedProperties.has("theme") && this.editor) {
      this.editor.updateOptions({
        theme: this.theme === "light" ? "vs-light" : "vs-dark",
      });
    }
  }
  
  render() {
    return html`
      ${this.renderHeader()}
      <div class="editor">
        <main ${ref(this.container)}
          style="width:100%; height:100%;" 
        ></main>
      </div>
    `;
  }

  private renderHeader() {
    if (this.noHeader) return html``;
    return html`
      <div class="header">
        <slot name="header-preffix"></slot>
        <div class="title">${this.label}</div>
        <div class="flex"></div>
        <slot name="header-actions"></slot>
        <sl-copy-button value=${this.code}></sl-copy-button>
      </div>
    `;
  }

  static styles = [
    unsafeCSS(styles),
    css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 24px;
      gap: 4px;
      padding: 4px;

      .title {
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .flex {
        flex: 1;
      }
    }

    .editor {
      width: 100%;
      height: calc(100% - 24px);
      overflow: hidden;
    }
  `];
  
}

import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { IEntityField, IEntityHandler, IResultValue } from "../../data";
import { IDialogContent } from '../../dialogs/IDialogContent';

// import baseStyle from "../../../../styles/tailwind.css?inline";

export interface IEntityEditFormProps {
  title?: string;
  handler: IEntityHandler;
}

@customElement("entity-edit-form")
export class EntityEditForm
  extends LitElement
  implements IEntityEditFormProps, IDialogContent
{
  // static styles = [unsafeCSS(baseStyle)];

  handler: IEntityHandler;
  fields: any;

  @property() title: string = "";

  @state() errors?: string[];
  @state() isReady: boolean = false;
  @state() isBusy: boolean = false;

  constructor(props: IEntityEditFormProps) {
    super();

    if (props.title) {
      this.title = props.title;
    }
    this.handler = props.handler;

    this.init();
  }

  async init() {
    await this.handler.readyAsync();
    if (this.title.isNullOrEmpty() != true) {
      this.title = this.handler.label ?? "";
    }
    this.fields = await this.handler.getInputFieldsAsync();

    this.isReady = true;
  }

  render() {
    if (!this.isReady || this.fields == null) {
      return html`<busy-indicator></busy-indicator>`;
    }

    return html`
      <div id="form">
        <!-- input fields -->
        ${this.fields.map(
          (f: IEntityField) => {
            return html`
            <div class="flex flex-col space-y-1">
              <u-input
                .entityField=${f}
                .context=${this.handler.data}
              />
            </div>
          `;
          }
        )}

        <!-- errors -->
        ${this.renderErrors()}
      </div>
      <u-buttons right>
        <u-button accent @click=${this.ok}>확인</u-button>
        <u-button @click=${this.cancel}>취소</u-button>
      </u-buttons>

      <busy-indicator .show=${this.isBusy}></busy-indicator>
    `;
  }

  renderErrors() {
    if (!this.errors || this.errors.length === 0) {
      return html``; // 오류가 없으면 아무것도 표시하지 않음
    }

    return html`
      <ul class="list-disc pl-5 mt-2">
        ${this.errors.map(
          (error) => html` <li class="text-red-500 text-sm">${error}</li>`
        )}
      </ul>
    `;
  }

  validation() {
    const validationResult = this.handler.validate();
    if (validationResult.success == false) {
      this.errors = validationResult.errors;
      return false;
    }

    return true;
  }

  async ok() {
    if (this.validation() == false) return;

    this.isBusy = true;
    try {
      const r = await this.handler.saveAsync();
      if (r.success) {
        this.close({ success: true, value: this.handler.data });
      } else {
        this.errors = r.errors;
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.isBusy = false;
    }
  }

  cancel() {
    this.close({ success: false });
  }

  close(result: IResultValue) {
    this.dispatchEvent(
      new CustomEvent("close", {
        detail: result,
        bubbles: true,
        composed: true,
      })
    );
  }
}
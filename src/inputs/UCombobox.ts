import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

export type ComboboxSelectedItemType = { text: string, value: any };

export interface IComboboxContext {
  source?: any[];
  value?: any;
  displayPath?: string;
  valuePath?: string;
}

export class ComboboxContext implements IComboboxContext {

  source: any[] = [];

  value: any = null;
  selectedItem?: any;
  displayPath?: string;
  valuePath?: string;
  listType: boolean = false; // 키입력을 막고 선택만 가능하게 합니다. ! 구현필요
  
  constructor(context: IComboboxContext) {
    
    // Reflections.cloneFrom(context, this);
  }
}

@customElement('u-combobox')
export class UCombobox extends LitElement {

  static styles = [
    css`
    :host {
      display: block;
    }

    fast-combobox {
      min-width: 80px;
      width: 100%;
    }

    .label {
      display: block;
      padding: 4px 0;
    }
    `
  ];

  @property({type: Array})
  source: Array<any> = [];

  @property({type: Object})
  context?: ComboboxContext;

  @property({type: String})
  label = "";

  @property({type: String})
  hint: string | null = null;

  @property({type: Object})
  value: any;

  @property({type: Object})
  dataContext: any = null;

  @property({type: String})
  path: string | null = null;
  
  onChangedContext() {
    if (this.context) {
      if (this.context.source) {
        this.source = this.context.source;
      }
      
      if (this.context.value) {
        this.value = this.context.value;
      }
    }
  }
  
  protected override updated(changedProperties: any) {
    super.updated(changedProperties);

    if (changedProperties.has('dataContext')) {

      if (this.dataContext && this.path) {
        const v = this.dataContext[this.path];
        if (v != null && v != undefined) this.value = v;
        
        if (this.value != v) {
          // this.value = undefined;
          this.value = "Text";
          // this.requestUpdate();          
        }
      }
    } else if (changedProperties.has('context')) {
      this.onChangedContext();
    }
  }

  getCurrentValue() {
    if (this.context) {
      if (this.context.valuePath && this.context.displayPath) {
        const item = this.context.source?.find((item: any) => item[this.context!.valuePath!] == this.value);
        if (item) {
          return item[this.context.displayPath];
        }
      }
    }

    return this.value;
  }

  render() {
    
    return html`
    ${this.label ? html`<label class="label">${this.label}</label>` : null}
    <fast-combobox 
      autocomplete="both" 
      @change=${this.changeValue} 
      placeholder=${this.hint ?? this.label} 
      value=${this.value} 
      current-value=${this.getCurrentValue()}>

      ${this.source?.map((item: any) => {
        const value = this.context != null && this.context.valuePath ? item[this.context.valuePath] : item;
        const display = this.context != null && this.context.displayPath ? item[this.context.displayPath] : item;
        const selected = this.value == value;

        return html`<fast-option ?selected=${selected} value=${value} .dataContext=${item}>${display}</fast-option>`;
      })}
    </fast-combobox>`;
  }

  changeValue(e: any) {
    
    this.value = e.target.currentValue;

    const option = e.target.options[e.target.selectedIndex];
    const item = option['dataContext'];
    const value = option.value;
    
    if (this.context) {
      this.context.selectedItem = item;
      this.context.value = value;
    } 
    
    if (this.dataContext && this.path) {
      this.dataContext[this.path] = value;
    }

    // ComboboxSelectedItemType
    this.dispatchEvent(new CustomEvent('changed', { detail: {
      text: e.target.currentValue,
      value: value
    }, bubbles: true, composed: true }));
  }
}

import { LitElement } from "lit";
import { IDialogContent } from "./IDialogContent";
import { IResultValue } from "../data";

export abstract class DialogContentBase extends LitElement implements IDialogContent {
  
  resolve?: (value: IResultValue | PromiseLike<IResultValue>) => void;
  reject?: (reason?: any) => void;
  
  dialogTask(
    resolve?: (value: IResultValue | PromiseLike<IResultValue>) => void,
    reject?: (reason?: any) => void  
  ) {
    this.resolve = resolve;
    this.reject = reject;
  }

  abstract getResultValue(): any;

  ok() {
    console.log('ok');
    
    const result: IResultValue = {
      success: true,
      value: this.getResultValue(),
    };
    
    if (this.resolve) {
      this.resolve(result);
    }
  }

  cancel() {
    const result: IResultValue = {
      success: false,
      value: null,
    };
    
    if (this.resolve) {
      this.resolve(result);
    }
  }
}
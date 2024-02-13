import { IResultValue } from "../data";

export interface IDialogContent extends EventTarget {
  title?: string;

  dialogTask?: (resolve: (value: IResultValue | PromiseLike<IResultValue>) => void, reject: (reason?: any) => void) => void;

  ok: () => void;
  cancel: () => void;
}

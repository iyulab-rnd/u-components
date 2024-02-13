export interface UDialogResult {
  success: boolean;
  value: any;
}

export interface UDialogContentModel{
  title?: string;
  dialogTask?: (
    resolve: (value: UDialogResult | PromiseLike<UDialogResult>) => void, 
    reject: (reason?: any) => void
  ) => void;

  ok: () => void;
  cancel: () => void;
}
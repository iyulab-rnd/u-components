export interface IResultTValue<T> {
  success: boolean;
  value?: T;
  errors?: string[];
  exception?: any;
}

export interface IResultValue {
  success: boolean;
  value?: any;
  errors?: string[];
  exception?: any;
}

export class ResultTValue<T> {
  success: boolean;
  value?: T;
  errors?: string[];
  exception?: any;

  constructor(props: IResultTValue<T>) {
    this.success = props.success;
    this.value = props.value;
    this.errors = props.errors;
    this.exception = props.exception;
  }
}
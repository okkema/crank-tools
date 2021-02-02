import { IFormHint, IFormValidator } from ".";

export interface IFormBase<T> {
  value?: T;
  key: string;
  label?: string;
  hint?: IFormHint;
  required?: boolean;
  controlType: 'textbox' | 'select';
  type: 'text' | 'email' | 'tel' | 'password';
  options?: {key: string; value: string}[];
  validators?: IFormValidator[];
}

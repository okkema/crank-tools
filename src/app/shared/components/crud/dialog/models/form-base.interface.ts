export interface IFormBase<T> {
  value?: T;
  key: string;
  label?: string;
  hint?: string;
  required?: boolean;
  controlType: 'textbox' | 'select';
  type: 'text' | 'email' | 'tel' | 'password';
  options?: {key: string; value: string}[];
  validators?: any[];
}

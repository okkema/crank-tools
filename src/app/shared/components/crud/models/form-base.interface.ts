export interface IFormBase<T> {
  value?: T;
  key: string;
  label?: string;
  required?: boolean;
  controlType: 'textbox' | 'select';
  type: 'text' | 'email' | 'tel';
  options?: {key: string, value: string}[];
  validators?: any[];
}
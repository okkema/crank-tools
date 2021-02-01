import { Observable } from "rxjs";
import { ICrudColumn } from ".";
import { IFormBase } from "../../dialog/models";

export interface ICrudTable {
  icon: string;
  title: string;
  columns: ICrudColumn[];
  showActions: boolean;
  controls: IFormBase<any>[];
  create: (value) => Observable<any>;
  read: (value?) => Observable<any>;
  update: (value) => Observable<any>;
  delete: (value) => Observable<any>;
}

import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { ICrudColumn } from ".";
import { IFormBase } from "./form-base.interface";

export interface ICrudTable {
  title: string;
  columns: ICrudColumn[];
  showActions: boolean;
  controls: IFormBase<any>[];
  create: Function;
  read: Function;
  update: Function;
  delete: Function;
}

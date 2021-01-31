import { FormGroup } from "@angular/forms";
import { IFormBase } from "./form-base.interface";

export interface ICrudDialogData {
    controls: IFormBase<any>[];
    create: Function;
    update: Function;
    delete: Function;
    row?: any;
}

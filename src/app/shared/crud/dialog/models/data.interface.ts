import { Observable } from 'rxjs';
import { IFormBase } from './form-base.interface';

export interface ICrudDialogData {
    controls: IFormBase<any>[];
    create: (value) => Observable<any>;
    update: (value) => Observable<any>;
    delete: (value) => Observable<any>;
    row?: any;
}

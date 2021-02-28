import { Observable } from 'rxjs';
import { IStaff } from '../models';

export interface IStaffService {
    create(staff: IStaff): Observable<IStaff>;
    read(staff: IStaff): Observable<IStaff>;
    readAll(): Observable<IStaff[]>;
    update(staff: IStaff): Observable<IStaff>;
    updateAll(staff: IStaff[]): Observable<IStaff[]>;
    delete(staff: IStaff): Observable<IStaff>;
}

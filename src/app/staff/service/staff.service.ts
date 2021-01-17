import { Injectable } from '@angular/core';
import { IStaffService } from './staff.service.interface';
import { IStaff, StaffMetadata } from '../models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements IStaffService{

  constructor(
    private dbService: NgxIndexedDBService
  ) { }

  create(staff: IStaff): Observable<IStaff> {
    return this.dbService.add(StaffMetadata.store, staff)
      .pipe(map(id => {
        staff.id = id;
        return staff;
      }));
  }

  read(staff: IStaff): Observable<IStaff> {
    return this.dbService.getByID(StaffMetadata.store, staff.id);
  }

  readAll(): Observable<IStaff[]> {
    return this.dbService.getAll(StaffMetadata.store);
  }

  update(staff: IStaff): Observable<IStaff> {
    return this.dbService.update(StaffMetadata.store, staff, staff.id)
      .pipe(map(x => {
        return x?.[0];
      }));
  }
  
  delete(staff: IStaff): Observable<IStaff> {
    return this.dbService.delete(StaffMetadata.store, staff.id)
      .pipe(map(x => {
        return staff
      }));
  }

}

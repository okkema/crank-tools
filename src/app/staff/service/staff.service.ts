import { Injectable } from '@angular/core';
import { IStaffService } from './staff.service.interface';
import { IStaff, Staff, StaffMetadata } from '../models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements IStaffService{

  constructor(
    private dbService: NgxIndexedDBService
  ) { }

  create(staff: IStaff): Observable<IStaff> {
    staff = new Staff(staff);
    return this.dbService.add(StaffMetadata.store, staff)
      .pipe(map(id => {
        staff.id = id;
        return staff;
      }));
  }

  read(staff: IStaff): Observable<IStaff> {
    return this.dbService.getByID(StaffMetadata.store, staff.id)
      .pipe(map(staff => new Staff(staff)));
  }

  readAll(): Observable<IStaff[]> {
    return this.dbService.getAll(StaffMetadata.store)
      .pipe(map(staff => staff.map(x => new Staff(x))));
  }

  update(staff: IStaff): Observable<IStaff> {
    staff = new Staff(staff);
    return this.dbService.update(StaffMetadata.store, staff)
      .pipe(map(x => {
        return staff;
      }));
  }
  
  delete(staff: IStaff): Observable<IStaff> {
    return this.dbService.delete(StaffMetadata.store, staff.id)
      .pipe(map(x => {
        return staff
      }));
  }

}

import { Injectable } from '@angular/core';
import { IStaffService } from './staff.service.interface';
import { IStaff, Staff, STAFF_METADATA } from '../models';
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
    return this.dbService.add(STAFF_METADATA.store, staff)
      .pipe(map(id => {
        staff.id = id;
        return staff;
      }));
  }

  read(staff: IStaff): Observable<IStaff> {
    return this.dbService.getByID(STAFF_METADATA.store, staff.id)
      .pipe(map(x => new Staff(x)));
  }

  readAll(): Observable<IStaff[]> {
    return this.dbService.getAll(STAFF_METADATA.store)
      .pipe(map(staff => staff.map(x => new Staff(x))));
  }

  update(staff: IStaff): Observable<IStaff> {
    staff = new Staff(staff);
    return this.dbService.update(STAFF_METADATA.store, staff)
      .pipe(map(x => staff));
  }

  delete(staff: IStaff): Observable<IStaff> {
    return this.dbService.delete(STAFF_METADATA.store, staff.id)
      .pipe(map(x => staff));
  }

}

import { Injectable } from '@angular/core';
import { IStaffService } from './staff.service.interface';
import { IStaff, Staff, STAFF_METADATA, staffSchema } from '../models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ICloudSync } from '../../cloud/models';

@Injectable({
  providedIn: 'root'
})
export class StaffService implements IStaffService, ICloudSync<IStaff> {

  filename = 'staff.json';
  schema = staffSchema.array;

  constructor(
    private dbService: NgxIndexedDBService
    ) { }

  dump = () => this.readAll().toPromise();

  load = (staff: IStaff[]) => this.updateAll(staff).pipe(map(x => true)).toPromise();

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

  updateAll(staff: IStaff[]): Observable<IStaff[]> {
    return this.dbService.clear(STAFF_METADATA.store)
      .pipe(map(x => staff.map(s => this.update(s))))
      .pipe(mergeMap(z => forkJoin(z)));
  }

  delete(staff: IStaff): Observable<IStaff> {
    return this.dbService.delete(STAFF_METADATA.store, staff.id)
      .pipe(map(x => staff));
  }

}

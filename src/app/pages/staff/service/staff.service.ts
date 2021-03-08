import { Injectable } from '@angular/core';
import { IStaff, Staff, STAFF_METADATA, staffSchema } from '../models';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICloudSync } from '../../settings/cloud/sync';
import { CrudService } from '../../../components/crud/service';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends CrudService<IStaff> implements ICloudSync<IStaff> {

  filename = 'staff.json';
  schema = staffSchema.array;

  constructor(
    protected dbService: NgxIndexedDBService
  ) {
    super(dbService, STAFF_METADATA.store);
  }

  export = () => this.readAll().toPromise();
  import = (staff: IStaff[]) => this.updateAll(staff).pipe(map(x => true)).toPromise();

  create(staff: IStaff): Observable<IStaff> {
    staff = new Staff(staff);
    return super.create(staff);
  }

  read(staff: IStaff): Observable<IStaff> {
    return super.read(staff)
      .pipe(map(x => new Staff(x)));
  }

  readAll(): Observable<IStaff[]> {
    return super.readAll()
      .pipe(map(staff => staff.map(x => new Staff(x))));
  }

  update(staff: IStaff): Observable<IStaff> {
    staff = new Staff(staff);
    return super.update(staff);
  }
}

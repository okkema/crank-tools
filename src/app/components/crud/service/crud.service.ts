import { NgxIndexedDBService } from 'ngx-indexed-db';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IBaseModel } from '../../../shared/base/model';
import { ICrudService } from './crud.service.interface';

export abstract class CrudService<T extends IBaseModel> implements ICrudService<T> {

    constructor(
        protected dbService: NgxIndexedDBService,
        private store: string,
    ) { }

    create(row: T): Observable<T> {
        return this.dbService.add(this.store, row)
            .pipe(map(id => {
                row.id = id;
                return row;
            }));
    }

    read(row: T): Observable<T> {
        return this.dbService.getByID(this.store, row.id);
    }

    readAll(): Observable<T[]> {
        return this.dbService.getAll(this.store);
    }

    update(row: T): Observable<T> {
        return this.dbService.update(this.store, row)
            .pipe(map(x => row));
    }

    updateAll(rows: T[]): Observable<T[]> {
        return this.dbService.clear(this.store)
            .pipe(map(success => rows.map(row => this.update(row))))
            .pipe(mergeMap(x => forkJoin(x)));
    }

    delete(row: T): Observable<T> {
        return this.dbService.delete(this.store, row.id)
            .pipe(map(x => row));
    }

}

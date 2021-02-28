import { Observable } from 'rxjs';

export interface ICrudService<T> {
    create(row: T): Observable<T>;
    read(row: T): Observable<T>;
    readAll(): Observable<T[]>;
    update(row: T): Observable<T>;
    updateAll(rows: T[]): Observable<T[]>;
    delete(row: T): Observable<T>;
};

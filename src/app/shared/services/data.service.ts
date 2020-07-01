import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  protected database: Promise<IDBPDatabase>;

  constructor(
    private http: HttpClient
  ) {
    this.database = openDB('database', 1, {
      upgrade(db) {
        const store = db.createObjectStore('clients', {
          keyPath: 'id',
          autoIncrement: true,
        });
        store.createIndex('email', 'email');
      }
    });
  }

  public loadJSON<T>(filename: string): Observable<T> {
    return this.http.get<T>(`./assets/data/${filename}`);
  }
}

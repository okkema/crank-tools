import { NgModule } from '@angular/core';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from "./database.config";

@NgModule({
  declarations: [],
  imports: [
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class DatabaseModule { }

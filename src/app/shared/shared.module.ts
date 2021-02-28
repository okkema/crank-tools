import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives';
import { DataModule } from './data';
import { HelpModule } from './help';
import { DatabaseModule } from './database';
import { CrudModule } from './crud';
import { AlertModule } from './alert';

const modules: any[] = [
  DatabaseModule,
  CrudModule,
  DirectivesModule,
  DataModule,
  HelpModule,
  AlertModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

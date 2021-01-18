import { NgModule } from '@angular/core';
import { CrudTableComponent } from './crud/table/crud-table.component';
import { CrudDialogComponent } from './crud/dialog/crud-dialog.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

const dialogs = [
  CrudDialogComponent,
];

const components = [
  CrudTableComponent,
  ...dialogs
];

const modules = [
  CommonModule,
  MaterialModule,
  NgxDatatableModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
  entryComponents: [...dialogs]
})
export class ComponentsModule { }

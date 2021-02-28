import { NgModule } from '@angular/core';
import { CrudTableComponent } from './crud/table';
import { CrudDialogComponent } from './crud/dialog';
import { MaterialModule } from '../material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

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
  ReactiveFormsModule,
  FlexLayoutModule,
  LayoutModule,
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [...modules, ...components],
  entryComponents: [...dialogs]
})
export class ComponentsModule { }

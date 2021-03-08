import { NgModule } from '@angular/core';
import { CrudTableComponent } from './table';
import { CrudDialogComponent } from './dialog';
import { MaterialModule } from '../../shared/material';
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
  exports: [...components],
  entryComponents: [...dialogs]
})
export class CrudModule { }

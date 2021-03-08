import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives';
import { DataModule } from './data';
import { HelpModule } from './help';
import { DatabaseModule } from './database';
import { AlertModule } from './alert';
import { LoggerModule } from './logger';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

const modules: any[] = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  LayoutModule,
  DatabaseModule,
  DirectivesModule,
  DataModule,
  HelpModule,
  AlertModule,
  LoggerModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
// MATERIAL
import { MaterialModule } from './material.module';
// DIRECTIVES
import { DirectivesModule } from './directives/directives.module';
// SERVICES
import { ServicesModule } from './services/services.module';
// LAYOUT
import { LayoutModule } from '@angular/cdk/layout';

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule,
  DirectivesModule,
  ServicesModule,
  LayoutModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

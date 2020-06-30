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

const modules: any[] = [
  CommonModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  MaterialModule,
  DirectivesModule,
  ServicesModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

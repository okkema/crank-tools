import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { LayoutModule } from '@angular/cdk/layout';
import { DatabaseModule } from './database/database.module';
import { ComponentsModule } from './components/components.module';

const modules: any[] = [
  DatabaseModule,
  ComponentsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  DirectivesModule,
  ServicesModule,
  LayoutModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

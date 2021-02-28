import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives';
import { DataModule } from './data';
import { HelpModule } from './help';
import { DatabaseModule } from './database';
import { ComponentsModule } from './components';

const modules: any[] = [
  DatabaseModule,
  ComponentsModule,
  DirectivesModule,
  DataModule,
  HelpModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

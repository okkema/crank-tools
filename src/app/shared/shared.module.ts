import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './database/database.module';
import { ComponentsModule } from './components/components.module';

const modules: any[] = [
  DatabaseModule,
  ComponentsModule,
  DirectivesModule,
  ServicesModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

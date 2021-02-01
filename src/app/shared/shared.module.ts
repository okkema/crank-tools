import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';
import { ServicesModule } from './services/services.module';
import { DatabaseModule } from './database/database.module';
import { ComponentsModule } from './components/components.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const modules: any[] = [
  DatabaseModule,
  ComponentsModule,
  DirectivesModule,
  ServicesModule,
  SweetAlert2Module.forRoot(),
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class SharedModule { }

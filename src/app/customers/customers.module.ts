// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { CustomersComponent } from './customers.component';
// ROUTING
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomersComponent,
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
  ]
})
export class CustomersModule { }

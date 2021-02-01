import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { CustomersComponent } from './customers.component';
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

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';


@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ]
})
export class StaffModule { }

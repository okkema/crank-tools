// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { StaffComponent } from './staff.component';
// ROUTING
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

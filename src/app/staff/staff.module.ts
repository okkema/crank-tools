import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffService } from './service';
import { CLOUD_SYNC } from '../cloud/sync';

@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    SharedModule,
    StaffRoutingModule,
  ],
  providers: [
    StaffService,
    { provide: CLOUD_SYNC, useClass: StaffService, multi: true }
  ]
})
export class StaffModule { }

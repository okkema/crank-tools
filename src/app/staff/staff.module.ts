import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { StaffService } from './service';
import { TOKEN } from '../cloud/models';

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
    { provide: TOKEN, useClass: StaffService, multi: true }
  ]
})
export class StaffModule { }

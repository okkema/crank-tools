import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { StaffComponent } from './staff.component';
import { StaffService } from './service';
import { CLOUD_SYNC } from '../settings/cloud/sync';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: StaffComponent,
    path: 'staff',
  },
];

@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    StaffService,
    { provide: CLOUD_SYNC, useClass: StaffService, multi: true }
  ]
})
export class StaffModule { }

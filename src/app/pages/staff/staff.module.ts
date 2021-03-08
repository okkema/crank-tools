import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { StaffComponent } from './staff.component';
import { StaffService } from './service';
import { CLOUD_SYNC } from '../settings/cloud/sync';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';
import { CrudModule } from 'src/app/components/crud';

const routes: IPageRoute[] = [
  {
    component: StaffComponent,
    path: 'staff',
    data: {
      title: 'Staff',
      icon: 'assignment_ind',
    }
  },
];

@NgModule({
  declarations: [
    StaffComponent,
  ],
  imports: [
    SharedModule,
    CrudModule,
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

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { TransmissionComponent } from './transmission.component';
import { IPageRoute } from '../../shared/base/page';
import { RouterModule } from '@angular/router';

const routes: IPageRoute[] = [
  {
    component: TransmissionComponent,
    path: 'transmission',
    data: {
      title: 'Transmission',
      icon: 'settings_suggest'
    }
  },
];

@NgModule({
  declarations: [
    TransmissionComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class TransmissionModule { }

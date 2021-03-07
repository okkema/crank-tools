import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { WheelsComponent } from './wheels.component';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

const routes: IPageRoute[] = [
  {
    component: WheelsComponent,
    path: 'wheels',
    data: {
      title: 'Wheels',
      icon: 'pedal_bike'
    }
  },
];

@NgModule({
  declarations: [
    WheelsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class WheelsModule { }

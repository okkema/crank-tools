import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { WheelsComponent } from './wheels.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: WheelsComponent,
    path: 'wheels',
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

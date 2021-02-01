import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WheelsComponent } from './wheels.component';

const routes: Routes = [
  {
    component: WheelsComponent,
    path: 'wheels',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WheelsRoutingModule { }

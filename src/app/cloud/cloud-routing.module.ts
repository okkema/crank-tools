import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloudComponent } from './cloud.component';

const routes: Routes = [
  {
    component: CloudComponent,
    path: 'cloud',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CloudRoutingModule { }

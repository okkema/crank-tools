// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// COMPONENTS
import { ServiceComponent } from './service.component';

const routes: Routes = [
  {
    component: ServiceComponent,
    path: 'service',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule { }

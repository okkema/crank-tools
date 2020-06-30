// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// COMPONENTS
import { TransmissionComponent } from './transmission.component';

const routes: Routes = [
  {
    component: TransmissionComponent,
    path: 'transmission',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TransmissionRoutingModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CustomersComponent } from './customers.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: CustomersComponent,
    path: 'customers',
  },
];

@NgModule({
  declarations: [
    CustomersComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class CustomersModule { }

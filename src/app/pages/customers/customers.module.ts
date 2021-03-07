import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CustomersComponent } from './customers.component';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

const routes: IPageRoute[] = [
  {
    component: CustomersComponent,
    path: 'customers',
    data: {
      title: 'Customers',
      icon: 'people'
    }
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

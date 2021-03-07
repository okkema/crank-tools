import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

const routes: IPageRoute[] = [
  {
    component: RegisterComponent,
    path: 'register',
    data: {
      title: 'Register',
      icon: 'shopping_cart',
    },
  },
];

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class RegisterModule { }

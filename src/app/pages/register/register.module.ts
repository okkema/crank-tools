import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: RegisterComponent,
    path: 'register',
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

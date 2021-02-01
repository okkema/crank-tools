import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [
    RegisterComponent,
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule { }

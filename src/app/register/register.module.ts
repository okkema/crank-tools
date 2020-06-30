// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { RegisterComponent } from './register.component';
// ROUTING
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

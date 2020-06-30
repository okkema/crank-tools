// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { WheelsComponent } from './wheels.component';
// ROUTING
import { WheelsRoutingModule } from './wheels-routing.module';


@NgModule({
  declarations: [
    WheelsComponent,
  ],
  imports: [
    SharedModule,
    WheelsRoutingModule,
  ],
})
export class WheelsModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { WheelsComponent } from './wheels.component';
import { WheelsRoutingModule } from './routing.module';

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

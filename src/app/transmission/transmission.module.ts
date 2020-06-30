// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared/shared.module';
// COMPONENTS
import { TransmissionComponent } from './transmission.component';
// ROUTING
import { TransmissionRoutingModule } from './transmission-routing.module';

@NgModule({
  declarations: [
    TransmissionComponent,
  ],
  imports: [
    SharedModule,
    TransmissionRoutingModule,
  ],
})
export class TransmissionModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TransmissionComponent } from './transmission.component';
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

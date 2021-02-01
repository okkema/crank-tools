import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';

@NgModule({
  declarations: [
    CloudComponent,
  ],
  imports: [
    SharedModule,
    CloudRoutingModule,
  ]
})
export class CloudModule { }

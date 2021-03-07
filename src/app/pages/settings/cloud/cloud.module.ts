import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CloudComponent } from './cloud.component';

@NgModule({
  declarations: [
    CloudComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CloudComponent,
  ]
})
export class CloudModule { }

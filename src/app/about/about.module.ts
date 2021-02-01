import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    SharedModule,
    AboutRoutingModule,
  ],
})
export class AboutModule { }

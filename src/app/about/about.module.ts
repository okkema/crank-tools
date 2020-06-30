// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { AboutComponent } from './about.component';
// ROUTING
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

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ServiceComponent } from './service.component';
import { ServiceRoutingModule } from './service-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    ServiceComponent,
  ],
  imports: [
    SharedModule,
    ServiceRoutingModule,
    FullCalendarModule,
  ],
})
export class ServiceModule { }

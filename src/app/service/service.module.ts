// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared/shared.module';
// COMPONENTS
import { ServiceComponent } from './service.component';
// ROUTING
import { ServiceRoutingModule } from './service-routing.module';
// CALENDAR
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

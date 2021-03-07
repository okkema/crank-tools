import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ServiceComponent } from './service.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { RouterModule, Routes } from '@angular/router';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

const routes: Routes = [
  {
    component: ServiceComponent,
    path: 'service',
  },
];

@NgModule({
  declarations: [
    ServiceComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
    FullCalendarModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class ServiceModule { }

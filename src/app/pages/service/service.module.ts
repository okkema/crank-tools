import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ServiceComponent } from './service.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

const routes: IPageRoute[] = [
  {
    component: ServiceComponent,
    path: 'service',
    data: {
      title: 'Service',
      icon: 'construction'
    }
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

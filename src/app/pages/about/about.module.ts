import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';
import { SharedModule } from '../../shared';
import { AboutComponent } from './about.component';

const routes: IPageRoute[] = [
  {
    component: AboutComponent,
    path: 'about',
    data: {
      title: 'About',
      icon: 'info',
    }
  },
];

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AboutModule { }

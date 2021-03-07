import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared';
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    component: AboutComponent,
    path: 'about',
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

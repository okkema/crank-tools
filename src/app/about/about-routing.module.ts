// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// COMPONENTS
import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    component: AboutComponent,
    path: 'about',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule { }

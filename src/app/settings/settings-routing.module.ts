// ANGULAR
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// COMPONENTS
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class SettingsRoutingModule { }

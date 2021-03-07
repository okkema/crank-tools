import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { SettingsComponent } from './settings.component';
import { CloudModule } from './cloud';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: SettingsComponent,
    path: 'settings',
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    SharedModule,
    CloudModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class SettingsModule { }

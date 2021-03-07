import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { SettingsComponent } from './settings.component';
import { CloudModule } from './cloud';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

const routes: IPageRoute[] = [
  {
    component: SettingsComponent,
    path: 'settings',
    data: {
      title: 'Settings',
      icon: 'settings',
    }
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

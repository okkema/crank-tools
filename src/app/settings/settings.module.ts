import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './routing.module';
import { CloudModule } from './cloud';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    SharedModule,
    CloudModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule { }

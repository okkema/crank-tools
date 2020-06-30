// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared/shared.module';
// COMPONENTS
import { SettingsComponent } from './settings.component';
// ROUTING
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    SharedModule,
    SettingsRoutingModule,
  ],
})
export class SettingsModule { }

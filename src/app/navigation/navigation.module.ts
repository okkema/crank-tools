// ANGULAR
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { NavigationComponent } from './navigation.component';
// SERVICES
import { NavigationService } from './navigation.service';

@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    NavigationComponent,
  ],
  providers: [
    NavigationService,
  ]
})
export class NavigationModule { }

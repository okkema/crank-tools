import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { NavigationComponent } from './navigation.component';
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

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { FolderComponent } from './folder/folder.component';
import { ItemComponent } from './item/item.component';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    NavigationComponent,
    FolderComponent,
    ItemComponent,
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

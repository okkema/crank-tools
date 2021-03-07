import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '..';
import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';
import { FolderComponent } from './folder/folder.component';
import { ItemComponent } from './item/item.component';

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

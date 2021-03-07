import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

const routes: IPageRoute[] = [
  {
    component: InventoryComponent,
    path: 'inventory',
    data: {
      title: 'Inventory',
      icon: 'inventory'
    }
  },
];

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class InventoryModule { }

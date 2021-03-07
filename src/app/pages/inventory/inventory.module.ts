import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    component: InventoryComponent,
    path: 'inventory',
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

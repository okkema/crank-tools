import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingModule } from './inventory-routing.module';

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    SharedModule,
    InventoryRoutingModule,
  ]
})
export class InventoryModule { }

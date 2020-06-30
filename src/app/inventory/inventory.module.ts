// ANGULAR
import { NgModule } from '@angular/core';
// SHARED
import { SharedModule } from '../shared';
// COMPONENTS
import { InventoryComponent } from './inventory.component';
// ROUTING
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

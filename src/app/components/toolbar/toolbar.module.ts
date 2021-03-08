import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ToolbarComponent } from './toolbar.component';

const modules = [
  SharedModule,
];

@NgModule({
  declarations: [
    ToolbarComponent,
  ],
  imports: [...modules],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }

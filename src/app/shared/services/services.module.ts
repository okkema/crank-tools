import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { HelpService } from './help.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    DataService,
    HelpService,
  ],
})
export class ServicesModule { }

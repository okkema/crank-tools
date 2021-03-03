import { NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LoggerPublishersModule } from './publishers';

@NgModule({
  imports: [
    LoggerPublishersModule,
  ],
  providers: [
    LoggerService,
  ]
})
export class LoggerModule { }

import { NgModule } from '@angular/core';
import { ConsoleLoggerPublisher } from './console.logger.publisher';
import { IndexedDBLoggerPublisher } from './indexeddb.logger.publisher';
import { LOGGER_PUBLISHER } from './logger.publisher.token';

@NgModule({
  providers: [
    { provide: LOGGER_PUBLISHER, useClass: ConsoleLoggerPublisher, multi: true },
    { provide: LOGGER_PUBLISHER, useClass: IndexedDBLoggerPublisher, multi: true }
  ]
})
export class LoggerPublishersModule { }

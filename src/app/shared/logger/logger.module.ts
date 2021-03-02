import { NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { LOGGER_PROVIDER } from './logger.token';
import { ConsoleLoggerProvider } from './providers';

@NgModule({
  providers: [
    LoggerService,
    { provide: LOGGER_PROVIDER, useClass: ConsoleLoggerProvider, multi: true }
  ]
})
export class LoggerModule { }

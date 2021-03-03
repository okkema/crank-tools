import { Inject, Injectable } from '@angular/core';
import { ILogger } from './logger.interface';
import { LOGGER_PUBLISHER } from './publishers';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  constructor(
    @Inject(LOGGER_PUBLISHER) private publishers: ILogger[],
  ) {}

  debug(message: string): void {
    this.publishers.forEach(x => x.debug(message));
  }

  info(message: string): void {
    this.publishers.forEach(x => x.info(message));
  }

  warn(message: string): void {
    this.publishers.forEach(x => x.warn(message));
  }

  error(message: string): void {
    this.publishers.forEach(x => x.error(message));
  }
}

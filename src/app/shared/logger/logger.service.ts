import { Inject, Injectable } from '@angular/core';
import { ILogger } from './logger.interface';
import { LOGGER_PROVIDER } from './logger.token';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILogger {

  constructor(
    @Inject(LOGGER_PROVIDER) private providers: ILogger[],
  ) { }

  debug(message: string): void {
    this.providers.forEach(x => x.debug(message));
  }

  info(message: string): void {
    this.providers.forEach(x => x.info(message));
  }

  warn(message: string): void {
    this.providers.forEach(x => x.warn(message));
  }

  error(message: string): void {
    this.providers.forEach(x => x.error(message));
  }
}

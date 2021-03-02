/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { ILogger } from '../logger.interface';

@Injectable({
  providedIn: 'root'
})
export class ConsoleLoggerProvider implements ILogger {

  constructor() { }

  debug(message: string): void {
    console.debug(message);
  }

  info(message: string): void {
    console.info(message);
  }

  warn(message: string): void {
    console.warn(message);
  }

  error(message: string): void {
    console.error(message);
  }
}

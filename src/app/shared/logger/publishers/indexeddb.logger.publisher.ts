import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { ILogger } from '../logger.interface';
import { LOG_METADATA, LogLevel, ILog } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBLoggerPublisher implements ILogger {

  private store = LOG_METADATA.store;

  constructor(
    private dbService: NgxIndexedDBService,
  ) { }

  debug(message: string): void {
    this.writeLog({ level: LogLevel.debug, message });
  }

  info(message: string): void {
    this.writeLog({ level: LogLevel.info, message });
  }

  warn(message: string): void {
    this.writeLog({ level: LogLevel.warn, message });
  }

  error(message: string): void {
    this.writeLog({ level: LogLevel.error, message });
  }

  private writeLog(log: ILog): void {
    this.dbService.add(this.store, log)
      .subscribe();
  }
}

import { InjectionToken } from '@angular/core';
import { ILogger } from './logger.interface';

export const LOGGER_PROVIDER = new InjectionToken<ILogger>('ILoggerProvider');

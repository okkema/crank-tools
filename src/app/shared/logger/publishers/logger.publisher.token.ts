import { InjectionToken } from '@angular/core';
import { ILogger } from '../logger.interface';

export const LOGGER_PUBLISHER = new InjectionToken<ILogger>('LoggerPublisher');

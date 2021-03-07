import { InjectionToken } from '@angular/core';
import { ICloudSync } from './cloud.sync.interface';

export const CLOUD_SYNC = new InjectionToken<ICloudSync<any>>('ICloudSync');

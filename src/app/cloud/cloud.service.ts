import { Inject, Injectable } from '@angular/core';
import { ICloudService } from './cloud.service.interface';
import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { ICloudSync, CLOUD_SYNC } from './sync';
import { LoggerService } from '../shared/logger';

@Injectable({
  providedIn: 'root'
})
export class CloudService implements ICloudService {

  constructor(
    @Inject(CLOUD_SYNC) private services: ICloudSync<any>[],
    private logger: LoggerService
  ) { }

  export(): Promise<boolean> {
    return Promise.all(this.services.map(x => x.export)).then(data => {
      const zip = new JSZip();
      this.services.map((service, index) => {
        zip.file(service.filename, JSON.stringify(data[index]));
      });
      return zip.generateAsync({type: 'blob'});
    }).then(blob => saveAs(blob, 'crank-tools.zip'))
      .then(() => true)
      .catch((error) => {
        this.logger.error('Unknown error while exporting data');
        this.logger.error(error);
        return false;
      });
  }

  import(file: File): Promise<boolean> {
    return JSZip.loadAsync(file).then(zip => Promise.all(this.services.map(x => zip.file(x.filename).async('string'))))
      .then(data => this.services.every(async (service, index) => {
          const validation = service.schema.validate(JSON.parse(data[index]));
          if (validation.error) {
            this.logger.error(`Error validating data from ${service.filename}`);
            this.logger.error(validation.error.message);
            return false;
          }
          const success = await service.import(validation.value);
          if (!success) {
            this.logger.error(`Error loading data from ${service.filename}`);
            return false;
          }
          return true;
        }))
        .catch((error) => {
          this.logger.error('Unknown error while importing data');
          this.logger.error(error);
          return false;
        });
  }
}

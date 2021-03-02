import { Inject, Injectable } from '@angular/core';
import { ICloudService } from './cloud.service.interface';
import * as JSZip from 'jszip';
import { StaffService } from 'src/app/staff/service';
import { saveAs } from 'file-saver';
import { ICloudData, ICloudSyncService, TOKEN } from '../models';
import staffSchema from 'src/app/staff/models/staff.schema';

@Injectable({
  providedIn: 'root'
})
export class CloudService implements ICloudService {

  constructor(
    @Inject(TOKEN) private services: ICloudSyncService<any>[]
  ) { }

  export(): Promise<boolean> {
    return Promise.all(this.services.map(x => x.dump)).then(dump => {
      const zip = new JSZip();
      this.services.map((service, index) => {
        zip.file(service.filename, JSON.stringify(dump[index]));
      });
      return zip.generateAsync({type: 'blob'});
    }).then(blob => saveAs(blob, 'crank-tools.zip'))
      .then(() => true)
      .catch(() => false);
  }

  import(file: File) {
    JSZip.loadAsync(file).then(zip => Promise.all(this.services.map(x => zip.file(x.filename).async('string')))
      .then(data => {
        this.services.forEach(async (service, index) => {
          const validation = service.schema.validate(JSON.parse(data[index]));
          if (validation.error) {
            console.log(validation.error);
            return;
          }
          const success = await service.load(validation.value);
        });
      }));
  }
}

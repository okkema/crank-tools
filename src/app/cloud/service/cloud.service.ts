import { Injectable } from '@angular/core';
import { ICloudService } from './cloud.service.interface';
import * as JSZip from 'jszip';
import { StaffService } from 'src/app/staff/service';
import { saveAs } from 'file-saver';
import { ICloudData } from '../models';
import staffSchema from 'src/app/staff/models/staff.schema';

@Injectable({
  providedIn: 'root'
})
export class CloudService implements ICloudService {

  private data: ICloudData[] = [
    {
      filename: 'staff.json',
      promise: this.staffService.readAll().toPromise(),
      schema: staffSchema.array,
    },
  ];

  constructor(
    private staffService: StaffService
  ) { }

  export(): Promise<boolean> {
    return Promise.all(this.data.map(x => x.promise)).then(x => {
      const zip = new JSZip();
      this.data.map((data, index) => {
        data.data = x[index];
        zip.file(data.filename, JSON.stringify(data.data));
      });
      return zip.generateAsync({type: 'blob'});
    }).then(blob => saveAs(blob, 'crank-tools.zip'))
      .then(() => true)
      .catch(() => false);
  }

  import(file: File) {
    JSZip.loadAsync(file).then(zip => Promise.all(this.data.map(x => zip.file(x.filename).async('string')))
      .then(x => {
        this.data.map(async (data, index) => {
          const validation = data.schema.validate(JSON.parse(x[index]));
          if (validation.error) {
            console.log(validation.error);
          }
          const test = await this.staffService.load(validation.value);
        });
        return this.data;
      }));
  }
}

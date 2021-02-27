import { Injectable } from '@angular/core';
import { ICloudService } from './cloud.service.interface';
import * as JSZip from 'jszip';
import { StaffService } from 'src/app/staff/service';
import { IStaff } from 'src/app/staff/models';
import { saveAs } from 'file-saver';
import { CloudData } from '../models/cloud-data.interface';
import staffSchema from 'src/app/staff/models/staff.schema';

@Injectable({
  providedIn: 'root'
})
export class CloudService implements ICloudService {

  private data: CloudData[] = [
    {
      filename: 'staff.json',
      promise: this.staffService.readAll().toPromise(),
      schema: staffSchema.array,
    },
  ];

  constructor(
    private staffService: StaffService
  ) { }

  export() {
    Promise.all(this.data.map(x => x.promise)).then(x => {
      const zip = new JSZip();
      this.data.map((data, index) => {
        data.data = x[index];
        zip.file(data.filename, JSON.stringify(data.data));
      });
      zip.generateAsync({type: 'blob'}).then(blob => saveAs(blob, 'crank-tools.zip'));
    });
  }

  import(file) {
    JSZip.loadAsync(file).then(zip => Promise.all(this.data.map(x => zip.file(x.filename).async('string')))
      .then(x => {
        this.data.map((data, index) => {
          const validation = data.schema.validate(JSON.parse(x[index]));
          if (validation.error) {
            console.log(validation.error);
          }
          data.data = validation.value;
        });
        return this.data;
      }));
  }
}

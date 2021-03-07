import { Component, OnInit } from '@angular/core';
import { CloudService } from './cloud.service';

@Component({
  selector: 'app-cloud',
  template: `
    <mat-card [style.width]="'max-content'">
      <div fxLayout="row" fxLayoutAlign="start center">
        <mat-icon mat-card-avatar [style.font-size.px]="40">backup</mat-icon>
        <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Cloud Sync & Backup</mat-card-title>
      </div>
      <hr>
      <mat-card-content fxLayout="row" fxLayoutGap="8px">
        <button mat-flat-button color="primary" (click)="export()">Export</button>
        <button mat-flat-button color="primary" (click)="file.click()">Import</button>
        <input #file hidden type="file" accept=".zip" (change)="import($event.target.files[0])">
      </mat-card-content>
    </mat-card>
  `,
})
export class CloudComponent implements OnInit {

  constructor(
    private cloudService: CloudService,
  ) { }

  ngOnInit(): void {
  }

  export() {
    this.cloudService.export();
  }

  import(file: File) {
    this.cloudService.import(file);
  }
}

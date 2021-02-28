import { Component, OnInit, ViewChild } from '@angular/core';
import { CloudService } from './service/cloud.service';

@Component({
  selector: 'app-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
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

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder',
  template: `
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>{{ title }}</mat-panel-title>
      </mat-expansion-panel-header>
    </mat-expansion-panel>
  `,
  styles: [
  ]
})
export class FolderComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() children;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/settings.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Settings</mat-card-title>
      </div>
      <hr>
      <mat-card-content></mat-card-content>
    </mat-card>
  `,
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

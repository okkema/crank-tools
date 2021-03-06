import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheels',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/parts/wheel.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Wheel Builder</mat-card-title>
      </div>
      <hr>
      <mat-card-content></mat-card-content>
    </mat-card>
  `,
})
export class WheelsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

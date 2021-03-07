import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/register.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Register & Receipts</mat-card-title>
      </div>
      <hr>
      <mat-card-content></mat-card-content>
    </mat-card>
  `,
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

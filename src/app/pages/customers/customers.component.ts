import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/customers.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Customer Database</mat-card-title>
      </div>
      <hr>
      <mat-card-content></mat-card-content>
    </mat-card>
  `,
})
export class CustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

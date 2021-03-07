import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-service',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/service.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Service Scheduler</mat-card-title>
      </div>
      <hr>
      <mat-card-content>
          <full-calendar [options]="calendarOptions"></full-calendar>
      </mat-card-content>
    </mat-card>
  `,
})
export class ServiceComponent implements OnInit {

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };

  constructor() { }

  ngOnInit(): void {
  }

}

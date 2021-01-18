import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  };

  constructor() { }

  ngOnInit(): void {
  }

}

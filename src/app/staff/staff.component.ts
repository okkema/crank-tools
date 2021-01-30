import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICrudColumn } from '../shared/components/crud/models/column.interface';
import { FIELD_NAMES, IStaff } from './models';
import { StaffService } from './service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  columns: ICrudColumn[] = [
    { name: FIELD_NAMES.id, sortable: true }, 
    { name: FIELD_NAMES.name, sortable: true }, 
    { name: FIELD_NAMES.title, sortable: true },
    { name: FIELD_NAMES.email, sortable: true },
    { name: FIELD_NAMES.phone, sortable: true }
  ];
  read = () => this.staffService.readAll();
  title = "Staff Directory";

  constructor(
    private staffService: StaffService,
  ) { }

  ngOnInit(): void { }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FIELD_NAMES, IStaff } from './models';
import { StaffService } from './service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { CrudDialogComponent } from '../shared/components/crud/dialog/crud-dialog.component';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  columns = [
    { name: FIELD_NAMES.id }, 
    { name: FIELD_NAMES.name }, 
    { name: FIELD_NAMES.title },
    { name: FIELD_NAMES.email },
    { name: FIELD_NAMES.phone }
  ];
  read = () => this.staffService.readAll();
  title = "Staff Directory";

  constructor(
    private staffService: StaffService,
  ) { }

  ngOnInit(): void { }

}

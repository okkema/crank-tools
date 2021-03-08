import { Component, OnInit } from '@angular/core';
import { ICrudTable, ICrudColumn } from '../../components/crud/table/models';
import { IFormBase } from '../../components/crud/dialog/models';
import { FIELD_NAMES, IStaff } from './models';
import { StaffService } from './service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-staff',
  template: `
    <app-crud-table
      [icon]="icon"
      [title]="title"
      [columns]="columns"
      [controls]="controls"
      [create]="create"
      [read]="read"
      [update]="update"
      [delete]="delete"
    ></app-crud-table>
  `,
})
export class StaffComponent implements OnInit, ICrudTable {

  icon = 'assignment_ind';
  title = 'Staff Directory';

  columns: ICrudColumn[] = [
    { name: FIELD_NAMES.id, sortable: true },
    { name: FIELD_NAMES.name, sortable: true },
    { name: FIELD_NAMES.title, sortable: true },
    { name: FIELD_NAMES.email, sortable: true },
    { name: FIELD_NAMES.phone, sortable: true }
  ];
  showActions: boolean;
  controls: IFormBase<any>[] = [
    {
      controlType: 'textbox',
      type: 'text',
      key: FIELD_NAMES.name,
      required: true,
    },
    {
      controlType: 'textbox',
      type: 'text',
      key: FIELD_NAMES.title,
    },
    {
      controlType: 'textbox',
      type: 'email',
      key: FIELD_NAMES.email,
      required: true,
    },
    {
      controlType: 'textbox',
      type: 'tel',
      key: FIELD_NAMES.phone,
      required: true,
    },
    {
      controlType: 'textbox',
      type: 'password',
      key: FIELD_NAMES.password,
      hint: {
        value: 'Only if you want to change password!',
        onUpdate: true,
      },
      validators: [
        {
          validator: Validators.required,
          onCreate: true,
        }
      ]
    }
  ];

  constructor(
    private staffService: StaffService,
  ) { }

  create = (staff: IStaff) => this.staffService.create(staff);
  read = () => this.staffService.readAll();
  update = (staff: IStaff) => this.staffService.update(staff);
  delete = (staff: IStaff) => this.staffService.delete(staff);

  ngOnInit(): void { }

}

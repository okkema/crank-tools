import { Component, Inject, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ICrudDialogData } from '../models';
import { IFormBase } from '../models/form-base.interface';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss']
})
export class CrudDialogComponent implements OnInit {

  controls: IFormBase<any>[];
  form: FormGroup;
  row: any;
  create: Function;
  update: Function;
  delete: Function;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrudDialogData,
    private fb: FormBuilder,
  ) {
    this.controls = data.controls;
    this.form = this.createForm();
    this.create = data.create;
    this.update = data.update;
    this.delete = data.delete;
    this.row = data.row;
    if (this.row) this.form.patchValue(this.row);
    else this.form.reset();
  }

  ngOnInit(): void {
  }

  errorMessage(key: string): string {
    if (this.form.controls[key].hasError('required')) return 'The field is required.';
    if (this.form.controls[key].hasError('email')) return 'The field must be a valid email.';
  }

  createForm(): FormGroup {
    return this.fb.group(this.controls.reduce((prev, curr, index) => {
      curr.validators = [];
      if (curr.required) curr.validators.push(Validators.required);
      if (curr.type === 'email') curr.validators.push(Validators.email);
      prev[curr.key] = this.fb.control(!!curr.value ? curr.value : '', curr.validators);
      return prev;
    }, {}));
  }

}

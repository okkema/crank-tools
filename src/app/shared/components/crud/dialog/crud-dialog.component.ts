import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICrudDialogData, IFormBase } from './models';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss']
})
export class CrudDialogComponent implements OnInit {

  controls: IFormBase<any>[];
  form: FormGroup;
  row: any;
  create: (value) => Observable<any>;
  update: (value) => Observable<any>;
  delete: (value) => Observable<any>;
  isNew: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICrudDialogData,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CrudDialogComponent>
  ) {
    this.controls = data.controls;
    this.form = this.createForm();
    this.create = data.create;
    this.update = data.update;
    this.delete = data.delete;
    this.row = Object.assign({}, data.row);
    this.isNew = !data.row;
    if (this.row) this.form.patchValue(this.row);
    else this.form.reset();
    this.form.valueChanges.subscribe(x => Object.keys(x).reduce((prev, curr, index) => {
      prev[curr] = x[curr];
      return prev;
    }, this.row));
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

  onCreate(): void {
    this.create(this.row).subscribe(res => {
      if (res) this.dialogRef.close();
    }, err => console.error);
  }

  onUpdate(): void {
    this.update(this.row).subscribe(res => {
      if (res) this.dialogRef.close();
    }, err => console.error)
  }

  onDelete(): void {
    Swal.fire({
      title: 'Confirm delete?',
      showConfirmButton: true,
      showCancelButton: true,
    }).then(x => {
      if (x.isConfirmed) {
        this.delete(this.row).subscribe(res => {
          if (res) this.dialogRef.close();
        }, err => console.error);
      }
    });
  }

}

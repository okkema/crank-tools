import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ICrudDialogData, IFormBase, IFormValidator } from './models';

@Component({
  selector: 'app-crud-dialog',
  template: `
    <form [formGroup]="form" fxLayout="column" fxLayoutGap="10px" [style.width.%]="100">
      <mat-form-field *ngFor="let control of controls" [style.width.px]="300" appearance="fill">
        <mat-label *ngIf="!!control.label; else keyLabel">{{ control.label }}</mat-label>
        <ng-template #keyLabel>
          <mat-label>{{ control.key | titlecase }}</mat-label>
        </ng-template>
        <div [ngSwitch]="control.controlType">
          <input *ngSwitchCase="'textbox'" matInput [type]="control.type" [formControlName]="control.key" [id]="control.key" [style.width.%]="100">
          <mat-select *ngSwitchCase="'select'" [formControlName]="control.key" [id]="control.key">
            <mat-option *ngFor="let option of control.options" [value]="option.key">{{ option.value }}</mat-option>
          </mat-select>
        </div>
        <mat-hint *ngIf="showHint(control)">{{ control.hint.value }}</mat-hint>
        <mat-error *ngIf="form.controls[control.key].invalid">{{ errorMessage(control.key) }}</mat-error>
      </mat-form-field>
      <div fxLayoutAlign="space-between">
        <button *ngIf="isNew; else edit" mat-flat-button color="accent" (click)="onCreate()" [disabled]="form.invalid">
          <mat-icon>save</mat-icon>
        </button>
        <ng-template #edit>
          <button mat-flat-button color="accent" (click)="onUpdate()" [disabled]="form.invalid">
            <mat-icon>save</mat-icon>
          </button>
          <button mat-flat-button color="warn" (click)="onDelete()">
            <mat-icon>remove_circle</mat-icon>
          </button>
        </ng-template>
      </div>
    </form>
  `
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
    this.create = data.create;
    this.update = data.update;
    this.delete = data.delete;
    this.row = Object.assign({}, data.row);
    this.isNew = !data.row;
    this.form = this.createForm();
    if (this.row) {this.form.patchValue(this.row);}
    else {this.form.reset();}
    this.form.valueChanges.subscribe(x => Object.keys(x).reduce((prev, curr, index) => {
      prev[curr] = x[curr];
      return prev;
    }, this.row));
  }

  ngOnInit(): void {
  }

  errorMessage(key: string): string {
    if (this.form.controls[key].hasError('required')) {return 'The field is required.';}
    if (this.form.controls[key].hasError('email')) {return 'The field must be a valid email.';}
  }

  createForm(): FormGroup {
    return this.fb.group(this.controls.reduce((prev, curr, index) => {
      const validators = this.parseValidators(curr);
      prev[curr.key] = this.fb.control(!!curr.value ? curr.value : '', validators);
      return prev;
    }, {}));
  }

  parseValidators(control: IFormBase<any>): any[] {
    const validators = [];
    control?.validators?.forEach(x => {
      if (this.isNew && !!x.onCreate) {validators.push(x.validator);}
      else if (!this.isNew && !!x.onUpdate) {validators.push(x.validator);}
    });
    if (control.required) {validators.push(Validators.required);}
    if (control.type === 'email') {validators.push(Validators.email);}
    return validators;
  }

  onCreate(): void {
    this.create(this.row).subscribe(res => {
      if (res) {this.dialogRef.close();}
    }, err => console.error);
  }

  onUpdate(): void {
    this.update(this.row).subscribe(res => {
      if (res) {this.dialogRef.close();}
    }, err => console.error);
  }

  onDelete(): void {
    Swal.fire({
      title: 'Confirm delete?',
      showConfirmButton: true,
      showCancelButton: true,
      heightAuto: false,
    }).then(x => {
      if (x.isConfirmed) {
        this.delete(this.row).subscribe(res => {
          if (res) {this.dialogRef.close();}
        }, err => console.error);
      }
    });
  }

  showHint(control: IFormBase<any>): boolean {
    if (!control.hint) {return false;}
    if (this.isNew && !!control.hint.onCreate) {return true;}
    if (!this.isNew && !!control.hint.onUpdate) {return true;}
    return false;
  }

}

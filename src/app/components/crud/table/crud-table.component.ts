import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CrudDialogComponent } from '../dialog/crud-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ICrudColumn } from './models';
import { IFormBase, ICrudDialogData } from '../dialog/models';

@Component({
  selector: 'app-crud-table',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="space-between center">
        <div fxLayout="row" fxLayoutAlign="start center">
          <mat-icon mat-card-avatar [style.font-size.px]="40">{{ icon }}</mat-icon>
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >{{ title }}</mat-card-title>
        </div>
        <mat-form-field [style.width.px]="300" appearance="fill">
          <mat-label>Filter</mat-label>
          <input matInput type="text" #filter="matInput" (keyup)="filterData($event)">
          <mat-icon matSuffix [color]="filter.focused ? 'primary' : ''">search</mat-icon>
        </mat-form-field>
      </div>
      <hr>
      <mat-card-content>
        <mat-table matSort [dataSource]="dataSource">
          <ng-container *ngFor="let col of columns; let i = index;" [matColumnDef]="col.name">
            <div *ngIf="col.sortable; else notSortable">
              <mat-header-cell mat-sort-header *matHeaderCellDef>{{ col.name | titlecase }}</mat-header-cell>
            </div>
            <ng-template #notSortable>
              <mat-header-cell *matHeaderCellDef>{{ col.name | titlecase }}</mat-header-cell>
            </ng-template>
            <mat-cell *matCellDef="let row"> {{ row[col.name] }} </mat-cell>
          </ng-container>
          <ng-container matColumnDef="actions">
            <mat-header-cell *matHeaderCellDef fxLayoutAlign="end center">
              <button mat-flat-button color="primary" (click)="openDialog()">
                <mat-icon>add</mat-icon>
              </button>
            </mat-header-cell>
            <mat-cell *matCellDef="let row" fxLayoutAlign="end center">
              <button mat-flat-button color="primary" (click)="openDialog(row)">
                <mat-icon>edit</mat-icon>
              </button>
            </mat-cell>
          </ng-container>
          <mat-header-row *matHeaderRowDef="tableColumns"></mat-header-row>
          <mat-row *matRowDef="let rows; columns: tableColumns"></mat-row>
        </mat-table>
        <mat-paginator [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
      </mat-card-content>
    </mat-card>
  `
})
export class CrudTableComponent implements OnInit, AfterViewInit {

  @Input() icon: string;
  @Input() title: string;
  @Input() columns: ICrudColumn[];
  @Input() showActions = true;
  @Input() controls: IFormBase<any>[];
  @Input() create: (value) => Observable<any>;
  @Input() read: (value?) => Observable<any>;
  @Input() update: (value) => Observable<any>;
  @Input() delete: (value) => Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<any>;

  constructor(
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.onRead();
  }

  onRead(): void {
    this.read().subscribe(data => this.dataSource.data = data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog(row?: any): void {
    const data: ICrudDialogData = {
      controls: this.controls,
      row,
      create: this.create,
      update: this.update,
      delete: this.delete,
    };
    const dialogRef = this.dialog.open(CrudDialogComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe(() => this.onRead());
  }

  get tableColumns(): string[] {
    const columns = this.columns.map(x => x.name);
    if (this.showActions) {columns.push('actions');}
    return columns;
  }

  filterData(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

}

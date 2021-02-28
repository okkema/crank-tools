import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CrudDialogComponent } from '../dialog/crud-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ICrudColumn } from './models';
import { IFormBase, ICrudDialogData } from '../dialog/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
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

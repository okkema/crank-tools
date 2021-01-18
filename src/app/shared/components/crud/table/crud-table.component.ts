import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CrudDialogComponent } from '../dialog/crud-dialog.component';

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss']
})
export class CrudTableComponent implements OnInit {

  @Input() title: string;
  @Input() rows: Observable<any>;
  @Input() columns: any[];

  @Input() create: Function;
  @Input() read: Function;
  @Input() update: Function;
  @Input() delete: Function;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.rows = this.read();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrudDialogComponent, {
      width: '250px',
    });
  }

}

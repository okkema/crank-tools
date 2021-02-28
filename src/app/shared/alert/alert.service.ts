import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlertService } from './alert.service.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService implements IAlertService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  show(message: string, action: string): void {
    this.snackBar.open(message, action);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../../shared/data';
import { Measurement, Result } from './models';
import { HelpService } from '../../shared/help';

@Component({
  selector: 'app-transmission',
  template: `
    <mat-card>
      <div fxLayout="row" fxLayoutAlign="start center">
          <img mat-card-avatar src="./assets/img/parts/cassette.png">
          <mat-card-title [style.margin-bottom]="0" [style.margin-left.px]="16" >Transmission Analysis</mat-card-title>
          <mat-card-subtitle *ngIf="showHelp" [style.margin-bottom]="0" [style.margin-left.px]="16">
              Enter the number of teeth of the chainrings and cogs to perform analysis.
          </mat-card-subtitle>
      </div>
      <hr>
      <mat-card-content>
          <form [formGroup]="form">
              <div fxLayout="row wrap" fxLayoutAlign="space-between center">
                  <mat-form-field appearance="outline" [style.margin-bottom.em]="-1.25">
                      <mat-label>Measurement</mat-label>
                      <mat-select formControlName="measurement">
                          <mat-option *ngFor="let measurement of measurements" [value]="measurement.key" [matTooltip]="measurement.help" [matTooltipClass]="'tooltip'" [matTooltipPosition]="'right'" [matTooltipDisabled]="!showHelp">{{ measurement.name }}</mat-option>
                      </mat-select>
                  </mat-form-field>
                  <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="10px">
                      <button mat-mini-fab type="button" [matTooltip]="'Sort the chainrings and cogs'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp" color="primary" (click)="sort()">
                          <mat-icon>sort</mat-icon>
                      </button>
                      <button mat-mini-fab type="button" [matTooltip]="'Clear the form'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp" color="warn" (click)="reset()">
                          <mat-icon>clear</mat-icon>
                      </button>
                  </div>
              </div>
              <hr>
              <div fxHide.lt-md fxLayoutAlign="row" fxLayoutAlign="start center" [style.margin-bottom.px]="16">
                  <span class="sideways">Chainrings</span>
                  <div fxLayout="column" fxLayoutAlign="start center">
                      <span [style.margin.px]="16">Cogs</span>
                      <table [style.border-collapse]="'collapse'">
                          <thead>
                              <tr formArrayName="cogs">
                                  <td></td>
                                  <td *ngFor="let cog of cogs.controls; let i = index;" class="centered" [matTooltip]="'Number of teeth per cog'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp">
                                      <mat-form-field appearance="outline" [style.width.px]="50">
                                          <input matInput OnlyNumbers maxlength="2" [formControlName]="i" (keyup)="calculate()">
                                      </mat-form-field>
                                  </td>
                              </tr>
                          </thead>
                          <tbody formArrayName="chainrings">
                              <tr *ngFor="let chainring of chainrings.controls; let i = index;">
                                  <td class="centered" [matTooltip]="'Number of teeth per chainring'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp" [matTooltipPosition]="'right'">
                                      <mat-form-field appearance="outline" [style.width.px]="50">
                                          <input matInput OnlyNumbers maxlength="2" [formControlName]="i" (keyup)="calculate()">
                                      </mat-form-field>
                                  </td>
                                  <td *ngFor="let result of results[i]; let j = index;" class="results centered" [ngClass]="results[i][j]?.background">
                                      {{ results[i][j]?.value | number:'.2-2' }}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <div fxHide.gt-sm fxLayoutAlign="row" fxLayoutAlign="start center" [style.margin-bottom.px]="16">
                  <span class="sideways">Cogs</span>
                  <div fxLayout="column" fxLayoutAlign="start center">
                      <span [style.margin.px]="16">Chainrings</span>
                      <table [style.border-collapse]="'collapse'">
                          <thead>
                              <tr formArrayName="chainrings">
                                  <td></td>
                                  <td *ngFor="let chainring of chainrings.controls; let i = index;" class="centered" [matTooltip]="'Number of teeth per chainring'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp">
                                      <mat-form-field appearance="outline" [style.width.px]="50">
                                          <input matInput OnlyNumbers maxlength="2" [formControlName]="i" (keyup)="calculate()">
                                      </mat-form-field>
                                  </td>
                              </tr>
                          </thead>
                          <tbody formArrayName="cogs">
                              <tr *ngFor="let cog of cogs.controls; let i = index;">
                                  <td class="centered" [matTooltip]="'Number of teeth per cog'" [matTooltipClass]="'tooltip'" [matTooltipDisabled]="!showHelp" [matTooltipPosition]="'right'">
                                      <mat-form-field appearance="outline" [style.width.px]="50">
                                          <input matInput OnlyNumbers maxlength="2" [formControlName]="i" (keyup)="calculate()">
                                      </mat-form-field>
                                  </td>
                                  <td *ngFor="let result of results; let j = index;" class="results centered" [ngClass]="results[j][i]?.background">
                                      {{ results[j][i]?.value | number:'.2-2' }}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
              <hr>
              <div>Details</div>
          </form>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./transmission.component.scss']
})
export class TransmissionComponent implements OnInit {

  public maxChainrings = 3;
  public maxCogs = 13;
  public form: FormGroup = this.fb.group({
    measurement: this.fb.control('gear-ratios'),
    chainrings: this.fb.array([]),
    cogs: this.fb.array([]),
  });
  public results: Result[][] = [...Array(this.maxChainrings)].map(x => Array(this.maxCogs).fill(null));
  public showHelp: boolean;
  public measurements: Measurement[];

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private help: HelpService,
  ) {}

  public get chainrings(): FormArray {
    return this.form.get('chainrings') as FormArray;
  }

  public get cogs(): FormArray {
    return this.form.get('cogs') as FormArray;
  }

  public ngOnInit(): void {
    for (let i = 0; i < this.maxChainrings; i++) {
      this.chainrings.push(this.fb.control(null));
    }
    for (let i = 0; i < this.maxCogs; i++) {
      this.cogs.push(this.fb.control(null));
    }
    this.data.loadJSON<Measurement[]>('transmission.data.json').subscribe(data => {
      this.measurements = data;
    });
    this.help.show.subscribe(x => this.showHelp = x);
  }

  public sort(): void {
    const chainringValues: string[] = this.chainrings.value;
    chainringValues.sort((a, b) => {
      if (b === '' || a > b) { return -1; }
      else if (a === '' || a < b) { return 1; }
      else { return 0; }
    });
    this.chainrings.patchValue(chainringValues);
    const cogValues: string[] = this.cogs.value;
    cogValues.sort();
    this.cogs.patchValue(cogValues);
    this.calculate();
  }

  public calculate(): void {
    const measurement: string = this.form.get('measurement').value;
    for (let i = 0; i < this.maxChainrings; i++) {
      for (let j = 0; j < this.maxCogs; j++) {
        const chainring = Number(this.chainrings.controls[i].value);
        const cog = Number(this.cogs.controls[j].value);
        if (chainring && cog) {
          const value: number = chainring / cog;
          switch (measurement) {
            case 'gear-ratios':
              if (value < 1.5) {
                this.results[i][j] = {
                  value,
                  background: 'green',
                };
              }
              else if (value < 3) {
                this.results[i][j] = {
                  value,
                  background: 'blue',
                };
              }
              else {
                this.results[i][j] = {
                  value,
                  background: 'red'
                };
              }
              break;
          }
        } else {
          this.results[i][j] = null;
        }
      }
    }
  }

  public reset(): void {
    this.chainrings.patchValue(Array(this.maxChainrings).fill(null));
    this.cogs.patchValue(Array(this.maxCogs).fill(null));
    this.calculate();
  }

}

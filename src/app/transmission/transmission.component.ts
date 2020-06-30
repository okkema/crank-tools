import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { Measurement, Result } from './models';
import { HelpService } from '../shared/services/help.service';

@Component({
  selector: 'app-transmission',
  templateUrl: './transmission.component.html',
  styleUrls: ['./transmission.component.css']
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
        const chainring: number = Number(this.chainrings.controls[i].value);
        const cog: number = Number(this.cogs.controls[j].value);
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

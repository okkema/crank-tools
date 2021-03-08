import { Component } from '@angular/core';
import { HelpService } from '../../shared/help';
import { NavigationService } from '../navigation';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar>
      <button mat-icon-button type="button" (click)="nav.toggle()" [style.margin-left.px]="-4">
        <mat-icon *ngIf="!showNav; else closeNav">menu</mat-icon>
        <ng-template #closeNav>
          <mat-icon>close</mat-icon>
        </ng-template>
      </button>
      <span [style.margin-left.px]="16">Crank Tools</span>
      <span fxFlex></span>
      <button mat-icon-button type="button" (click)="help.toggle()" [matTooltipClass]="'tooltip'" [matTooltip]="showHelp ? 'Hide help' : 'Show help'" [color]="showHelp ? 'accent' : null">
        <mat-icon>help</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
  ]
})
export class ToolbarComponent {

  public showNav: boolean;
  public showHelp: boolean;

  constructor(
    public nav: NavigationService,
    public help: HelpService,
  ) {
    this.nav.show.subscribe(x => this.showNav = x);
    this.help.show.subscribe(x => this.showHelp = x);
  }

}

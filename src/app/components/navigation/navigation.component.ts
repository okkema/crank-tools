import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Navigation from './navigation.model';
import { NavigationService } from './navigation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  template: `
    <mat-sidenav-container fxFlex [hasBackdrop]="showNav" (click)="nav.close()">
      <mat-sidenav #sidenav [mode]="nav.isMobile ? 'over' : 'side'" [disableClose]="!nav.isMobile" [opened]="!nav.isMobile" [autoFocus]="false">
        <mat-nav-list [style.padding-top]="0" [style.min-width.px]="56">
          <a *ngFor="let item of nav.routes" mat-list-item routerLink="{{ item.path }}" routerLinkActive #link="routerLinkActive">
            <mat-icon [color]="link.isActive ? 'primary' : ''" [style.margin-right.px]="nav.isMobile ? 16 : 0">{{ item.data.icon }}</mat-icon>
            <span [@toggle]="nav.isMobile ? null : showNavText">{{ item.data.title }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content [style.padding.px]="16">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  animations: [
    trigger('toggle', [
      state('opened', style({
        opacity: 1,
        'margin-left': '16px'
      })),
      state('closed', style({
        opacity: 0,
        'margin-left': '-168px'
      })),
      transition('opened => closed', [
        animate('0.1s ease-in-out'),
      ]),
      transition('closed => opened', [
        animate('0.1s ease-in-out'),
      ]),
    ]),
  ],
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  public navigation: Navigation[];
  public showNav: boolean;

  get showNavText(): string {
    return this.showNav ? 'opened' : 'closed';
  }

  constructor(
    private breakpoints: BreakpointObserver,
    public nav: NavigationService,
  ) {}

  ngOnInit(): void {
    this.breakpoints.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ]).subscribe(results => {
      if (results.matches) { this.nav.isMobile = true; }
      else { this.nav.isMobile = false; }
    });
    this.nav.show.subscribe(x => this.showNav = x);
  }

  ngAfterViewInit(): void {
    this.nav.set(this.sidenav);
  }

}

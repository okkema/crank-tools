import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataService } from '../shared/services/data.service';
import Navigation from './navigation.model';
import { NavigationService } from './navigation.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('toggle', [
      state('opened', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('opened => closed', [
        animate('1s'),
      ]),
      transition('closed => opened', [
        animate('1s'),
      ]),
    ]),
  ],
})
export class NavigationComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;

  public navigation: Navigation[];
  public showNav: boolean;

  constructor(
    private data: DataService,
    private breakpoints: BreakpointObserver,
    public nav: NavigationService,
  ) {}

  public ngOnInit(): void {
    this.data.loadJSON<Navigation[]>('navigation.data.json').subscribe(data => {
      this.navigation = data;
    });
    this.breakpoints.observe([
      Breakpoints.Small,
      Breakpoints.XSmall,
    ]).subscribe(results => {
      if (results.matches) { this.nav.isMobile = true; }
      else { this.nav.isMobile = false; }
    });
    this.nav.show.subscribe(x => this.showNav = x);
  }

  public ngAfterViewInit(): void {
    this.nav.set(this.sidenav);
  }

}

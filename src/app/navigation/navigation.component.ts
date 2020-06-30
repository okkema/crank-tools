import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DataService } from '../shared/services/data.service';
import Navigation from './navigation.model';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
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
export class NavigationComponent implements OnInit {

  public navigation: Navigation[];
  public showNav: boolean;

  constructor(
    private data: DataService,
    public nav: NavigationService,
  ) { }

  public ngOnInit(): void {
    this.data.loadJSON<Navigation[]>('navigation.data.json').subscribe(data => {
      this.navigation = data;
    });
    this.nav.show.subscribe(x => this.showNav = x);
  }

}

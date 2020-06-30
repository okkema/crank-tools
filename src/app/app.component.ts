import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/data.service';
import Navigation from './navigation/navigation.model';
import { HelpService } from './shared/services/help.service';
import { NavigationService } from './navigation/navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public showNav: boolean;
  public showHelp: boolean;

  constructor(
    public nav: NavigationService,
    public help: HelpService,
  ) {}

  public ngOnInit(): void {
    this.nav.show.subscribe(x => this.showNav = x);
    this.help.show.subscribe(x => this.showHelp = x);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="column" [style.height.%]="100">
      <app-toolbar></app-toolbar>
      <app-navigation fxFlex></app-navigation>
    </div>
  `,
})
export class AppComponent {

  constructor() {}

}

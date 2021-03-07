import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  template: `
    <p>
      item works!
    </p>
  `,
  styles: [
  ]
})
export class ItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

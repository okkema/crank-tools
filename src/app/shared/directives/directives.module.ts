import { NgModule } from '@angular/core';
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';

const directives: any[] = [
  OnlyNumbersDirective,
];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule { }

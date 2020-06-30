// ANGULAR
import { NgModule } from '@angular/core';
// DIRECTIVES
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';

const directives: any[] = [
  OnlyNumbersDirective,
];

@NgModule({
  declarations: [...directives],
  exports: [...directives],
})
export class DirectivesModule { }

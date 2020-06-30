import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[OnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const initalValue = this.el.nativeElement.value;
    this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this.el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

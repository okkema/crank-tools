import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get show(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public open(): void {
    this.subject.next(true);
  }

  public close(): void {
    this.subject.next(false);
  }

  public toggle(): void {
    this.subject.next(!this.subject.getValue());
  }

}

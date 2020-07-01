import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private sidenav: MatSidenav;
  public isMobile: boolean;

  public get show(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public set(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  public open(): void {
    this.subject.next(true);
    if (this.isMobile) { this.sidenav.open(); }
  }

  public close(): void {
    this.subject.next(false);
    if (this.isMobile) { this.sidenav.close(); }
  }

  public toggle(): void {
    this.subject.next(!this.subject.getValue());
    if (this.isMobile) { this.sidenav.toggle(); }
  }

}

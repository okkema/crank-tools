import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, Route } from '@angular/router';
import { IPageRoute } from '../../shared/base/page';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public isMobile: boolean;
  public routes: IPageRoute[] = [];
  private subject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private sidenav: MatSidenav;

  constructor(
    private router: Router,
  ) {
    this.getRoutes('', router.config);
  }

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

  getRoutes(parent: string, config: Route[]): void {
    for (const route of config) {
      if (route.path !== '**') { this.routes.push(route as IPageRoute); }
      if (route.children) {
        const path = route.path ? `${parent}/${route.path}` : parent;
        this.getRoutes(path, route.children);
      }
    }
  }

}

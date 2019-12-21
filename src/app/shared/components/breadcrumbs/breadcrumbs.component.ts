import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core/store';
import { getCourseByUrl } from '../../../courses/store';

@Component({
  selector: 'cs-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  routes: string[];

  routerEventsSub: Subscription;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.checkRoute(this.router.url);
    this.startListeningRouter();
  }

  ngOnDestroy(): void {
    this.routerEventsSub.unsubscribe();
  }

  startListeningRouter(): void {
    this.routerEventsSub = this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe((route: NavigationEnd) => {
        this.checkRoute(route.url);
      });
  }

  checkRoute(url: string): void {
    const routes = url
      .split('/')
      .filter((i) => i.length);
    const last = routes[routes.length - 1];

    if (!isNaN(+last)) {
      this.store.select(getCourseByUrl).pipe(
        first()
      ).subscribe(({title}) => routes[routes.length - 1] = title);
    }

    this.routes = [...routes];
  }
}

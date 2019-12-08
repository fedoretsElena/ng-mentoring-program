import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { CoursesService } from '../../../courses/services';

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
    private coursesService: CoursesService
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
      const { title } = this.coursesService.currCourse;
      routes[routes.length - 1] = title;
    }

    this.routes = [...routes];
  }
}

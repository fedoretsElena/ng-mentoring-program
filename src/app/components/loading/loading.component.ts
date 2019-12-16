import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../../core/services';

@Component({
  selector: 'cs-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loaderState$: Observable<boolean> = this.loaderService.show$
    .pipe(
      tap((show: boolean) => {
        show
          ? this.renderer.addClass(this.document.body, 'overflow-hidden')
          : this.renderer.removeClass(this.document.body, 'overflow-hidden');
      })
    );

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private loaderService: LoaderService
  ) {
  }
}

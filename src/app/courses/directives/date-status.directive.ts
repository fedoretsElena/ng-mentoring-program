import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[csDateStatus]'
})
export class DateStatusDirective implements OnInit {
  @Input()
  date: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {
    this.compareDate();
  }

  private compareDate(): void {
    const now = moment();
    const creationDate = moment(this.date, 'YYYY-MM-DD');

    if (now.isBefore(creationDate)) {
      this.renderer.addClass(this.el.nativeElement,
        'border-info');
    }

    if (now.isSameOrAfter(creationDate)
      && now.diff(creationDate, 'days') < 14) {
      this.renderer.addClass(this.el.nativeElement,
        'border-success');
    }
  }
}

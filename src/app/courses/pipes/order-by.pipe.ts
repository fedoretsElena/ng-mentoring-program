import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { Course } from '../entitites';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: Course[]): Course[] {
    if (!value) {
      return [];
    }

    return value.sort((a, b) => {
      return moment(a.creationDate).isBefore(b.creationDate) ? -1 : 1;
    });
  }

}

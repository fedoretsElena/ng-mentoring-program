import { Pipe, PipeTransform } from '@angular/core';

import { ICourse } from '../entitites';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(courses: ICourse[], search: string): ICourse[] {
    if (!search) {
      return courses;
    }

    return courses.filter(i => i.title.toLowerCase().includes(search.toLowerCase()));
  }
}

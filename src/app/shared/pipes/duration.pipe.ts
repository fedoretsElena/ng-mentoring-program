import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'csDuration'
})

export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    let res = '';

    if (hours > 0) {
      res = res + `${hours}h `;
    }

    if (minutes > 0) {
      res = res + `${minutes}m `;
    }

    return res;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'csDuration'
})

export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    if (!value) {
      return '';
    }

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return hours === 0
      ? `${minutes}m`
      : `${hours}h` + (minutes > 0 ? ` ${minutes}m` : '');
  }
}

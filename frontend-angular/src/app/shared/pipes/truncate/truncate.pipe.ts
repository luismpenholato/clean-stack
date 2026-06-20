import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 50, suffix: string = '...'): string {
    if (value == null || value === '') {
      return '';
    }
    const str = String(value);
    if (str.length <= limit) {
      return str;
    }
    return str.slice(0, limit).trim() + suffix;
  }
}

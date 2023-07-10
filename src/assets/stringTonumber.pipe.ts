import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToNumber'
})
export class StringToNumberPipe implements PipeTransform {
  transform(value: string): number {
    try {
      if(value == null)
        return 0;
      const number = parseInt(parseFloat(value).toString(), 10);
      return number;
    } catch (error) {
      return null;
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let array = []
    let range = parseInt(args);
    for (var i = 0; i < range; i++) array.push(i);
    
    return array;

  }

}

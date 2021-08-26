import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translatebreed'
})
export class TranslatebreedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

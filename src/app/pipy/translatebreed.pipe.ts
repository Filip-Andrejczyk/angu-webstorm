import { Pipe, PipeTransform } from '@angular/core';
import {TranslateBase} from "./translate-base";

@Pipe({
  name: 'translatebreed'
})
export class TranslatebreedPipe implements PipeTransform {

  transform(value: string): string {
    return TranslateBase[value] || value;
  }

}

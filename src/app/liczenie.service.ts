import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiczenieService {

  public counter = new BehaviorSubject<number>(0);

  constructor() { }

  // getNumber(){
  //   return this.counter; //nie potrzeba tego skoro uzywam getValue() wbudowanej
  // }

  incrementNumber(){
    this.counter.next(this.counter.getValue() + 1);
  }
}

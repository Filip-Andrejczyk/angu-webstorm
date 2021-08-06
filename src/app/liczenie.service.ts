import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiczenieService {


  public counter = new BehaviorSubject<number>(0);

  constructor() { }

  getNumber(){
    return this.counter;
  }

  incrementNumber(){
    this.counter.next(this.counter.getValue() + 1);
  }
}

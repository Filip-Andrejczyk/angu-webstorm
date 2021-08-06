import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiczenieService {

  //counter: number = 0;
  public counter = new BehaviorSubject<number>(0);
  //sharedMessage = this.counter.asObservable();

  constructor() { }

  getNumber(){
    return this.counter;
  }

  incrementNumber(){
    this.counter.next(this.counter.getValue() + 1);
  }
}

import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LiczenieService {

  public counter = new BehaviorSubject<number>(0);

  constructor() { }

  incrementNumber(){
    this.counter.next(this.counter.getValue() + 1);
  }
}

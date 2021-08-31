import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentPlayarService {

  nazwagracza: string = "";

  private dataStringSource = new BehaviorSubject<string>("");
  dataString$ = this.dataStringSource.asObservable();

  constructor() {}

  public saveData(value: string){
    this.nazwagracza = value;
    this.dataStringSource.next(this.nazwagracza);
  }
}

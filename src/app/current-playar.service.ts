import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentPlayarService {

  nazwagracza: string = "";
  trybHard: boolean = false;

  private dataStringSource = new BehaviorSubject<string>("");
  public dataBoolSource = new BehaviorSubject<boolean>(false);

  public dataBoolean$ = this.dataBoolSource.asObservable();
  dataString$ = this.dataStringSource.asObservable();

  constructor() {}

  public saveData(value: string){
    this.nazwagracza = value;
    this.dataStringSource.next(this.nazwagracza);
  }
}

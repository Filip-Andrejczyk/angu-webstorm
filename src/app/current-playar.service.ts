import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrentPlayarService {

  nazwagracza: string = "";
  trybHard: boolean = false;
  gameInProgress: boolean = false;

  private dataStringSource = new BehaviorSubject<string>("");
  public dataBoolSource = new BehaviorSubject<boolean>(false);
  public runningGameSubject = new BehaviorSubject<boolean>(false);

  public dataBoolean$ = this.dataBoolSource.asObservable();
  public dataString$ = this.dataStringSource.asObservable();

  public gameStatus$ = this.runningGameSubject.asObservable();

  constructor() {}

  public saveData(value: string){
    this.nazwagracza = value;
    this.dataStringSource.next(this.nazwagracza);
  }

  public gameIsRunning(value: boolean){
    this.gameInProgress = value;
  }
}

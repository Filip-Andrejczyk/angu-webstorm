import { Injectable } from '@angular/core';
import {Rekord} from "./models/rekordy";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablicaLstorageService {

  //public localStore = JSON.parse(<string>localStorage.getItem('wynik')) as Rekord[];
  public tablicaRekordow = (JSON.parse(<string>localStorage.getItem('wynik'))) as Rekord[];
  public ObjIndx: number = 0;

  constructor() {}

  getRecords(): Observable<Rekord[]>{
    if (this.tablicaRekordow.length > 0){
      this.sortTab();
      return of(this.tablicaRekordow);
    }
    else{
      return of(this.tablicaRekordow);
    }
  }

  addRecord(name: string, score: number): Rekord[]{
    this.tablicaRekordow.push(({
      name: name,
      score: score,
    }));
    return this.tablicaRekordow;
  }

  sendData(t: Rekord[]){
  localStorage.setItem("wynik", JSON.stringify(t))
  }

  sortTab(){
    this.tablicaRekordow.sort((a, b) => {return b.score - a.score})
  }

}

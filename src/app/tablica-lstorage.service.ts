import { Injectable } from '@angular/core';
import {Rekord} from "./models/rekordy";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablicaLstorageService {

  //public localStore = JSON.parse(<string>localStorage.getItem('wynik')) as Rekord[];
  public tablicaRekordow = (JSON.parse(<string>localStorage.getItem('wynik'))) as Rekord[];

  public objIndx: number = 0;

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

  updateRecord(name: string, newscore: number){

    this.objIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
    this.tablicaRekordow[this.objIndx].score = newscore;
    this.sortTab();
    return this.tablicaRekordow;

  }
  findUser(name: string): boolean{
    if (this.tablicaRekordow.findIndex((obj => obj.name == name)) > 0)
    {
      return true;
    }
    else
    {
      return false;
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

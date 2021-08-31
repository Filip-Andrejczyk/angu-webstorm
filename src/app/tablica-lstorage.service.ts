import { Injectable } from '@angular/core';
import { Rekord } from "./models/rekordy";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablicaLstorageService {

  //public localStore = JSON.parse(<string>localStorage.getItem('wynik')) as Rekord[];
  public tablicaRekordow = (JSON.parse(<string>localStorage.getItem('wynik'))) as Rekord[];

  public brak = [
    //{ "name": "Filip", "score": 0 },
    //{ "name": "Wojtek", "score": 0 },
  ];

  public objIndx: number = 0;
  public perIndx: number = 0;

  constructor() {}

  getRecords(): Observable<Rekord[]>{
    if (this.tablicaRekordow != null){
      this.sortTab();
      return of(this.tablicaRekordow);
    }
    else{
      // return of(this.tablicaRekordow);
      this.tablicaRekordow = this.brak
      this.sendData(this.tablicaRekordow);
      return of(this.tablicaRekordow);
    }
  }

  //ZROBIC SERWIS KTURY TRZYMA NAZWE OBECNIE GRAJACEGO ZAWODNIKA

  updateRecord(name: string, newscore: number){

    this.objIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
    this.tablicaRekordow[this.objIndx].score = newscore;
    this.sortTab();
    return this.tablicaRekordow;

  }

  findUser(name: string): boolean{
    //debugger;
    if (this.tablicaRekordow.findIndex((obj => obj.name == name)) == -1) // -1 nie ma 0, 1 tip jest
    {
      console.log("nie znaleziono");
      return false;
    }
    else
    {
      console.log("znaleziono");
      return true;
    }
  }

  PersonalBest(name: string): number{
    this.perIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
    return this.tablicaRekordow[this.perIndx].score;
  }

  addRecord(name: string, score: number): Rekord[]{
    this.tablicaRekordow.push(({
      name: name,
      score: score,
    }));
    return this.tablicaRekordow;
  }

  removeRecord(indexik: number): Rekord[]{
    this.tablicaRekordow.splice(indexik, 1);
    return this.tablicaRekordow;
  }

  sendData(t: Rekord[]){
  localStorage.setItem("wynik", JSON.stringify(t))
  }

  sortTab(){
    this.tablicaRekordow.sort((a, b) => {return b.score - a.score})
  }

}

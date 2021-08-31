import { Injectable } from '@angular/core';
import { Rekord } from "./models/rekordy";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablicaLstorageService {

  public tablicaRekordow = (JSON.parse(<string>localStorage.getItem('wynik'))) as Rekord[];

  public brak = [
    //{ "name": "Filip", "score": 0 },
    //{ "name": "Wojtek", "score": 0 },
  ];

  public objectIndx: number = 0;
  public personalIndx: number = 0;

  constructor() {}

  getRecords(): Observable<Rekord[]>{
    if (this.tablicaRekordow != null){
      this.sortTab();
      return of(this.tablicaRekordow);
    }
    else{
      this.tablicaRekordow = this.brak
      this.sendData(this.tablicaRekordow);
      return of(this.tablicaRekordow);
    }
  }

  updateRecord(name: string, newscore: number){

    this.objectIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
    this.tablicaRekordow[this.objectIndx].score = newscore;
    this.sortTab();
    return this.tablicaRekordow;

  }

  findUser(name: string): boolean{
    if (this.tablicaRekordow.findIndex((obj => obj.name == name)) == -1) // -1 nie ma 0, 1 itp jest
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
    this.personalIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
    return this.tablicaRekordow[this.personalIndx].score;
  }

  findNameByIndex(numberInArray: number): string{
    return this.tablicaRekordow[numberInArray].name;
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

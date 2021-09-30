import { Injectable } from '@angular/core';
import { Rekord } from "./models/rekordy";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TablicaLstorageService {

  public tablicaRekordow = (JSON.parse(<string>localStorage.getItem('wynik'))) as Rekord[];
  public tablicaTrybHARD = (JSON.parse(<string>localStorage.getItem('wynikHard'))) as Rekord[];


  public trybGryHard: boolean = false;

  // public setTrybGry(tryb: boolean){
  //   this.trybGryHard = tryb;
  //   if (this.trybGryHard){
  //     this.tablicaRekordow = this.tablicaTrybHARD;
  //     console.log("a to w serwisie:", this.trybGryHard);
  //   }
  // }

  public brak = [];

  public objectIndx: number = 0;
  public personalIndx: number = 0;

  constructor() {}

  getEZRecords(): Observable<Rekord[]>{
    if (this.tablicaRekordow != null){
      this.tablicaRekordow = this.sortTab(this.tablicaRekordow);
      return of(this.tablicaRekordow);
    }
    else{
      this.tablicaRekordow = this.brak
      this.sendData(this.tablicaRekordow, false);
      return of(this.tablicaRekordow);
    }
  }

  getHardRecords(): Observable<Rekord[]>{
    if (this.tablicaTrybHARD != null){
      this.tablicaTrybHARD = this.sortTab(this.tablicaTrybHARD);
      return of(this.tablicaTrybHARD);
    }
    else{
      this.tablicaTrybHARD = this.brak
      this.sendData(this.tablicaTrybHARD, true);
      return of(this.tablicaTrybHARD);
    }
  }

  updateRecord(name: string, newscore: number, isHard: boolean){

    if (!isHard)
    {
      this.objectIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
      this.tablicaRekordow[this.objectIndx].score = newscore;
      this.tablicaRekordow = this.sortTab(this.tablicaRekordow);
      return this.tablicaRekordow;
    }
    else
    {
      this.objectIndx = this.tablicaTrybHARD.findIndex((obj => obj.name == name));
      this.tablicaTrybHARD[this.objectIndx].score = newscore;
      this.tablicaTrybHARD = this.sortTab(this.tablicaTrybHARD);
      return this.tablicaTrybHARD;
    }

  }

  findUser(name: string, isHard: boolean): boolean{

    if (!isHard){
      if (this.tablicaRekordow.findIndex((obj => obj.name == name)) == -1) // -1 nie ma 0, 1 itp jest
      {console.log("nie znaleziono");return false;}
      else {console.log("znaleziono");return true;}
    }else {
      if (this.tablicaTrybHARD.findIndex((obj => obj.name == name)) == -1) // -1 nie ma 0, 1 itp jest
      {console.log("nie znaleziono");return false;}
      else {console.log("znaleziono");return true;}
    }
  }

  PersonalBest(name: string, isHard: boolean): number{

    if (!isHard)
    {
      this.personalIndx = this.tablicaRekordow.findIndex((obj => obj.name == name));
      console.log("dla jego personal best (tablicaEZ) is: ", this.tablicaRekordow[this.personalIndx].score)
      return this.tablicaRekordow[this.personalIndx].score;
    }
    else
    {
      this.personalIndx = this.tablicaTrybHARD.findIndex((obj => obj.name == name));
      console.log("dla jego personal best (tablicaHARD) is: ", this.tablicaTrybHARD[this.personalIndx].score)
      return this.tablicaTrybHARD[this.personalIndx].score;
    }

  }

  findNameByIndex(numberInArray: number, isHard: boolean): string{
    if (!isHard){
      return this.tablicaRekordow[numberInArray].name;
    }else{
      return this.tablicaTrybHARD[numberInArray].name;
    }
  }

  addRecord(name: string, score: number, isHard: boolean): Rekord[]{
    if(!isHard){
      this.tablicaRekordow.push(({
        $key: 'key',
        name: name,
        score: score,
      }));
      return this.tablicaRekordow;
    }else {
      this.tablicaTrybHARD.push(({
        $key: 'key',
        name: name,
        score: score,
      }));
      return this.tablicaTrybHARD;
    }

  }

  removeRecord(indexik: number, isHard: boolean): Rekord[]{
    if (!isHard){
      this.tablicaRekordow.splice(indexik, 1);
      return this.tablicaRekordow;
    }else{
      this.tablicaTrybHARD.splice(indexik, 1);
      return this.tablicaTrybHARD;
    }

  }

  sendData(t: Rekord[], isHard: boolean){

    if(!isHard)
    {
      localStorage.setItem("wynik", JSON.stringify(t));
    }else
    {
      localStorage.setItem("wynikHard", JSON.stringify(t))
    }
  }

  sortTab(tab: Rekord[]): Rekord[]{
    return tab.sort((a, b) => {return b.score - a.score})
  }

}
